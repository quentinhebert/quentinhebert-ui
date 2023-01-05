import { useState, useContext, useEffect } from "react"
import { Box, Grid, Slider, Stack, Typography } from "@mui/material"
import apiCall from "../../../services/apiCalls/apiCall"
import { AppContext } from "../../../contexts/AppContext"
import CustomForm from "../custom-form"
import BodyText from "../../Text/body-text"
import CustomModal from "../../Modals/custom-modal"
import CreateOrderItemForm from "./create-order-item-form"
import EditOrderItemForm from "./edit-order-item-form"
import CustomFilledInput from "../../Inputs/custom-filled-input"
import { QUOTATION_STATUS } from "../../../enums/quotationStatus"
import { QUOTATION_ITEM_TYPES } from "../../../enums/quotationItemTypes"
import DropdownOptions from "../../Dropdown/dropdown-options"
import { ModalTitle } from "../../Modals/Modal-Components/modal-title"
import { useRouter } from "next/router"
import withConfirmAction from "../../hocs/withConfirmAction"
import { buildPublicURL, checkEmail } from "../../../services/utils"
import QuotationReadOnlySection from "../../Sections/Quotations/quotation-read-only-section"
import ClientAutocomplete from "../admin/client-autocomplete"
import SubmitButton from "../../Buttons/submit-button"
import CancelButton from "../../Buttons/cancel-button"
import { Cell, HeadCell, Line } from "../../Tables/table-components"
import theme from "../../../config/theme"
import CustomDatePicker from "../../Inputs/custom-date-picker"
import DualInputLine from "../../Containers/dual-input-line"
import CustomCheckbox from "../../Inputs/custom-checkbox"
import SmallTitle from "../../Titles/small-title"
import { checkBeforeGen } from "../../../services/quotations"
import PillButton from "../../Buttons/pill-button"
import { ORDERSTATES } from "../../../enums/orderStates"
import CancelTextButton from "../../Buttons/cancel-text-button"
import QuotationClientFieldsForm from "../quotations/quotation-client-fields-form"
import { formatDayDate } from "../../../services/date-time"

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
import LaunchIcon from "@mui/icons-material/Launch"
import EditIcon from "@mui/icons-material/Edit"
import DescriptionIcon from "@mui/icons-material/Description"
import DownloadIcon from "@mui/icons-material/Download"
import AlertInfo from "../../Other/alert-info"
import { INVOICETYPES } from "../../../enums/invoiceTypes"

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
  PAYMENT: "PAYMENT",
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

/********** OTHER COMPONENTS **********/
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
    {!!title && (
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
    )}
    <Stack {...props} width="100%" gap={4} />
  </Stack>
)
const AddButton = ({ onClick }) => (
  <PillButton
    startIcon={<AddIcon />}
    fontSize="0.8rem"
    padding=".25rem 1rem"
    preventTransition
    onClick={onClick}
  >
    Ajouter
  </PillButton>
)
const EditButton = ({ onClick, label }) => (
  <PillButton
    startIcon={<EditIcon />}
    fontSize="0.8rem"
    padding=".25rem 1rem"
    preventTransition
    onClick={onClick}
  >
    {label || "Modifier"}
  </PillButton>
)
const DocumentType = (props) => (
  <BodyText preventTransition display="flex" alignItems="center" {...props} />
)
const DocumentHeader = (props) => (
  <Stack
    className="row"
    justifyContent="space-between"
    alignItems="center"
    padding={1.5}
    sx={{ background: "rgb(0,0,0, 0.5)", borderRadius: "10px" }}
    {...props}
  />
)
const GridItem = ({ xs, textAlign, ...props }) => (
  <Grid item xs={xs || 2.5} textAlign={textAlign || "left"}>
    <BodyText {...props} preventTransition fontSize="1rem" />
  </Grid>
)
const OrderListHead = ({}) => (
  <Grid container>
    <GridItem color="grey" fontSize="1rem" xs={2}>
      Numéro
    </GridItem>
    <GridItem color="grey" fontSize="1rem">
      Type
    </GridItem>
    <GridItem color="grey" fontSize="1rem"></GridItem>
    <GridItem color="grey" fontSize="1rem"></GridItem>
    <GridItem color="grey" fontSize="1rem" textAlign="right">
      Émise le
    </GridItem>
  </Grid>
)
const QuotationsListHead = ({}) => (
  <Grid container>
    <GridItem color="grey" fontSize="1rem" xs={2}>
      Version
    </GridItem>
    <GridItem color="grey" fontSize="1rem">
      Status
    </GridItem>
    <GridItem color="grey" fontSize="1rem"></GridItem>
    <GridItem color="grey" fontSize="1rem"></GridItem>
    <GridItem color="grey" fontSize="1rem" textAlign="right">
      Créé le
    </GridItem>
  </Grid>
)
const ActionButton = ({ onClick, label, icon }) => (
  <GridItem
    className="pointer flex gap-10 flex-center"
    preventTransition
    onClick={onClick}
    sx={{
      "&:hover": {
        color: (theme) => theme.palette.text.secondary,
      },
    }}
  >
    {icon} {label}
  </GridItem>
)
const OrderListItem = ({ invoice }) => {
  const handleDownload = () => {
    if (invoice.path) return window.open(buildPublicURL(invoice.path))
  }
  return (
    <Stack sx={{ justifyContent: "space-between" }} width="100%">
      <Grid container>
        <GridItem xs={2}>{invoice.number}</GridItem>
        <GridItem textTransform="capitalize">
          {INVOICETYPES[invoice.type]}
        </GridItem>
        <GridItem>
          <ActionButton
            icon={<DownloadIcon />}
            label="Télécharger"
            onClick={handleDownload}
          />
        </GridItem>
        <GridItem></GridItem>

        <GridItem color="grey" textAlign="right">
          {formatDayDate({ timestamp: invoice.created_at })}
        </GridItem>
      </Grid>
    </Stack>
  )
}
const QuotationsListItem = ({ quotation, router, handleSend }) => {
  const color = (theme) =>
    theme.alert.title[QUOTATION_STATUS[quotation.status].severity].color
  const label = QUOTATION_STATUS[quotation.status].label
  const version = `V${quotation.version}`
  const handleDownload = () => {
    if (quotation.path) return window.open(buildPublicURL(quotation.path))
    router.push(`/quotation-view/${quotation.id}`)
  }
  return (
    <Stack sx={{ justifyContent: "space-between" }} width="100%">
      <Grid container>
        <GridItem xs={2}>{version}</GridItem>
        <GridItem color={color}>{label}</GridItem>
        <GridItem>
          <ActionButton
            icon={<DownloadIcon />}
            label="Télécharger"
            onClick={handleDownload}
          />
        </GridItem>
        <GridItem>
          <ActionButton
            icon={<SendIcon />}
            label="Envoyer"
            onClick={() => handleSend(quotation.id)}
          />
        </GridItem>

        <GridItem color="grey" textAlign="right">
          {formatDayDate({ timestamp: quotation.last_update })}
        </GridItem>
      </Grid>
    </Stack>
  )
}
const DocumentsSection = ({
  order,
  handleGenerate,
  handleGenerateInvoice,
  handleSend,
}) => {
  const router = useRouter()
  return (
    <>
      <FormCard>
        <Stack gap={2}>
          <DocumentHeader>
            <DocumentType>Devis</DocumentType>
            <AddButton onClick={handleGenerate} />
          </DocumentHeader>

          <BodyText preventTransition fontSize="1rem">
            Rappel : devis obligatoire pour les commandes dont le montant est
            supérieur à 1500€.
          </BodyText>

          {order.quotations.length === 0 && (
            <BodyText fontSize="1rem" color="grey" preventTransition>
              Aucun devis.
            </BodyText>
          )}

          <Stack gap={2} padding="0" marginTop={2}>
            {order.quotations?.length > 0 && <QuotationsListHead />}
            {order.quotations.map((quotation, key) => (
              <QuotationsListItem
                quotation={quotation}
                router={router}
                handleSend={handleSend}
                key={key}
              />
            ))}
          </Stack>
        </Stack>
      </FormCard>

      <FormCard>
        <Stack gap={2}>
          <DocumentHeader>
            <DocumentType>Factures</DocumentType>
            <AddButton onClick={handleGenerateInvoice} />
          </DocumentHeader>

          {(!order.invoices || order.invoices?.length === 0) && (
            <BodyText fontSize="1rem" color="grey" preventTransition>
              Aucune facture.
            </BodyText>
          )}
          <Stack gap={2}>
            {order.invoices?.length > 0 && <OrderListHead />}
            {!!order.invoices &&
              order.invoices.map((invoice, key) => (
                <OrderListItem invoice={invoice} router={router} key={key} />
              ))}
          </Stack>
        </Stack>
      </FormCard>
    </>
  )
}
const ClientSection = ({ order, handleOpenAssign }) => {
  const Title = (props) => (
    <BodyText
      preventTransition
      fontSize="1rem"
      {...props}
      color={(theme) => theme.palette.text.grey}
    />
  )
  const Value = (props) => (
    <BodyText preventTransition fontSize="1rem" {...props} />
  )
  const Identity = (props) => (
    <BodyText preventTransition fontSize="1.2rem" {...props} />
  )
  return (
    <FormCard>
      <DocumentHeader>
        <Identity>
          {!order.client.id && "Aucun client associé"}
          {order.client.firstname} {order.client.lastname}
        </Identity>
        <EditButton label="Assigner" onClick={handleOpenAssign} />
      </DocumentHeader>

      <Stack gap={2}>
        <Stack>
          <Title>E-mail</Title>
          <Value>{order.client.email || ""}</Value>
        </Stack>
        <Stack>
          <Title>Téléphone</Title>
          <Value>{order.client.phone || ""}</Value>
        </Stack>
        <Stack>
          <Title>Addresse</Title>
          <Value>
            {order.client.line1 || ""} {order.client.line2 || ""}{" "}
            {order.client.postal_code || ""} {order.client.city || ""}{" "}
            {order.client.region || ""} {order.client.country || ""}
          </Value>
        </Stack>
      </Stack>
    </FormCard>
  )
}
const SectionTitle = ({ label, firstElement }) => (
  <Stack
    width="100%"
    flexDirection="row"
    gap={2}
    alignItems="center"
    margin={`${!!firstElement ? 0 : "4rem"} 0 1rem`}
  >
    <Stack
      borderBottom="1px solid"
      flexGrow={1}
      sx={{ borderColor: (theme) => theme.palette.text.secondary }}
    />
    <SmallTitle>{label}</SmallTitle>
    <Stack
      borderBottom="1px solid"
      flexGrow={1}
      sx={{ borderColor: (theme) => theme.palette.text.secondary }}
    />
  </Stack>
)
const PaymentSection = ({ handleGenerate }) => {
  return (
    <FormCard textAlign="center">
      <PillButton onClick={handleGenerate}>
        Générer un lien de paiement en ligne
      </PillButton>
      <PillButton
        background="transparent"
        border={(theme) => `1px solid ${theme.palette.secondary.main}`}
        color={(theme) => theme.palette.secondary.main}
      >
        Marquer comme payée
      </PillButton>
    </FormCard>
  )
}

function OrderForm({
  id,
  setActionToFire,
  setOpenConfirmModal,
  setConfirmTitle,
  setConfirmContent,
  setNextButtonText,
  defaultReadonly,
}) {
  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  /********** ROUTER **********/
  const router = useRouter()

  /********** INITIAL OBJECT **********/
  const initialOrder = {
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
    no_vat: false,
    payment_delay_penalties:
      "Une indemnité forfaitaire de 40€, à laquelle s'ajoute un taux d'Intérêt de retard de 15%. Calcul des intérêts de retard : Somme due TTC * jours de retard * taux d’intérêt / (365 * 100). Les jours de retard sont calculés à partir de la date de réception de la facture.",
    quotations: [],
  }

  /********** USE-STATES **********/
  const [order, setOrder] = useState(initialOrder)
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
  const [readOnly, setReadOnly] = useState(defaultReadonly)
  const [errors, setErrors] = useState({
    date: false,
    delivery_date: false,
    payment_conditions: false,
    payment_options: false,
  })
  const [newClient, setNewClient] = useState(false)
  const [selectedQuotation, setSelectedQuotation] = useState(null)
  const [paymentEmail, setPaymentEmail] = useState(null)

  /********** FETCH DATA **********/
  const fetchOrder = async () => {
    if (!id) return
    setLoading(true)
    const res = await apiCall.orders.get({ id })
    if (res && res.ok) {
      const jsonRes = await res.json()
      // Populate order
      setOrder(jsonRes)
      // Populate order items
      setItems(jsonRes.items)
      setLoading(false)
      setUnsavedChanges(false)
    }
  }

  /********** INITIAL FETCH (edit page only) **********/
  useEffect(() => {
    fetchOrder()
  }, [id])

  /********** USE-EFFECTS **********/
  useEffect(() => {
    const balance = 100 - order.deposit
    setOrder({ ...order, balance })
    if (balance === 100) setDepositDisabled(true)
  }, [order.deposit])

  /********** HANDLERS **********/
  const toggleNewClient = (newValue) => setNewClient(newValue)
  const missingFieldsSnack = () => {
    setSnackMessage(`Certains champs obligatoires sont manquants.`)
    setSnackSeverity("error")
  }
  const handleDetectChange = () => setUnsavedChanges(true)
  const handleOpenModal = (modalMode) => {
    setOpenModal(true)
    setModal(modalMode)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
    setEmailInput("")
    setNewClient(false)
  }
  const handleChange = (attribute) => (e) => {
    setOrder({ ...order, [attribute]: e.target.value })
    if (errors[attribute]) setErrors({ ...errors, [attribute]: false })
    handleDetectChange()
  }
  const handleChangeDate = (attribute) => (newValue) => {
    if (errors[attribute]) setErrors({ ...errors, [attribute]: false })
    setOrder({ ...order, [attribute]: newValue })
    handleDetectChange()
  }
  const handleCheckPaymentOptions = (attribute) => (e) => {
    if (errors.payment_options) setErrors({ ...errors, payment_options: false })
    setOrder({
      ...order,
      payment_options: {
        ...order.payment_options,
        [attribute]: e.target.checked,
      },
    })
    handleDetectChange()
  }
  const save = async () => {
    let res = null
    if (!id) {
      // If order is not created yet
      res = await apiCall.orders.create(order, items)
    } else {
      // If order is created and needs to be saved/updated
      res = await apiCall.orders.save({
        ...order,
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
      if (!id) return router.push(`/dashboard/orders/${jsonRes.id}/edit`)
      await fetchOrder()
      setReadOnly(true)
      return true
    } else {
      setSnackSeverity("error")
      setSnackMessage("Une erreur est survenue...")
      return false
    }
  }
  const handleSave = async () => {
    if (order.label) return await save()
    handleOpenModal(MODALS.SAVE)
  }
  const handleEdit = (item, key) => {
    setSelectedItem(item)
    setSelectedItemIndex(key)
    handleOpenModal(MODALS.EDIT_ITEM)
  }
  const deleteOrder = async () => {
    setLoading(true)
    const res = await apiCall.orders.delete(order)
    if (res && res.ok) {
      setSnackMessage("Devis supprimé")
      setSnackSeverity("success")
      router.push("/dashboard?active_tab=orders")
    } else {
      setSnackMessage("Un problème est survenu")
      setSnackSeverity("error")
    }
    setLoading(false)
  }
  const handleDelete = async () => {
    setActionToFire(() => () => deleteOrder())
    setOpenConfirmModal(true)
    setNextButtonText("Supprimer")
    setConfirmTitle("Supprimer la commande")
    setConfirmContent({
      text: `Voulez vous vraiment supprimer la commande ${order.label} ? Les devis et factures associés seront également supprimés.`,
    })
  }
  const sendQuotation = async (quotationId, email) => {
    const res = await apiCall.quotations.send({
      id: quotationId,
      email: email || emailInput,
    })
    if (res && res.ok) {
      setSnackSeverity("success")
      setSnackMessage("Succès")
      handleCloseModal()
      fetchOrder()
    } else {
      setSnackSeverity("error")
      setSnackMessage("Erreur")
    }
  }
  const handleSend = async (quotationId, email) => {
    const localErrors = checkBeforeGen(order)
    setErrors(localErrors)
    const errorsCount = Object.values(localErrors).filter(
      (elt) => elt === true
    ).length

    // No problem
    if (errorsCount > 0 && !(errorsCount === 1 && localErrors.client))
      return missingFieldsSnack()

    if (!!email || (emailInput.trim() !== "" && !emailError))
      return await sendQuotation(quotationId, email)

    const res = await apiCall.quotations.get({ id: quotationId })
    if (res && res.ok) {
      const jsonRes = await res.json()
      setSelectedQuotation(jsonRes)
    }
    handleOpenModal(MODALS.SEND)
  }
  const handleAssign = async () => {
    const res = await apiCall.orders.assignClient({
      id: order.id,
      clientId: assignValue?.id || null,
    })
    if (res && res.ok) {
      setSnackMessage("Client associé au devis avec succès")
      setSnackSeverity("success")
      handleCloseModal()
      fetchOrder()
    } else {
      setSnackMessage("Une erreur est survenue")
      setSnackSeverity("error")
    }
  }
  const handleVAT = (bool) => {
    setOrder({
      ...order,
      no_vat: bool,
    })
    handleDetectChange()
  }
  const handleGenerate = async () => {
    const localErrors = checkBeforeGen(order)

    setErrors(localErrors)
    const errorsCount = Object.values(localErrors).filter(
      (elt) => elt === true
    ).length

    if (errorsCount === 0 || (errorsCount === 1 && localErrors.client)) {
      // Save before exit page
      const saved = await save()
      if (!saved) return
      const res = await apiCall.orders.generateQuotation(order)
      if (res && res.ok) await fetchOrder()
    } else {
      setSnackMessage(
        `Certains champs sont manquants dans les conditions et mentions obligatoires.`
      )
      setSnackSeverity("error")
      setReadOnly(false)
    }
  }
  const handleGeneratePaymentLink = async () => {
    setPaymentEmail(order.client?.email)
    handleOpenModal(MODALS.PAYMENT)
  }
  const generatePaymentLink = async () => {
    setPaymentEmail(order.client?.email)
    handleOpenModal(MODALS.PAYMENT)
    const res = await apiCall.orders.sendPaymentLink({
      id: order.id,
      email: paymentEmail,
    })
    if (res && res.ok) {
      setSnackMessage("Lien de paiement envoyé")
      setSnackSeverity("success")
      handleCloseModal()
    } else {
      setSnackMessage("Erreur")
      setSnackSeverity("error")
    }
  }
  const handleGenerateInvoice = async () => {
    // TODO:
    // if no quotation => ok
    // if quotation => quotation need to be accepted
    // Warning: if invoice generated manually => order is considered paid
  }

  const emailError = emailInput.trim() !== "" && !checkEmail(emailInput)
  const getRecipientString = (recipientEmails) => recipientEmails.join(", ")

  /********** SUB-COMPONENTS **********/
  const Status = () => {
    const Container = ({ color, ...props }) => (
      <BodyText
        preventTransition
        fontSize="1rem"
        sx={{
          color: color,
          display: "inline-flex",
          gap: ".5rem",
          alignItems: "center",
        }}
        {...props}
      />
    )

    if (!order.id)
      return (
        <Container color={(theme) => theme.palette.error.main}>
          Pas enregistré <WarningAmberIcon />
        </Container>
      )

    if (unsavedChanges)
      return (
        <Container color={(theme) => theme.alert.title.warning}>
          Modifications non sauvegardées{" "}
          <AccessTimeIcon sx={{ display: "inline-flex" }} />
        </Container>
      )

    if (order.status === ORDERSTATES.ACCEPTED?.id)
      return (
        <Container color={(theme) => theme.alert.title.success.color}>
          Accepté par le client <DoneAllIcon />
        </Container>
      )

    // return (
    //   <Container color={(theme) => theme.alert.title.success.color}>
    //     Enregistré <DoneIcon />
    //   </Container>
    // )
    return <></>
  }
  const Toolbar = () => {
    const options = [
      {
        label: "Sauvegarder",
        handleClick: () => handleSave(),
        icon: <SaveAltIcon />,
      },
      {
        label: "Changer le nom",
        handleClick: () => handleOpenModal(MODALS.SAVE),
        icon: <TitleIcon />,
      },
      // {
      //   label: "Envoyer le devis à un e-mail",
      //   handleClick: () => handleSend(),
      //   icon: <SendIcon />,
      // },
    ]

    if (readOnly)
      options.push({
        label: "Modifier",
        handleClick: () => setReadOnly(false),
        icon: <EditIcon />,
      })

    // if (order.quotations.length === 0)
    options.push({
      label: "Assigner à un client",
      handleClick: () => handleOpenModal(MODALS.ASSIGN),
      icon: <AssignmentIndIcon />,
    })

    if (!!id)
      options.push({
        label: "Supprimer la commande",
        handleClick: handleDelete,
        icon: <DeleteIcon />,
      })

    return (
      <Stack
        width="100%"
        sx={{
          position: "-webkit-sticky",
          position: "sticky",
          top: 60,
          background: "#000",
          zIndex: 10,
          padding: "1rem 0",
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          justifyContent: "space-between",
        }}
      >
        {loading ? (
          <BodyText preventTransition color="#fff" fontSize="1rem">
            Patientez...
          </BodyText>
        ) : (
          <Status />
        )}
        {readOnly ? (
          <Stack alignItems="center" width="100%" flexDirection="row" gap={2}>
            <Stack>
              <BodyText
                preventTransition
                color={(theme) => theme.palette.text.secondary}
              >
                {order.label || "Sans nom"}{" "}
                <Box component="span" color="#fff" fontStyle="italic">
                  {ORDERSTATES[order.status].id === ORDERSTATES.DRAFT.id
                    ? `(${ORDERSTATES[order.status].label})`
                    : ""}{" "}
                  – {getPriceDetails().totalPrice}€
                </Box>
              </BodyText>
              {!!order.client?.id && (
                <BodyText preventTransition fontSize="1rem">
                  Pour {order.client?.firstname} {order.client?.lastname || ""}
                </BodyText>
              )}

              {/* {!EDIT_STATUSES.includes(order.status) && (
              <AlertInfo
                content={{
                  show: true,
                  severity: "info",
                  title: "Lecture seule",
                  text: "Le devis est en mode lecture seule. Vous ne pouvez plus le modifier car le client l'a accepté. Il faut maintenant générer le devis définitif avec toutes les mentions légales. Enfin, les deux parties devront signer le devis.",
                }}
              />
            )} */}
            </Stack>
            {/* <Stack alignItems="center" width="100%" flexDirection="row" gap={2}> */}
            {/* {EDIT_STATUSES.includes(order.status) && (
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
          )} */}

            <Stack flexGrow={1} />
            <DropdownOptions options={options} />
          </Stack>
        ) : (
          <>
            <Stack flexGrow={1} />
            <Stack className="row" alignItems="center" gap={2}>
              <BodyText
                preventTransition
                fontSize="1rem"
                color={(theme) => theme.palette.text.secondary}
                className="cool-button pointer"
                onClick={() => {
                  setReadOnly(true)
                  fetchOrder()
                }}
              >
                Annuler
              </BodyText>
              <PillButton onClick={handleSave}>Enregistrer</PillButton>
            </Stack>
          </>
        )}
      </Stack>
    )
  }
  const getPriceDetails = () => {
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
    return {
      totalPrice,
      totalNoVatPrice,
      totalVat,
    }
  }
  const TotalPrices = () => {
    const { totalPrice, totalNoVatPrice, totalVat } = getPriceDetails()

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

  if (order.file?.path)
    return (
      <Stack>
        <PillButton
          startIcon={<LaunchIcon />}
          href={order.file?.path}
          target="_blank"
        >
          Voir le devis
        </PillButton>
      </Stack>
    )

  /********** RENDER **********/
  return (
    <>
      <Stack width="100%" gap={4}>
        <CustomForm gap={4}>
          {/********** TOOLBAR **********/}
          <Toolbar />

          {/* READ ONLY MODE */}
          {(!EDIT_STATUSES.includes(order.status) || readOnly) && (
            <>
              <SectionTitle label="Documents" firstElement />
              <DocumentsSection
                order={order}
                handleGenerate={handleGenerate}
                handleGenerateInvoice={handleGenerateInvoice}
                handleSend={handleSend}
              />
              <SectionTitle label="Client" />
              <ClientSection
                order={order}
                handleOpenAssign={() => handleOpenModal(MODALS.ASSIGN)}
              />
              <SectionTitle label="Détails de la commande" />
              <QuotationReadOnlySection items={items} quotation={order} />
              <SectionTitle label="Paiement" />
              <PaymentSection handleGenerate={handleGeneratePaymentLink} />
            </>
          )}

          {/* EDIT MODE */}
          {!readOnly && EDIT_STATUSES.includes(order.status) && (
            <>
              {/********** CONDITIONS & MENTIONS **********/}
              <Stack
                sx={{
                  padding: "2rem 1rem",
                  gap: 8,
                  maxWidth: "900px",
                }}
              >
                <FormCard title="Prestation (1/5)" icon={<WorkHistoryIcon />}>
                  <DualInputLine>
                    <FormStack>
                      <CustomDatePicker
                        disablePast
                        label="Date de la prestation"
                        value={order.date}
                        handleChange={handleChangeDate("date")}
                        error={errors.date}
                      />
                    </FormStack>
                    <CustomFilledInput
                      width={{ xs: "100%", md: "50%" }}
                      value={order.duration}
                      onChange={handleChange("duration")}
                      label="Durée estimée (optionnel)"
                      placeholder="1 jour de tournage et 3 jours de montage"
                    />
                  </DualInputLine>
                </FormCard>

                <FormCard title="Livraison (2/5)" icon={<LocalShippingIcon />}>
                  <CustomDatePicker
                    disablePast
                    label="Date de livraison estimée"
                    value={order.delivery_date}
                    handleChange={handleChangeDate("delivery_date")}
                    error={errors.delivery_date}
                  />
                </FormCard>

                <FormCard title="Paiement (3/5)" icon={<EuroIcon />}>
                  <SwitchButton
                    checked={!depositDisabled}
                    handleCheck={(bool) => {
                      if (!bool)
                        setOrder({
                          ...order,
                          deposit: 0,
                          balance: 100,
                        })
                      else
                        setOrder({
                          ...order,
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
                        Acompte ({order.deposit}%)
                      </Typography>
                      <Slider
                        disabled={depositDisabled}
                        color="secondary"
                        aria-label="Temperature"
                        defaultValue={60}
                        valueLabelDisplay="auto"
                        onChange={(e, newValue) =>
                          setOrder({ ...order, deposit: newValue })
                        }
                        step={5}
                        marks
                        min={0}
                        max={100}
                      />
                      <Typography color="secondary">
                        Solde ({order.balance}%)
                      </Typography>
                    </Stack>
                  ) : null}
                  <CustomFilledInput
                    label="Conditions de règlement"
                    placeholder="Accompte de 60% lors de la signature du devis. Solde de 40% entre le jour de la prestation et la livraison."
                    value={order.payment_conditions}
                    onChange={handleChange("payment_conditions")}
                    helperText={
                      <>
                        Accompte de 60% lors de la signature du devis. Solde de
                        40% entre le jour de la prestation et la livraison.
                        <br />
                        Paiement en une fois à la signature du devis.
                      </>
                    }
                    error={errors.payment_conditions}
                  />
                  <Stack
                    sx={{
                      background: "#000",
                      padding: ".75rem",
                      border: "1px solid",
                      borderColor: errors.payment_options
                        ? theme.palette.error.main
                        : theme.palette.secondary.main,
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
                            labelcolor={
                              errors.payment_options
                                ? (theme) => theme.palette.error.main
                                : null
                            }
                            checkboxcolor={
                              errors.payment_options
                                ? (theme) => theme.palette.error.main
                                : null
                            }
                            label={opt.label}
                            checked={order.payment_options[opt.id]}
                            onChange={handleCheckPaymentOptions(opt.id)}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Stack>
                  <CustomFilledTextArea
                    id="payment_delay_penalties"
                    label="Pénalités de retard ou pour non paiement"
                    value={order.payment_delay_penalties}
                    onChange={handleChange("payment_delay_penalties")}
                    error={errors.payment_delay_penalties}
                  />
                </FormCard>

                <FormCard title="TVA (4/5)" icon={<PercentIcon />}>
                  <SwitchButton
                    checked={order.no_vat}
                    handleCheck={handleVAT}
                    label="TVA non applicable, article 293B du Code Général des Impôts (CGI)"
                  />
                </FormCard>

                {/* <FormCard
                    title="Validité du devis (5/6)"
                    icon={<HourglassTopIcon />}
                    width={{ xs: "100%", md: "50%" }}
                  >
                    <CustomDatePicker
                      disablePast
                      label="Date de fin (optionnel)"
                      value={order.validity_end_date}
                      handleChange={handleChangeDate("validity_end_date")}
                    />
                  </FormCard> */}
              </Stack>

              {/********** ITEMS TABLE WITH PRICES / QTY. **********/}
              <SmallTitle
                color="#fff"
                alignItems="center"
                gap={2}
                display="flex"
              >
                <SellIcon />
                Détails des produits / services (5/5)
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
        {/* CREATE ORDER ITEM */}
        {modal === MODALS.CREATE_ITEM && (
          <CreateOrderItemForm
            noVat={order.no_vat}
            handleClose={handleCloseModal}
            items={items}
            setItems={setItems}
            handleDetectChange={handleDetectChange}
          />
        )}

        {/* EDIT ORDER ITEM */}
        {modal === MODALS.EDIT_ITEM && (
          <EditOrderItemForm
            noVat={order.no_vat}
            handleClose={handleCloseModal}
            incomingItem={selectedItem}
            items={items}
            setItems={setItems}
            itemIndex={selectedItemIndex}
            handleDetectChange={handleDetectChange}
          />
        )}

        {/* SAVE ORDER / EDIT ORDER NAME */}
        {modal === MODALS.SAVE && (
          <>
            <ModalTitle alignItems="center" display="flex" gap={1}>
              <SaveAltIcon /> Sauvegarder la commande
            </ModalTitle>
            <BodyText preventTransition fontSize="1rem">
              Vous retrouverez la commande sur la page "Mes devis".
            </BodyText>
            <CustomForm gap={4}>
              <CustomFilledInput
                value={order.label}
                onChange={handleChange("label")}
                label="Nom de la commande"
              />
              <Stack className="row" gap={2} alignSelf="end">
                <CancelTextButton handleCancel={handleCloseModal} />
                <PillButton
                  onClick={handleSave}
                  disabled={order.label?.trim() === ""}
                >
                  Enregistrer
                </PillButton>
              </Stack>
            </CustomForm>
          </>
        )}

        {/* SEND QUOTATION */}
        {modal === MODALS.SEND && (
          <>
            <ModalTitle>Envoyer le devis</ModalTitle>
            {!!selectedQuotation?.recipient_emails?.length && (
              <AlertInfo
                content={{
                  // js: `Vous avez déjà envoyé le devis à ${getRecipientString(
                  //   selectedQuotation.recipient_emails
                  // )}`,
                  js: (
                    <span>
                      Vous avez déjà envoyé le devis à{" "}
                      {selectedQuotation.recipient_emails.map((email, key) => {
                        const isLastEmail =
                          key === selectedQuotation.recipient_emails.length - 1
                        return (
                          <>
                            <Box
                              key={key}
                              component="span"
                              onClick={() => setEmailInput(email)}
                              sx={{
                                textDecoration: "underline",
                                cursor: "pointer",
                                "&:hover": {
                                  color: (theme) =>
                                    theme.palette.text.secondary,
                                },
                              }}
                            >
                              {email}
                            </Box>
                            {isLastEmail ? "." : ", "}
                          </>
                        )
                      })}
                    </span>
                  ),
                }}
              />
            )}
            <CustomForm gap={4}>
              {!!selectedQuotation?.client?.email && (
                <PillButton
                  textTransform="capitalize"
                  onClick={() => {
                    handleSend(
                      selectedQuotation.id,
                      selectedQuotation.client.email
                    )
                  }}
                >
                  Envoyer à <br />
                  {selectedQuotation.client.email}
                </PillButton>
              )}

              <BodyText>ou</BodyText>

              <CustomFilledInput
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                label="Destinataire (e-mail)"
                error={emailError}
                helperText={emailError && "Adresse e-mail invalide"}
              />
              <Stack className="row" gap={2}>
                <CancelButton handleCancel={handleCloseModal} />
                <SubmitButton
                  onClick={() => handleSend(selectedQuotation.id)}
                  label="Envoyer"
                />
              </Stack>
            </CustomForm>
          </>
        )}

        {/* ASSIGN CLIENT TO ORDER */}
        {modal === MODALS.ASSIGN && (
          <>
            <ModalTitle>Assigner la commande à un client</ModalTitle>

            <SwitchButton
              checked={newClient}
              handleCheck={toggleNewClient}
              label="Nouveau client"
            />

            {newClient ? (
              <QuotationClientFieldsForm />
            ) : (
              <CustomForm gap={4}>
                <ClientAutocomplete
                  value={assignValue}
                  setValue={setAssignValue}
                  inputValue={assignInputValue}
                  setInputValue={setAssignInputValue}
                  defaultValue={order.client}
                  placeholder="Prénom, Nom ou E-mail"
                />
                <Stack className="row" gap={2}>
                  <CancelButton handleCancel={handleCloseModal} />
                  <SubmitButton onClick={handleAssign} />
                </Stack>
              </CustomForm>
            )}
          </>
        )}

        {/* SEND PAYMENT LINK */}
        {modal === MODALS.PAYMENT && (
          <>
            <ModalTitle>Envoyer un lien de paiement</ModalTitle>
            <CustomForm gap={4}>
              <CustomFilledInput
                value={paymentEmail}
                onChange={(e) => setPaymentEmail(e.target.value)}
                label="Destinataire (e-mail)"
                error={emailError} // FIXME: email error is not correct => need to separate logic for different emails
                helperText={emailError && "Adresse e-mail invalide"}
              />
              <Stack className="row" gap={2}>
                <CancelButton handleCancel={handleCloseModal} />
                <SubmitButton onClick={generatePaymentLink} label="Envoyer" />
              </Stack>
            </CustomForm>
          </>
        )}
      </CustomModal>
    </>
  )
}

export default withConfirmAction(OrderForm)
