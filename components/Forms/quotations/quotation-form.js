import { useState, useContext, useEffect } from "react"
import { Box, Grid, Stack } from "@mui/material"
import apiCall from "../../../services/apiCalls/apiCall"
import { AppContext } from "../../../contexts/AppContext"
import CustomForm from "../custom-form"
import AddIcon from "@mui/icons-material/Add"
import BodyText from "../../Text/body-text"
import PillButton from "../../Buttons/pill-button"
import CustomModal from "../../Modals/custom-modal"
import CreateQuotationItemForm from "./create-quotation-item-form"
import EditQuotationItemForm from "./edit-quotation-item-form"
import CustomFilledInput from "../../Inputs/custom-filled-input"
import { QUOTATION_STATUS } from "../../../enums/quotationStatus"
import SaveAltIcon from "@mui/icons-material/SaveAlt"
import { QUOTATION_ITEM_TYPES } from "../../../enums/quotationItemTypes"
import SendIcon from "@mui/icons-material/Send"
import DoneIcon from "@mui/icons-material/Done"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import WarningAmberIcon from "@mui/icons-material/WarningAmber"
import DropdownOptions from "../../Dropdown/dropdown-options"
import TitleIcon from "@mui/icons-material/Title"
import DeleteIcon from "@mui/icons-material/Delete"
import { ModalTitle } from "../../Modals/Modal-Components/modal-title"
import { useRouter } from "next/router"
import PleaseWait from "../../Helpers/please-wait"
import withConfirmAction from "../../hocs/withConfirmAction"
import { checkEmail } from "../../../services/utils"
import QuotationReadOnlySection from "../../Sections/Quotations/quotation-read-only-section"
import AlertInfo from "../../Other/alert-info"
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd"
import ClientAutocomplete from "../admin/client-autocomplete"
import DoneAllIcon from "@mui/icons-material/DoneAll"
import SubmitButton from "../../Buttons/submit-button"
import CancelButton from "../../Buttons/cancel-button"

const EDIT_STATUSES = [
  QUOTATION_STATUS.DRAFT.id,
  QUOTATION_STATUS.SENT.id,
  QUOTATION_STATUS.REFUSED.id,
]

const HEAD = [
  { label: "Type" },
  { label: "Intitulé" },
  { label: "Description", width: { xs: "200px", md: "20%" } },
  { label: "Qté." },
  { label: "TVA" },
  { label: "Prix unit. HT" },
  { label: "Total" },
]
const HeadCell = ({ width, ...props }) => (
  <Box
    component="th"
    textAlign="left"
    sx={{
      border: (theme) => `2px solid ${theme.palette.secondary.main}`,
      padding: 2,
      minWidth: width || "10%",
      background: (theme) => theme.palette.background.main,
    }}
  >
    <BodyText
      preventTransition
      color={(theme) => theme.palette.text.secondary}
      {...props}
    />
  </Box>
)
const Cell = (props) => (
  <Box
    component="td"
    textAlign="left"
    sx={{
      border: (theme) => `2px solid ${theme.palette.secondary.main}`,
      padding: 2,
    }}
  >
    <BodyText preventTransition color="#fff" {...props} />
  </Box>
)
const Line = (props) => (
  <Box
    component="tr"
    sx={{
      border: (theme) => `2px solid ${theme.palette.secondary.main}`,
      padding: 2,
      cursor: "pointer",
      "&:hover": {
        background: "rgb(198, 144, 14, 0.3)",
      },
    }}
    {...props}
  />
)

function QuotationForm({
  id,
  setActionToFire,
  setOpenConfirmModal,
  setConfirmTitle,
  setConfirmContent,
  setNextButtonText,
}) {
  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  /********** ROUTER **********/
  const router = useRouter()

  /********** USE-STATES **********/
  const [quotation, setQuotation] = useState({
    id: id,
    label: "",
    created_at: null,
    last_update: null,
    status: QUOTATION_STATUS.DRAFT.id,
    recipient_emails: [],
    client: {},
  })
  const [items, setItems] = useState([])
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openSaveModal, setOpenSaveModal] = useState(false)
  const [openAssignModal, setOpenAssignModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedItemIndex, setSelectedItemIndex] = useState(null)
  const [loading, setLoading] = useState(false)
  const [openSendModal, setOpenSendModal] = useState(false)
  const [emailInput, setEmailInput] = useState("")
  const [assignValue, setAssignValue] = useState("")
  const [assignInputValue, setAssignInputValue] = useState("")

  /********** FETCH DATA **********/
  const fetchQuotation = async () => {
    setLoading(true)
    const res = await apiCall.quotations.get({ id })
    if (res && res.ok) {
      const jsonRes = await res.json()
      // Populate quotation
      setQuotation(jsonRes)
      // Populate quotation items
      setItems(jsonRes.items)
      setLoading(false)
      setUnsavedChanges(false)
    }
  }

  /********** INITIAL FETCH (edit page only) **********/
  useEffect(() => {
    if (id) fetchQuotation()
  }, [id])

  /********** HANDLERS **********/
  const handleDetectChange = () => setUnsavedChanges(true)
  const handleOpenCreateModal = () => setOpenCreateModal(true)
  const handleCloseCreateModal = () => setOpenCreateModal(false)
  const handleCloseEditModal = () => setOpenEditModal(false)
  const handleCloseSaveModal = () => setOpenSaveModal(false)
  const handleCloseAssignModal = () => {
    setAssignValue("")
    setAssignInputValue("")
    setOpenAssignModal(false)
  }
  const handleCloseSendModal = () => {
    setEmailInput("")
    setOpenSendModal(false)
  }
  const handleChange = (attribute) => (e) => {
    setQuotation({ ...quotation, [attribute]: e.target.value })
  }
  const handleSuccess = (quotationId) => {
    setSnackSeverity("success")
    setSnackMessage("Succès")
    setOpenSaveModal(false)
    // if no id provided === user is on CreateQuotationPage (not EditQuotationPage), we redirect the user onto the edit page (with the same quotationForm component)
    if (!id) return router.push(`/dashboard/quotations/${quotationId}/edit`)
    fetchQuotation()
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("Erreur")
  }
  const save = async () => {
    let res = null
    if (!id) {
      // If quotation is not created yet
      res = await apiCall.quotations.create({
        label: quotation.label,
        status: quotation.status,
        items,
      })
    } else {
      // If quotation is created and needs to be saved/updated
      res = await apiCall.quotations.save({
        label: quotation.label,
        status: quotation.status,
        items,
        id,
      })
    }
    if (res && res.ok) {
      const jsonRes = await res.json()
      handleSuccess(jsonRes.id)
    } else handleError()
  }
  const handleSave = async () => {
    if (quotation.label) return await save()
    return setOpenSaveModal(true)
  }
  const handleCancel = async () => {
    setOpenSaveModal(false)
    setOpenSendModal(false)
  }
  const handleEdit = (item, key) => {
    setSelectedItem(item)
    setSelectedItemIndex(key)
    setOpenEditModal(true)
  }
  const deleteQuotation = async () => {
    setLoading(true)
    const res = await apiCall.quotations.delete({ id: quotation.id })
    if (res && res.ok) {
      setSnackMessage("Devis supprimé")
      setSnackSeverity("success")
      router.push("/dashboard/quotations")
    } else {
      setSnackMessage("Un problème est survenu")
      setSnackSeverity("error")
    }
    setLoading(false)
  }
  const handleDelete = async () => {
    setActionToFire(() => () => deleteQuotation())
    setOpenConfirmModal(true)
    setNextButtonText("Supprimer")
    setConfirmTitle("Supprimer le devis")
    setConfirmContent({
      text: `Voulez vous vraiment supprimer le devis ${quotation.label} ?`,
    })
  }
  const handleSend = async () => {
    if (emailInput.trim() === "") setOpenSendModal(true)
    else await sendQuotation()
  }
  const sendQuotation = async () => {
    const res = await apiCall.quotations.send({
      id: quotation.id,
      email: emailInput,
    })
    if (res && res.ok) {
      setSnackSeverity("success")
      setSnackMessage("Succès")
      handleCloseSendModal()
      fetchQuotation()
    } else {
      setSnackSeverity("error")
      setSnackMessage("Erreur")
    }
  }
  const handleAssign = async () => {
    const res = await apiCall.quotations.assignClient({
      id: quotation.id,
      clientId: assignValue?.id || null,
    })
    if (res && res.ok) {
      setSnackMessage("Client associé au devis avec succès")
      setSnackSeverity("success")
      handleCloseAssignModal()
      fetchQuotation()
    } else {
      setSnackMessage("Une erreur est survenue")
      setSnackSeverity("error")
    }
  }

  const emailError = emailInput.trim() !== "" && !checkEmail(emailInput)

  const recipientEmailsString = quotation.recipient_emails.join(", ")

  /********** SUB-COMPONENTS **********/
  const Status = () => {
    if (!quotation.id)
      return (
        <BodyText
          marginLeft="1rem"
          sx={{
            color: (theme) => theme.palette.error.main,
            display: "inline-flex",
            gap: ".5rem",
          }}
        >
          Pas enregistré <WarningAmberIcon />
        </BodyText>
      )

    if (unsavedChanges)
      return (
        <BodyText
          marginLeft="1rem"
          sx={{
            color: (theme) => theme.alert.title.warning,
            display: "inline-flex",
            gap: ".5rem",
          }}
        >
          Modifications non sauvegardées{" "}
          <AccessTimeIcon sx={{ display: "inline-flex" }} />
        </BodyText>
      )

    if (quotation.status === QUOTATION_STATUS.ACCEPTED.id)
      return (
        <BodyText
          marginLeft="1rem"
          sx={{
            color: (theme) => theme.alert.title.success,
            display: "inline-flex",
            gap: ".5rem",
          }}
        >
          Accepté par le client <DoneAllIcon />
        </BodyText>
      )

    return (
      <BodyText
        marginLeft="1rem"
        sx={{
          color: (theme) => theme.alert.title.success,
          display: "inline-flex",
          gap: ".5rem",
        }}
      >
        Enregistré <DoneIcon />
      </BodyText>
    )
  }

  const Toolbar = () => {
    const options = [
      {
        label: "Modifier le nom du devis",
        handleClick: () => setOpenSaveModal(true),
        icon: <TitleIcon />,
      },
      {
        label: "Assigner à un client existant",
        handleClick: () => setOpenAssignModal(true),
        icon: <AssignmentIndIcon />,
      },
      {
        label: "Générer le PDF",
        handleClick: () => router.push(`/quotation-view/${quotation.id}`),
        icon: <PictureAsPdfIcon />,
      },
    ]

    if (!!id)
      options.push({
        label: "Supprimer le devis",
        handleClick: handleDelete,
        icon: <DeleteIcon />,
      })

    return (
      <Stack width="100%" gap={4}>
        <BodyText color={(theme) => theme.palette.text.secondary}>
          {quotation.label || "Sans nom"}{" "}
          <Box component="span" color="#fff" fontStyle="italic">
            {`(${QUOTATION_STATUS[quotation.status].label})`}
          </Box>
        </BodyText>
        {!EDIT_STATUSES.includes(quotation.status) && (
          <AlertInfo
            content={{
              show: true,
              severity: "info",
              title: "Lecture seule",
              text: "Le devis est en mode lecture seule. Vous ne pouvez plus le modifier car le client l'a accepté. Il faut maintenant générer le devis définitif avec toutes les mentions légales. Enfin, les deux parties devront signer le devis.",
            }}
          />
        )}
        <Stack alignItems="center" width="100%" flexDirection="row" gap={2}>
          {EDIT_STATUSES.includes(quotation.status) && (
            <>
              <SubmitButton onClick={handleSave} icon={<SaveAltIcon />} />
              <SubmitButton
                onClick={handleSend}
                label="Envoyer"
                icon={<SendIcon />}
              />
            </>
          )}
          <Status />
          <Stack flexGrow={1} />
          <DropdownOptions options={options} />
        </Stack>
      </Stack>
    )
  }

  const TotalPrices = () => {
    let totalPrice = 0
    let totalNoVatPrice = 0
    let totalVat = 0
    items.map((item) => {
      totalPrice += item.quantity * item.no_vat_price * (1 + item.vat / 100)
      totalNoVatPrice += item.quantity * item.no_vat_price
      totalVat += item.quantity * item.vat
    })
    totalPrice = totalPrice / 100
    totalNoVatPrice = totalNoVatPrice / 100

    const Label = (props) => (
      <Grid item xs={6}>
        <BodyText {...props} color={(theme) => theme.palette.text.secondary} />
      </Grid>
    )

    const Price = (props) => (
      <Grid item xs={6}>
        <BodyText {...props} />
      </Grid>
    )

    return (
      <Stack
        sx={{
          alignSelf: "end",
          border: (theme) => `1px solid ${theme.palette.secondary.main}`,
          borderRadius: "20px",
          padding: 2,
        }}
      >
        <Grid container>
          <Label>Total HT</Label>
          <Price>{totalNoVatPrice} €</Price>
          <Label>TVA</Label>
          <Price>{totalVat} €</Price>
          <Label>Total TTC</Label>
          <Price>{totalPrice} €</Price>
        </Grid>
      </Stack>
    )
  }

  if (loading) return <PleaseWait />

  /********** RENDER **********/
  return (
    <>
      <Stack width="100%" gap={4}>
        <CustomForm gap={4}>
          <Toolbar />

          {/* READ ONLY MODE */}
          {!EDIT_STATUSES.includes(quotation.status) && (
            <QuotationReadOnlySection items={items} />
          )}

          {/* EDIT MODE */}
          {EDIT_STATUSES.includes(quotation.status) && (
            <>
              <Stack gap={2} width="100%" overflow="auto">
                <Box
                  component="table"
                  sx={{
                    width: "99%",
                    marginLeft: "0.5%",
                    marginBottom: "0.5%",
                    marginTop: "0.5%",
                    borderCollapse: "collapse",
                    borderStyle: "hidden",
                    borderRadius: "20px",
                    boxShadow: (theme) =>
                      `0 0 0 2px ${theme.palette.secondary.main}`,
                    overflow: "hidden",
                  }}
                >
                  {HEAD.map((item, key) => (
                    <HeadCell key={key} width={item.width}>
                      {item.label}
                    </HeadCell>
                  ))}

                  {items.map((item, key) => (
                    <Line key={key} onClick={() => handleEdit(item, key)}>
                      <Cell>
                        {
                          QUOTATION_ITEM_TYPES.filter(
                            (elt) => elt.id === item.type
                          )[0].label
                        }
                      </Cell>
                      <Cell>{item.label}</Cell>
                      <Cell>{item.description}</Cell>
                      <Cell>{item.quantity}</Cell>
                      <Cell>{item.vat} %</Cell>
                      <Cell>{item.no_vat_price / 100} €</Cell>
                      <Cell>
                        {(item.no_vat_price / 100) *
                          item.quantity *
                          (1 + item.vat / 100)}{" "}
                        €
                      </Cell>
                    </Line>
                  ))}
                </Box>

                <Stack className="flex-center" width="100%">
                  <PillButton
                    startIcon={<AddIcon />}
                    onClick={handleOpenCreateModal}
                  >
                    Nouvelle ligne
                  </PillButton>
                </Stack>
              </Stack>

              <TotalPrices />
            </>
          )}
        </CustomForm>
      </Stack>

      {/* CREATE QUOTATION ITEM */}
      <CustomModal open={openCreateModal} handleClose={handleCloseCreateModal}>
        <CreateQuotationItemForm
          handleClose={handleCloseCreateModal}
          items={items}
          setItems={setItems}
          handleDetectChange={handleDetectChange}
        />
      </CustomModal>

      {/* EDIT QUOTATION ITEM */}
      <CustomModal open={openEditModal} handleClose={handleCloseEditModal}>
        <EditQuotationItemForm
          handleClose={handleCloseEditModal}
          incomingItem={selectedItem}
          items={items}
          setItems={setItems}
          itemIndex={selectedItemIndex}
          handleDetectChange={handleDetectChange}
        />
      </CustomModal>

      {/* SAVE QUOTATION / EDIT QUOTATION NAME */}
      <CustomModal
        open={openSaveModal}
        handleClose={handleCloseSaveModal}
        gap={4}
      >
        <ModalTitle>Enregistrer le devis</ModalTitle>
        <BodyText preventTransition>
          Vous pourrez retrouver le devis sur la page "Mes devis".
        </BodyText>
        <CustomForm gap={4}>
          <CustomFilledInput
            value={quotation.label}
            onChange={handleChange("label")}
            label="Nom du devis"
          />
          <Stack className="row" gap={2}>
            <CancelButton handleCancel={handleCancel} />
            <SubmitButton
              onClick={handleSave}
              icon={<SaveAltIcon />}
              disabled={quotation.label.trim() === ""}
            />
          </Stack>
        </CustomForm>
      </CustomModal>

      {/* SEND QUOTATION */}
      <CustomModal
        open={openSendModal}
        handleClose={handleCloseSendModal}
        gap={4}
      >
        <ModalTitle>Envoyer le devis</ModalTitle>
        {!!quotation.recipient_emails.length && (
          <AlertInfo
            content={{
              text: `Vous avez déjà envoyé le devis à ${recipientEmailsString}`,
            }}
          />
        )}
        {!!quotation.client?.email && (
          <BodyText preventTransition display="inline-flex" gap={1}>
            Le devis est destiné à
            <Box
              component="div"
              sx={{ color: (theme) => theme.palette.text.secondary }}
            >
              {quotation.client?.email}
            </Box>
          </BodyText>
        )}
        <CustomForm gap={4}>
          <CustomFilledInput
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            label="Destinataire (e-mail)"
            error={emailError}
            helperText={emailError && "Adresse e-mail invalide"}
          />
          <Stack className="row" gap={2}>
            <CancelButton handleCancel={handleCancel} />
            <SubmitButton onClick={handleSend} />
          </Stack>
        </CustomForm>
      </CustomModal>

      {/* ASSIGN CLIENT TO QUOTATION */}
      <CustomModal
        open={openAssignModal}
        handleClose={handleCloseAssignModal}
        gap={4}
      >
        <ModalTitle>Assigner le devis à un client</ModalTitle>
        <BodyText>
          Cherchez un client à partir de son prénom, nom ou e-mail.
        </BodyText>
        <CustomForm gap={4}>
          <ClientAutocomplete
            value={assignValue}
            setValue={setAssignValue}
            inputValue={assignInputValue}
            setInputValue={setAssignInputValue}
            defaultValue={quotation.client}
          />
          <Stack className="row" gap={2}>
            <CancelButton handleCancel={handleCloseAssignModal} />
            <SubmitButton onClick={handleAssign} />
          </Stack>
        </CustomForm>
      </CustomModal>
    </>
  )
}

export default withConfirmAction(QuotationForm)
