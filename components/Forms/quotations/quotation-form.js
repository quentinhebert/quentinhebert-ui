import { useState, useContext, useEffect } from "react"
import { Box, Grid, Slider, Stack, Typography } from "@mui/material"
import apiCall from "../../../services/apiCalls/apiCall"
import { AppContext } from "../../../contexts/AppContext"
import CustomForm from "../custom-form"
import BodyText from "../../Text/body-text"
import CustomModal from "../../Modals/custom-modal"
import CreateQuotationItemForm from "./create-quotation-item-form"
import EditQuotationItemForm from "./edit-quotation-item-form"
import CustomFilledInput from "../../Inputs/custom-filled-input"
import { QUOTATION_STATUS } from "../../../enums/quotationStatus"
import { QUOTATION_ITEM_TYPES } from "../../../enums/quotationItemTypes"
import DropdownOptions from "../../Dropdown/dropdown-options"
import { ModalTitle } from "../../Modals/Modal-Components/modal-title"
import { useRouter } from "next/router"
import PleaseWait from "../../Helpers/please-wait"
import withConfirmAction from "../../hocs/withConfirmAction"
import { checkEmail } from "../../../services/utils"
import QuotationReadOnlySection from "../../Sections/Quotations/quotation-read-only-section"
import AlertInfo from "../../Other/alert-info"
import ClientAutocomplete from "../admin/client-autocomplete"
import SubmitButton from "../../Buttons/submit-button"
import CancelButton from "../../Buttons/cancel-button"
import { Cell, HeadCell, Line } from "../../Tables/table-components"
import theme from "../../../config/theme"
import CustomDatePicker from "../../Inputs/custom-date-picker"
import DualInputLine from "../../Containers/dual-input-line"
import CustomCheckbox from "../../Inputs/custom-checkbox"
import SmallTitle from "../../Titles/small-title"
// Icons
import SendIcon from "@mui/icons-material/Send"
import DoneIcon from "@mui/icons-material/Done"
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd"
import DoneAllIcon from "@mui/icons-material/DoneAll"
import TitleIcon from "@mui/icons-material/Title"
import DeleteIcon from "@mui/icons-material/Delete"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import WarningAmberIcon from "@mui/icons-material/WarningAmber"
import AddIcon from "@mui/icons-material/Add"
import SaveAltIcon from "@mui/icons-material/SaveAlt"
import SwitchButton from "../../Inputs/switch-button"
import CustomFilledTextArea from "../../Inputs/custom-filled-text-area"
import WorkHistoryIcon from "@mui/icons-material/WorkHistory"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import EuroIcon from "@mui/icons-material/Euro"
import PercentIcon from "@mui/icons-material/Percent"
import SellIcon from "@mui/icons-material/Sell"
import HourglassTopIcon from "@mui/icons-material/HourglassTop"

// CONSTANTS
const PAYMENT_OPTIONS = [
  { id: "card", label: "Carte bancaire" },
  { id: "transfer", label: "Virement bancaire" },
  { id: "check", label: "Chèque de banque" },
  { id: "cash", label: "Espèces" },
]
const EDIT_STATUSES = [
  QUOTATION_STATUS.DRAFT.id,
  QUOTATION_STATUS.SENT.id,
  QUOTATION_STATUS.REFUSED.id,
]
const MODALS = {
  SAVE: "SAVE",
  SEND: "SEND",
  ASSIGN: "ASSIGN",
  CREATE_ITEM: "CREATE_ITEM",
  EDIT_ITEM: "EDIT_ITEM",
}
const HEAD = [
  { label: "Type" },
  { label: "Intitulé" },
  { label: "Description", width: { xs: "200px", md: "20%" } },
  { label: "Qté." },
  { label: "TVA" },
  { label: "Prix unit. HT" },
  { label: "Total" },
]

const noVatMention =
  "* TVA non applicable, art. 293B du Code Général des Impôts (CGI)"

const FormCard = ({ title, width, icon, ...props }) => (
  <Stack
    sx={{
      width: width || "100%",
      padding: "2rem",
      backgroundColor: (theme) => theme.palette.background.main,
      borderRadius: "30px",
      gap: 2,
    }}
  >
    <SmallTitle
      color="#fff"
      alignItems="center"
      display="flex"
      gap={2}
      marginBottom={2}
    >
      {icon}
      {title}
    </SmallTitle>
    <Stack {...props} width="100%" gap={2} />
  </Stack>
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
  const initialQuotation = {
    id: id,
    label: "",
    created_at: null,
    last_update: null,
    status: QUOTATION_STATUS.DRAFT.id,
    recipient_emails: [],
    client: {},
    date: null,
    delivery_date: null,
    duration: "",
    validity_end_date: null,
    payment_options: {
      card: false,
      transfer: false,
      check: false,
      cash: false,
    },
    payment_conditions: "",
    additional_mentions: "",
    deposit: 0,
    balance: 100,
    payment_delay_penalties:
      "Une indemnité forfaitaire de 40€, à laquelle s'ajoute un taux d'Intérêt de retard de 15%. Calcul des intérêts de retard : Somme due TTC * jours de retard * taux d’intérêt / (365 * 100).",
  }
  const [quotation, setQuotation] = useState(initialQuotation)
  const [items, setItems] = useState([])
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedItemIndex, setSelectedItemIndex] = useState(null)
  const [loading, setLoading] = useState(false)
  const [emailInput, setEmailInput] = useState("")
  const [assignValue, setAssignValue] = useState("")
  const [assignInputValue, setAssignInputValue] = useState("")
  const [modal, setModal] = useState(null)
  const [depositDisabled, setDepositDisabled] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [errors, setErrors] = useState({
    date: false,
    delivery_date: false,
    payment_conditions: false,
    payment_options: false,
  })

  /********** FETCH DATA **********/
  const fetchQuotation = async () => {
    if (!id) return
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
    fetchQuotation()
  }, [id])

  /********** HANDLERS **********/
  const handleDetectChange = () => setUnsavedChanges(true)
  const handleOpenModal = (modalMode) => {
    setOpenModal(true)
    setModal(modalMode)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
    setEmailInput("")
  }
  const handleChange = (attribute) => (e) => {
    setQuotation({ ...quotation, [attribute]: e.target.value })
    if (errors[attribute]) setErrors({ ...errors, [attribute]: false })
    handleDetectChange()
  }
  const handleChangeDate = (attribute) => (newValue) => {
    if (errors[attribute]) setErrors({ ...errors, [attribute]: false })
    setQuotation({ ...quotation, [attribute]: newValue })
    handleDetectChange()
  }
  const handleCheckPaymentOptions = (attribute) => (e) => {
    if (errors.payment_options) setErrors({ ...errors, payment_options: false })
    setQuotation({
      ...quotation,
      payment_options: {
        ...quotation.payment_options,
        [attribute]: e.target.checked,
      },
    })
    handleDetectChange()
  }
  const save = async () => {
    let res = null
    if (!id) {
      // If quotation is not created yet
      res = await apiCall.quotations.create(quotation, items)
    } else {
      // If quotation is created and needs to be saved/updated
      res = await apiCall.quotations.save({
        ...quotation,
        items,
        id,
      })
    }
    if (res && res.ok) {
      const jsonRes = await res.json()
      setSnackSeverity("success")
      setSnackMessage("Le devis a bien été enregistré")
      setOpenModal(false)
      // if no id provided === user is on CreateQuotationPage (not EditQuotationPage), we redirect the user onto the edit page (with the same quotationForm component)
      if (!id) return router.push(`/dashboard/quotations/${jsonRes.id}/edit`)
      await fetchQuotation()
      return true
    } else {
      setSnackSeverity("error")
      setSnackMessage("Une erreur est survenue...")
      return false
    }
  }
  const handleSave = async () => {
    if (quotation.label) return await save()
    handleOpenModal(MODALS.SAVE)
  }
  const handleEdit = (item, key) => {
    setSelectedItem(item)
    setSelectedItemIndex(key)
    handleOpenModal(MODALS.EDIT_ITEM)
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
  const sendQuotation = async () => {
    const res = await apiCall.quotations.send({
      id: quotation.id,
      email: emailInput,
    })
    if (res && res.ok) {
      setSnackSeverity("success")
      setSnackMessage("Succès")
      handleCloseModal()
      fetchQuotation()
    } else {
      setSnackSeverity("error")
      setSnackMessage("Erreur")
    }
  }
  const handleSend = async () => {
    if (emailInput.trim() !== "" && !emailError) return await sendQuotation()
    handleOpenModal(MODALS.SEND)
  }
  const handleAssign = async () => {
    const res = await apiCall.quotations.assignClient({
      id: quotation.id,
      clientId: assignValue?.id || null,
    })
    if (res && res.ok) {
      setSnackMessage("Client associé au devis avec succès")
      setSnackSeverity("success")
      handleCloseModal()
      fetchQuotation()
    } else {
      setSnackMessage("Une erreur est survenue")
      setSnackSeverity("error")
    }
  }
  const handleGenerate = async () => {
    let localErrors = errors
    if (!quotation.date) localErrors.date = true
    if (!quotation.delivery_date) localErrors.delivery_date = true
    if (!quotation.payment_conditions) localErrors.payment_conditions = true

    if (
      !Object.values(quotation.payment_options).filter((opt) => opt === true)
        .length
    )
      localErrors.payment_options = true
    setErrors(localErrors)

    if (!Object.values(localErrors).filter((elt) => elt === true).length) {
      // Save before exit page
      const saved = await save()
      if (!saved) return
      return router.push(`/quotation-view/${quotation.id}`)
    }
    setSnackMessage(
      `Certains champs sont manquants dans les conditions et mentions obligatoires.`
    )
    setSnackSeverity("error")
  }
  const handleVAT = (bool) => {
    if (bool)
      setQuotation({
        ...quotation,
        additional_mentions: noVatMention,
      })
    else
      setQuotation({
        ...quotation,
        additional_mentions: "",
      })
    handleDetectChange()
  }

  const emailError = emailInput.trim() !== "" && !checkEmail(emailInput)

  const recipientEmailsString = quotation.recipient_emails.join(", ")

  useEffect(() => {
    setQuotation({ ...quotation, balance: 100 - quotation.deposit })
  }, [quotation.deposit])

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
            color: (theme) => theme.alert.title.success.color,
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
          color: (theme) => theme.alert.title.success.color,
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
        handleClick: () => handleOpenModal(MODALS.SAVE),
        icon: <TitleIcon />,
      },
      {
        label: "Assigner à un client existant",
        handleClick: () => handleOpenModal(MODALS.ASSIGN),
        icon: <AssignmentIndIcon />,
      },
      {
        label: "Générer le devis PDF",
        handleClick: handleGenerate,
        icon: <PictureAsPdfIcon />,
      },
      {
        label: "Générer la facture PDF",
        handleClick: handleGenerate,
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
      <Stack
        width="100%"
        gap={4}
        sx={{
          position: "-webkit-sticky",
          position: "sticky",
          top: 60,
          background: "#000",
          padding: "1rem 0",
          zIndex: 10,
        }}
      >
        <BodyText
          preventTransition
          color={(theme) => theme.palette.text.secondary}
        >
          {quotation.label || "Sans nom"}{" "}
          <Box component="span" color="#fff" fontStyle="italic">
            {QUOTATION_STATUS[quotation.status].id === QUOTATION_STATUS.DRAFT.id
              ? `(${QUOTATION_STATUS[quotation.status].label})`
              : ""}
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
              <SubmitButton
                onClick={handleSave}
                icon={<SaveAltIcon />}
                preventTransition
              />
              <SubmitButton
                onClick={handleSend}
                label="Envoyer"
                icon={<SendIcon />}
                preventTransition
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
        <BodyText
          preventTransition
          {...props}
          color={(theme) => theme.palette.text.secondary}
        />
      </Grid>
    )

    const Price = (props) => (
      <Grid item xs={6}>
        <BodyText preventTransition {...props} />
      </Grid>
    )

    return (
      <Stack
        sx={{
          alignSelf: { xs: "end", md: "end" },
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
  const FormStack = (props) => (
    <Stack sx={{ width: { xs: "100%", md: "50%" } }} {...props} />
  )

  /********** LOADING **********/
  if (loading) return <PleaseWait />

  /********** RENDER **********/
  return (
    <>
      <Stack width="100%" gap={4}>
        <CustomForm gap={4}>
          {/********** TOOLBAR **********/}
          <Toolbar />

          {/* READ ONLY MODE */}
          {!EDIT_STATUSES.includes(quotation.status) && (
            <QuotationReadOnlySection items={items} quotation={quotation} />
          )}

          {/* EDIT MODE */}
          {EDIT_STATUSES.includes(quotation.status) && (
            <>
              {/********** CONDITIONS & MENTIONS **********/}
              <Stack
                sx={{
                  padding: "2rem 1rem",
                  gap: 8,
                  maxWidth: "900px",
                }}
              >
                <FormCard title="Prestation (1/6)" icon={<WorkHistoryIcon />}>
                  <DualInputLine>
                    <FormStack>
                      <CustomDatePicker
                        label="Date de la prestation"
                        value={quotation.date}
                        handleChange={handleChangeDate("date")}
                        error={errors.date}
                      />
                    </FormStack>
                    <CustomFilledInput
                      width={{ xs: "100%", md: "50%" }}
                      value={quotation.duration}
                      onChange={handleChange("duration")}
                      label="Durée estimée (optionnel)"
                      placeholder="1 jour de tournage et 3 jours de montage"
                    />
                  </DualInputLine>
                </FormCard>

                <FormCard title="Livraison (2/6)" icon={<LocalShippingIcon />}>
                  <CustomDatePicker
                    label="Date de livraison estimée"
                    value={quotation.delivery_date}
                    handleChange={handleChangeDate("delivery_date")}
                    error={errors.delivery_date}
                  />
                </FormCard>

                <FormCard title="Paiement (3/6)" icon={<EuroIcon />}>
                  <SwitchButton
                    checked={!depositDisabled}
                    handleCheck={(bool) => {
                      if (!bool)
                        setQuotation({
                          ...quotation,
                          deposit: 0,
                          balance: 100,
                        })
                      else
                        setQuotation({
                          ...quotation,
                          deposit: 60,
                          balance: 40,
                        })
                      setDepositDisabled(!bool)
                    }}
                    label="Paiment avec acompte"
                  />
                  {!depositDisabled ? (
                    <Stack
                      spacing={2}
                      direction="row"
                      sx={{ mb: 1 }}
                      alignItems="center"
                    >
                      <Typography color="secondary">
                        Acompte ({quotation.deposit}%)
                      </Typography>
                      <Slider
                        disabled={depositDisabled}
                        color="secondary"
                        aria-label="Temperature"
                        defaultValue={60}
                        valueLabelDisplay="auto"
                        onChange={(e, newValue) =>
                          setQuotation({ ...quotation, deposit: newValue })
                        }
                        step={5}
                        marks
                        min={0}
                        max={100}
                      />
                      <Typography color="secondary">
                        Solde ({quotation.balance}%)
                      </Typography>
                    </Stack>
                  ) : null}
                  <CustomFilledInput
                    label="Conditions de règlement"
                    placeholder="Accompte de 60% lors de la signature du devis. Solde de 40% entre le jour de la prestation et la livraison."
                    value={quotation.payment_conditions}
                    onChange={handleChange("payment_conditions")}
                    helperText="Accompte de 60% lors de la signature du devis. Solde de 40% entre le jour de la prestation et la livraison."
                    error={errors.payment_conditions}
                  />
                  <Stack
                    sx={{
                      background: "#000",
                      padding: ".75rem",
                      border: "1px solid",
                      borderColor: theme.palette.secondary.main,
                      borderRadius: "10px",
                      gap: 2,
                    }}
                  >
                    <BodyText
                      preventTransition
                      color={(theme) =>
                        errors.payment_options
                          ? theme.palette.error.main
                          : theme.palette.text.secondary
                      }
                      fontSize="1rem"
                    >
                      Moyen(s) de paiement
                    </BodyText>

                    <Grid container spacing={2}>
                      {PAYMENT_OPTIONS.map((opt) => (
                        <Grid item md={3} key={opt.id}>
                          <CustomCheckbox
                            label={opt.label}
                            checked={quotation.payment_options[opt.id]}
                            onChange={handleCheckPaymentOptions(opt.id)}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Stack>
                  <CustomFilledTextArea
                    id="payment_delay_penalties"
                    label="Pénalités de retard ou pour non paiement"
                    value={quotation.payment_delay_penalties}
                    onChange={handleChange("payment_delay_penalties")}
                  />
                </FormCard>

                <DualInputLine gap={4}>
                  <FormCard
                    title="TVA (4/6)"
                    width={{ xs: "100%", md: "50%" }}
                    icon={<PercentIcon />}
                  >
                    <SwitchButton
                      checked={quotation.additional_mentions === noVatMention}
                      handleCheck={handleVAT}
                      label="TVA non applicable, article 293B du Code Général des Impôts (CGI)"
                    />
                  </FormCard>

                  <FormCard
                    title="Validité du devis (5/6)"
                    icon={<HourglassTopIcon />}
                    width={{ xs: "100%", md: "50%" }}
                  >
                    <CustomDatePicker
                      label="Date de fin (optionnel)"
                      value={quotation.validity_end_date}
                      handleChange={handleChangeDate("validity_end_date")}
                    />
                  </FormCard>
                </DualInputLine>
              </Stack>

              {/********** ITEMS TABLE WITH PRICES / QTY. **********/}
              <SmallTitle
                color="#fff"
                alignItems="center"
                gap={2}
                display="flex"
              >
                <SellIcon />
                Détails des produits / services (6/6)
              </SmallTitle>
              <Stack gap={2} width="100%" overflow="auto">
                <Box
                  component="table"
                  sx={{
                    width: "99%",
                    margin: "0.5%",
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
              </Stack>

              {/********** NEW LINE BUTTON **********/}
              <Stack className="flex-center" width="100%">
                <SubmitButton
                  background={(theme) => theme.palette.background.secondary}
                  color="#000"
                  icon={<AddIcon />}
                  label="Nouvelle ligne"
                  onClick={() => handleOpenModal(MODALS.CREATE_ITEM)}
                />
              </Stack>

              {/********** TOTAL PRICES **********/}
              <TotalPrices />
            </>
          )}
        </CustomForm>
      </Stack>

      <CustomModal open={openModal} handleClose={handleCloseModal} gap={4}>
        {/* CREATE QUOTATION ITEM */}
        {modal === MODALS.CREATE_ITEM && (
          <CreateQuotationItemForm
            handleClose={handleCloseModal}
            items={items}
            setItems={setItems}
            handleDetectChange={handleDetectChange}
          />
        )}

        {/* EDIT QUOTATION ITEM */}
        {modal === MODALS.EDIT_ITEM && (
          <EditQuotationItemForm
            handleClose={handleCloseModal}
            incomingItem={selectedItem}
            items={items}
            setItems={setItems}
            itemIndex={selectedItemIndex}
            handleDetectChange={handleDetectChange}
          />
        )}

        {/* SAVE QUOTATION / EDIT QUOTATION NAME */}
        {modal === MODALS.SAVE && (
          <>
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
                <CancelButton handleCancel={handleCloseModal} />
                <SubmitButton
                  onClick={handleSave}
                  icon={<SaveAltIcon />}
                  disabled={quotation.label.trim() === ""}
                />
              </Stack>
            </CustomForm>
          </>
        )}

        {/* SEND QUOTATION */}
        {modal === MODALS.SEND && (
          <>
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
                <CancelButton handleCancel={handleCloseModal} />
                <SubmitButton onClick={handleSend} />
              </Stack>
            </CustomForm>
          </>
        )}

        {/* ASSIGN CLIENT TO QUOTATION */}
        {modal === MODALS.ASSIGN && (
          <>
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
                <CancelButton handleCancel={handleCloseModal} />
                <SubmitButton onClick={handleAssign} />
              </Stack>
            </CustomForm>
          </>
        )}
      </CustomModal>
    </>
  )
}

export default withConfirmAction(QuotationForm)
