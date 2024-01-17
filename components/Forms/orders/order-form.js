import { useState, useContext, useEffect } from "react"
import {
  Box,
  Grid,
  InputAdornment,
  Slider,
  Stack,
  Table,
  TableCell,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material"
import apiCall from "../../../services/apiCalls/apiCall"
import { AppContext } from "../../../contexts/AppContext"
import CustomForm from "../custom-form"
import BodyText from "../../Text/body-text"
import CustomModal from "../../Modals/custom-modal"
import CreateOrderItemForm from "./create-order-item-form"
import EditOrderItemForm from "./edit-order-item-form"
import CustomFilledInput from "../../Inputs/custom-filled-input"
import { QUOTATION_STATUS } from "../../../enums/quotationStatus"
import DropdownOptions from "../../Dropdown/dropdown-options"
import { ModalTitle } from "../../Modals/Modal-Components/modal-title"
import { useRouter } from "next/router"
import withConfirmAction from "../../hocs/withConfirmAction"
import {
  buildPublicURL,
  checkEmail,
  formatPrice,
} from "../../../services/utils"
import OrderReadOnlySection from "../../Sections/Orders/order-read-only-section"
import ClientAutocomplete from "../admin/client-autocomplete"
import SubmitButton from "../../Buttons/submit-button"
import CancelButton from "../../Buttons/cancel-button"
import theme from "../../../config/theme"
import CustomDatePicker from "../../Inputs/custom-date-picker"
import DualInputLine from "../../Containers/dual-input-line"
import SmallTitle from "../../Titles/small-title"
import { checkBeforeGen } from "../../../services/quotations"
import PillButton from "../../Buttons/pill-button"
import { ORDERSTATES } from "../../../enums/orderStates"
import CancelTextButton from "../../Buttons/cancel-text-button"
import QuotationClientFieldsForm from "../quotations/quotation-client-fields-form"
import { formatDayDate } from "../../../services/date-time"
import AlertInfo from "../../Other/alert-info"
import { INVOICETYPES } from "../../../enums/invoiceTypes"
import PriceDetails from "../../Sections/Account/Orders/price-details"
import CustomRadio from "../../Inputs/custom-radio"
import Pill from "../../Text/pill"
import FullWidthTabs from "../../Navigation/full-width-tabs"
import {
  getNextPaymentDetails,
  getPaymentFractionsDetails,
  parseOrderPrice,
} from "../../../services/orders"
import { PAYMENTSTATES } from "../../../enums/paymentStates"
import { PAYMENT_TYPES, STRIPE_PM } from "../../../enums/paymentTypes"
import CustomOutlinedInput from "../../Inputs/custom-outlined-input"
import CustomFilledTextArea from "../../Inputs/custom-filled-text-area"
import { ACTIVITY_TYPES } from "../../../enums/activityTypesEnum"
import Span from "../../Text/span"
import CustomCard from "../../Cards/custom-card"

// Icons
import Timeline from "@mui/lab/Timeline"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import SendIcon from "@mui/icons-material/Send"
import DoneIcon from "@mui/icons-material/Done"
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd"
import TitleIcon from "@mui/icons-material/Title"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import SaveAltIcon from "@mui/icons-material/SaveAlt"
import SwitchButton from "../../Inputs/switch-button"
import WorkHistoryIcon from "@mui/icons-material/WorkHistory"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import EuroIcon from "@mui/icons-material/Euro"
import PercentIcon from "@mui/icons-material/Percent"
import SellIcon from "@mui/icons-material/Sell"
import LaunchIcon from "@mui/icons-material/Launch"
import EditIcon from "@mui/icons-material/Edit"
import DownloadIcon from "@mui/icons-material/Download"
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox"
import AddBoxIcon from "@mui/icons-material/AddBox"
import CheckIcon from "@mui/icons-material/CheckCircleOutline"
import InsertLinkIcon from "@mui/icons-material/InsertLink"
import SimpleCheckIcon from "@mui/icons-material/Check"
import RefreshButton from "../../Buttons/refresh-button"
import { SortableContainer, SortableElement } from "react-sortable-hoc"
import { arrayMoveImmutable } from "array-move"
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  timelineItemClasses,
} from "@mui/lab"
import { UserContext } from "../../../contexts/UserContext"
import CustomAccordion from "../../Containers/custom-accordion"
import { LOG_CONTENT } from "../../../services/logs"
import dynamic from "next/dynamic"
import ReactLinkify from "react-linkify"
const ReactJson = dynamic(() => import("react-json-view"), { ssr: false })

// CONSTANTS
const PAYMENT_OPTIONS = [
  { id: "CASH", label: "Espèces" },
  { id: "CHECK", label: "Chèque" },
  { id: "TRANSFER", label: "Virement" },
  { id: "CARD", label: "CB" },
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
  TAG: "TAG",
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
const PAYMENT_MODES = { ONCE: "ONCE", TWICE: "TWICE", MULTIPLE: "MULTIPLE" }

/********** OTHER COMPONENTS **********/
const FormCard = ({ title, width, icon, gap, step, totalSteps, ...props }) => (
  <Stack
    sx={{
      width: width || "100%",
      padding: { xs: "1rem", md: "2rem" },
      backgroundColor: (theme) => theme.palette.background.main,
      borderRadius: "20px",
      gap: 2,
    }}
  >
    {!!title && (
      <SmallTitle
        variant="h4"
        textTransform="initial"
        // color="#fff"
        color={(theme) => theme.palette.secondary.main}
        // alignItems="end"
        display="flex"
        gap={2}
        marginBottom={2}
      >
        {icon}
        {title}
        <Box sx={{ color: "#fff", fontSize: "0.8em" }}>
          ({step}/{totalSteps})
        </Box>
      </SmallTitle>
    )}
    <Stack {...props} width="100%" gap={gap || 4} />
  </Stack>
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
const AddButton = ({ onClick, isQuotationGenerating, ...props }) => (
  <PillButton
    disabled={isQuotationGenerating}
    startIcon={<AddIcon />}
    fontSize="0.8rem"
    padding=".25rem 1rem"
    preventTransition
    onClick={onClick}
    {...props}
  >
    {isQuotationGenerating ? "Veuillez patienter..." : "Ajouter"}
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
const GridItem = ({ xs, md, textAlign, ...props }) => (
  <Grid
    item
    xs={xs || 2.5}
    md={md || xs || 2.5}
    textAlign={textAlign || "left"}
  >
    <BodyText {...props} preventTransition fontSize="1rem" />
  </Grid>
)
const OrderListHead = ({}) => (
  <Grid container marginTop={2} minWidth="700px">
    <GridItem color="grey" fontSize="1rem" xs={2}>
      Numéro
    </GridItem>
    <GridItem color="grey" fontSize="1rem">
      Type
    </GridItem>
    <GridItem color="grey" fontSize="1rem">
      Montant
    </GridItem>
    <GridItem color="grey" fontSize="1rem"></GridItem>
    <GridItem color="grey" fontSize="1rem" textAlign="right">
      Émise le
    </GridItem>
  </Grid>
)
const QuotationsListHead = ({}) => (
  <Grid container marginTop={2} minWidth="400px">
    <GridItem color="grey" fontSize="1rem" xs={2}>
      Version
    </GridItem>
    <GridItem color="grey" fontSize="1rem">
      Status
    </GridItem>
    <GridItem color="grey" fontSize="1rem" xs={2} md={2.5}></GridItem>
    <GridItem color="grey" fontSize="1rem" xs={2} md={2.5}></GridItem>
    <GridItem color="grey" fontSize="1rem" xs={3.5} md={2.5} textAlign="right">
      Créé le
    </GridItem>
  </Grid>
)
const ActionButton = ({ onClick, label, icon }) => (
  <GridItem
    className="flex pointer gap-10"
    preventTransition
    onClick={onClick}
    sx={{
      "&:hover": {
        color: (theme) => theme.palette.text.secondary,
      },
    }}
  >
    {icon}{" "}
    <Box component="span" sx={{ display: { xs: "none", md: "block" } }}>
      {label}
    </Box>
  </GridItem>
)
const OrderListItem = ({ invoice }) => {
  const handleDownload = () => {
    if (invoice.path) return window.open(buildPublicURL(invoice.path))
  }
  return (
    <Stack sx={{ justifyContent: "space-between" }} minWidth="700px">
      <Grid container>
        <GridItem xs={2}>{invoice.number}</GridItem>
        <GridItem textTransform="capitalize">
          {INVOICETYPES[invoice.type]}
        </GridItem>
        <GridItem>{invoice.amount_paid / 100}€</GridItem>
        <GridItem>
          <ActionButton
            icon={<DownloadIcon />}
            label="Télécharger"
            onClick={handleDownload}
          />
        </GridItem>

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
    <Stack sx={{ justifyContent: "space-between" }} minWidth="400px">
      <Grid container>
        <GridItem xs={2}>{version}</GridItem>
        <GridItem color={color}>{label}</GridItem>
        <GridItem
          xs={2}
          md={2.5}
          sx={{
            display: "flex !important",
            justifyContent: "center !important",
          }}
        >
          {!!quotation?.path ? (
            <ActionButton
              icon={<DownloadIcon />}
              label="Télécharger"
              onClick={handleDownload}
            />
          ) : (
            "Patientez..."
          )}
        </GridItem>
        <GridItem
          xs={2}
          md={2.5}
          sx={{
            display: "flex !important",
            justifyContent: "center !important",
          }}
        >
          <ActionButton
            icon={<SendIcon />}
            label="Envoyer"
            onClick={() => handleSend(quotation.id)}
          />
        </GridItem>
        <GridItem color="grey" xs={3.5} md={2.5} textAlign="right">
          {formatDayDate({ timestamp: quotation.last_update })}
        </GridItem>
      </Grid>
    </Stack>
  )
}
const DocumentsSection = ({
  order,
  handleGenerate,
  handleSend,
  isQuotationGenerating,
  refreshData,
  loading,
}) => {
  const router = useRouter()
  return (
    <Stack width="100%" gap={2}>
      <FormCard>
        <Stack gap={2}>
          <DocumentHeader>
            <DocumentType>
              Devis
              {!!order.quotations?.length
                ? ` (${order.quotations.length})`
                : ""}
            </DocumentType>

            <Stack className="row gap-10 flex-center">
              <RefreshButton refresh={refreshData} loading={loading} />
              <AddButton
                disabled={order.status !== "DRAFT" || isQuotationGenerating}
                onClick={handleGenerate}
                isQuotationGenerating={isQuotationGenerating}
              />
            </Stack>
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

          <Stack gap={2} padding="0" overflow="auto">
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
            <DocumentType>
              Factures
              {!!order.invoices?.length ? ` (${order.invoices.length})` : ""}
            </DocumentType>

            <RefreshButton refresh={refreshData} loading={loading} />
          </DocumentHeader>

          {(!order.invoices || order.invoices?.length === 0) && (
            <BodyText fontSize="1rem" color="grey" preventTransition>
              Aucune facture.
            </BodyText>
          )}
          <Stack gap={2} overflow="auto" width="100%">
            {order.invoices?.length > 0 && <OrderListHead />}
            {!!order.invoices &&
              order.invoices.map((invoice, key) => (
                <OrderListItem invoice={invoice} router={router} key={key} />
              ))}
          </Stack>
        </Stack>
      </FormCard>
    </Stack>
  )
}
const ClientSection = ({ order, handleOpenAssign }) => {
  const Title = (props) => (
    <TableCell sx={{ verticalAlign: "baseline" }}>
      <BodyText
        preventTransition
        fontSize="1rem"
        whiteSpace="nowrap"
        {...props}
        color={(theme) => theme.palette.text.grey}
      />
    </TableCell>
  )
  const Value = (props) => (
    <TableCell sx={{ textAlign: "right", verticalAlign: "baseline" }}>
      <BodyText preventTransition fontSize="1rem" {...props} />
    </TableCell>
  )
  const Identity = (props) => (
    <BodyText preventTransition fontSize="1.2rem" {...props} />
  )
  function UndefinedValue() {
    return (
      <Box
        component="span"
        sx={{
          color: (theme) => `${theme.palette.error.main} !important`,
          fontStyle: "italic",
        }}
      >
        Non renseigné
      </Box>
    )
  }
  return (
    <>
      {!order.client?.id && (
        <AlertInfo
          content={{
            severity: "warning",
            text: "Veuillez assigner un client à la commande.",
          }}
        />
      )}
      <FormCard>
        <DocumentHeader>
          <Identity>
            {!order.client.id && "Aucun client associé"}
            {order.client.firstname} {order.client.lastname}{" "}
            <Box component="span" color="grey">
              {!!order.client.company && ` / ${order.client.company}`}
            </Box>
          </Identity>
          <EditButton label="Assigner" onClick={handleOpenAssign} />
        </DocumentHeader>

        <Table
          sx={{
            width: "100%",
            "& .MuiTableCell-root": {
              borderBottom: "none",
              padding: ".5rem .25rem",
              paddingRight: "1rem",
              overflowWrap: "break-word",
              wordWrap: "break-word",
              "-ms-word-break": "break-all",
              wordBreak: "break-all",
              wordBreak: "break-word",
              "-ms-hyphens": "auto",
              "-moz-hyphens": "auto",
              "-webkit-hyphens": "auto",
              hyphens: "auto",
            },
          }}
        >
          <TableRow>
            <Title>E-mail</Title>
            <Value>{order.client.email || <UndefinedValue />}</Value>
          </TableRow>
          <TableRow>
            <Title>Téléphone</Title>
            <Value>{order.client.phone || <UndefinedValue />}</Value>
          </TableRow>
          <TableRow>
            <Title>Addresse</Title>
            <Value>
              {order.client.line1 || ""} {order.client.line2 || ""}{" "}
              {order.client.postal_code || ""} {order.client.city || ""}{" "}
              {order.client.region || ""} {order.client.country || ""}
            </Value>
          </TableRow>
        </Table>
      </FormCard>
    </>
  )
}
const PaymentSection = ({ handleGenerate, order, handleOpenTag }) => {
  const nextPayment = getNextPaymentDetails({ order })

  // If mission paid, payment section not displayed
  if (order.status === "PAYMENT_SUCCEEDED") return <PaymentsList />
  return (
    <>
      <PaymentsList />

      <FormCard textAlign="center">
        <Stack width="100%" maxWidth="500px" margin="auto" gap={2}>
          <CustomCard gap={4} backgroundColor="rgb(0,0,0, 0.6)">
            <Typography>
              Prochain paiement ({nextPayment.paymentStep})
            </Typography>

            <Stack>
              <Typography color="secondary" variant="h2">
                {formatPrice(nextPayment.amount)}€
              </Typography>
              <Typography textTransform="capitalize" color="grey">
                {nextPayment.label} ({nextPayment.percent})
              </Typography>
            </Stack>

            <Stack gap={2}>
              <PillButton
                onClick={handleGenerate}
                textTransform="initial"
                width="auto"
                endIcon={<InsertLinkIcon />}
              >
                Générer un lien de paiement en ligne
              </PillButton>
              <Tooltip
                title={
                  !order.client?.id ? "Vous devez assigner un client." : ""
                }
              >
                <div>
                  <PillButton
                    disabled={!order.client?.id}
                    textTransform="initial"
                    background="transparent"
                    border={(theme) =>
                      `1px solid ${theme.palette.secondary.main}`
                    }
                    color={(theme) => theme.palette.secondary.main}
                    onClick={handleOpenTag}
                    width="auto"
                    endIcon={<SimpleCheckIcon />}
                  >
                    Marquer le prochain paiement comme réglé
                  </PillButton>
                </div>
              </Tooltip>
            </Stack>
          </CustomCard>
        </Stack>
      </FormCard>
    </>
  )

  function PaymentsList() {
    if (!order.payments.length) return <></>
    return (
      <FormCard gap={2}>
        <BodyText preventTransition fontSize="1rem" color="grey">
          Récapitulatif des paiements
        </BodyText>

        <Stack gap={1}>
          {order.payments.map((payment, key) => {
            const bgColor = (theme) =>
              theme.alert.title[PAYMENTSTATES[payment.status].severity]
                .background
            const color = (theme) =>
              theme.alert.title[PAYMENTSTATES[payment.status].severity].color
            const border = (theme) =>
              `1px solid ${
                theme.alert.title[PAYMENTSTATES[payment.status].severity].color
              }`
            return (
              <Stack
                key={key}
                flexDirection="row"
                gap={1}
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  background: "rgb(0,0,0,0.3)",
                  padding: ".5rem 1.5rem",
                  borderRadius: "20px",
                }}
              >
                <Stack flexDirection="row" gap={2} alignItems="center">
                  <Pill
                    preventTransition
                    bgColor={bgColor}
                    border={border}
                    padding="0rem .75rem"
                    lineHeight="0"
                  >
                    <BodyText fontSize="1rem" color={color} preventTransition>
                      {PAYMENTSTATES[payment.status].label}
                    </BodyText>
                  </Pill>
                  <BodyText preventTransition fontSize="1rem">
                    {payment.amount / 100}€
                  </BodyText>
                  <BodyText preventTransition fontSize="1rem" color="grey">
                    {!!payment.metadata?.type && (
                      <>
                        {STRIPE_PM[payment.metadata?.type]}:{" "}
                        {payment.metadata?.type === "card" &&
                          `**** **** **** ${payment.metadata?.last4}`}
                        {payment.metadata?.type === "sepa_debit" &&
                          `FR** **** **** **** **** ***${
                            payment.metadata?.last4[0]
                          } ${payment.metadata?.last4.slice(1)}`}
                      </>
                    )}
                    {/* FIXME: FR is hard written, should be dynamic */}
                  </BodyText>
                </Stack>

                <Stack flexDirection="row" gap={2}>
                  <BodyText
                    fontSize="1rem"
                    color="grey"
                    preventTransition
                    fontStyle="italic"
                  >
                    {PAYMENT_TYPES[payment.type].label}
                  </BodyText>
                  <BodyText fontSize="1rem" color="grey" preventTransition>
                    {formatDayDate({ timestamp: payment.created_at })}
                  </BodyText>
                </Stack>
              </Stack>
            )
          })}
        </Stack>
      </FormCard>
    )
  }
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
    no_vat: false,
    payment_delay_penalties:
      "Une indemnité forfaitaire de 40€, à laquelle s'ajoute un taux d'Intérêt de retard de 15%. Calcul des intérêts de retard : Somme due TTC * jours de retard * taux d’intérêt / (365 * 100). Les jours de retard sont calculés à partir de la date de réception de la facture.",
    quotations: [],
    payments: [],
    payment_fractions: [100],
    activity_type: ACTIVITY_TYPES.video,
  }

  /********** USE-STATES **********/
  const [order, setOrder] = useState(initialOrder)
  const [items, setItems] = useState([])
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedItemIndex, setSelectedItemIndex] = useState(null)
  const [loading, setLoading] = useState(false)
  const [emailInput, setEmailInput] = useState("")
  const [assignValue, setAssignValue] = useState({})
  const [assignInputValue, setAssignInputValue] = useState("")
  const [modal, setModal] = useState(null)
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
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_OPTIONS[0].id)
  const [activeTab, setActiveTab] = useState(0)
  const [paymentMode, setPaymentMode] = useState(PAYMENT_MODES.ONCE)
  const [processing, setProcessing] = useState(false)
  const [isQuotationGenerating, setIsQuotationGenerating] = useState(false)

  // DEBUG
  const nextPayment = getNextPaymentDetails({ order })
  const paymentFractions = getPaymentFractionsDetails({ order })

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
      // Set payment mode
      switch (jsonRes.payment_fractions.length) {
        case 1:
          setPaymentMode(PAYMENT_MODES.ONCE)
          break
        case 2:
          setPaymentMode(PAYMENT_MODES.TWICE)
          break
        default:
          setPaymentMode(PAYMENT_MODES.MULTIPLE)
          break
      }

      setLoading(false)
      setUnsavedChanges(false)
      return true
    } else return false
  }

  /********** INITIAL FETCH (edit page only) **********/
  useEffect(() => {
    fetchOrder()
  }, [id])

  const TABS = [
    { label: "Détails" },
    { label: "Modalités" },
    { label: "Client", warning: !order.client?.id },
    { label: "Paiement(s)", badge: order.payments?.length },
    {
      label: "Document(s)",
      badge: order.quotations?.length + order.invoices?.length,
    },
    {
      label: "Historique",
    },
  ]

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
    setSelectedItemIndex(null)
    setSelectedItem(null)
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
  const handleChangeActivityType = (activityType) =>
    setOrder({ ...order, activity_type: activityType })
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
  const save = async ({ noSnack }) => {
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
      if (!noSnack) {
        setSnackSeverity("success")
        setSnackMessage("Commande sauvegardée")
      }
      setOpenModal(false)
      window.scrollTo({ top: 0, behavior: "smooth" })
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
    if (order.label) return await save({ noSnack: false })
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
    if (bool) {
      const localItems = items
      localItems.map((item) => (item.vat = 0))
      setItems(localItems)
    }
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
      setIsQuotationGenerating(true)

      // Save before exit page
      const saved = await save({
        noSnack: true,
      })
      if (!saved) return
      const res = await apiCall.orders.generateQuotation(order)
      if (res && res.ok) {
        setSnackMessage("Devis en cours de création...")
        setSnackSeverity("info")
      }
    } else {
      setSnackMessage(
        `Certains champs sont manquants dans les conditions et mentions obligatoires.`
      )
      setSnackSeverity("error")
      setReadOnly(false)
    }
  }

  const [awaitingQuotes, setAwaitingQuotes] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setAwaitingQuotes((prevState) => {
        const localAQ = order.quotations.filter((q) => !q.path).length
        if (prevState === 1 && localAQ === 0) setIsQuotationGenerating(false)
        return localAQ
      })

      if (isQuotationGenerating) fetchOrder()
    }, 1000 * 5) // in milliseconds

    return () => clearInterval(interval)
  }, [order.quotations])

  const handleGeneratePaymentLink = async () => {
    const localErrors = checkBeforeGen(order)

    setErrors(localErrors)
    const errorsCount = Object.values(localErrors).filter(
      (elt) => elt === true
    ).length

    if (errorsCount === 0 || (errorsCount === 1 && localErrors.client)) {
      setPaymentEmail(order.client?.email)
      handleOpenModal(MODALS.PAYMENT)
    } else {
      setSnackMessage(
        `Certains champs sont manquants dans les conditions et mentions obligatoires.`
      )
      setSnackSeverity("error")
      setReadOnly(false)
    }
  }
  const handleTag = async () => {
    setProcessing(true)
    const res = await apiCall.orders.tagAsPaid({
      orderId: order.id,
      paymentMethod,
    })
    if (res && res.ok) {
      setSnackMessage("La commande a bien été marquée comme payée !")
      setSnackSeverity("success")
      fetchOrder()
      handleCloseModal()
    } else {
      setSnackMessage("Erreur")
      setSnackSeverity("error")
    }
    setProcessing(false)
  }
  const generatePaymentLink = async () => {
    if (paymentEmail.trim === "") setPaymentEmail(order.client?.email)
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
  const updateOrderReady = async () => {
    if (order.status !== "DRAFT") return
    const res = await apiCall.orders.save({
      ...order,
      status: "WAITING_FOR_PAYMENT",
      items,
      id,
    })
    if (res && res.ok) {
      setSnackMessage("Votre commande est en attente de paiement")
      setSnackSeverity("success")
      fetchOrder()
    } else {
      setSnackMessage("Un problème est survenu...")
      setSnackSeverity("error")
    }
  }
  const handleOrderReady = () => {
    setActionToFire(() => async () => await updateOrderReady())
    setOpenConfirmModal(true)
    setConfirmTitle("Marquer la commande comme prête")
    setConfirmContent({
      js: (
        <>
          <BodyText>Voulez-vous vraiment publier la commande ?</BodyText>
          <AlertInfo
            content={{
              show: true,
              title: "Important",
              text: "Une fois publiée, il ne sera plus possible de la modifier.",
              severity: "warning",
            }}
          />
        </>
      ),
    })
    setNextButtonText("Oui, ma commande est prête")
  }

  const emailError = emailInput.trim() !== "" && !checkEmail(emailInput)
  const getRecipientString = (recipientEmails) => recipientEmails.join(", ")

  /********** SUB-COMPONENTS **********/
  const Status = () => (
    <Pill
      border="1px solid"
      borderColor={theme.alert.title[ORDERSTATES[order.status].severity].color}
      bgColor={theme.alert.title[ORDERSTATES[order.status].severity].background}
      preventTransition
      padding="0 .75rem"
      lineHeight={0}
    >
      <BodyText
        color={theme.alert.title[ORDERSTATES[order.status].severity].color}
        fontSize="0.8rem"
        preventTransition
        whiteSpace="nowrap"
      >
        {ORDERSTATES[order.status].label}
      </BodyText>
    </Pill>
  )
  const Toolbar = () => {
    const options = []

    options.push({
      label: "La commande est prête",
      handleClick: () => handleOrderReady(),
      icon: <SimpleCheckIcon />,
    })
    if (readOnly && EDIT_STATUSES.includes(order.status))
      options.push({
        label: "Modifier",
        handleClick: () => setReadOnly(false),
        icon: <EditIcon />,
      })
    options.push({
      label: "Changer le nom",
      handleClick: () => handleOpenModal(MODALS.SAVE),
      icon: <TitleIcon />,
    })
    options.push({
      label: "Sauvegarder",
      handleClick: () => handleSave(),
      icon: <SaveAltIcon />,
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

    let amountSumArray = []
    paymentFractions.map((elt) => amountSumArray.push(`${elt.amount / 100}€`))

    return (
      <Stack
        width="100%"
        sx={{
          position: "-webkit-sticky",
          position: "sticky",
          top: 50,
          background: "#000",
          zIndex: 10,
          padding: "1rem 0 1.5rem",
          alignItems: "left",
          margin: "1rem 0",
          "&::after": {
            zIndex: -1,
            background: "transparent",
            height: "100%",
            width: "100vw",
            position: "absolute",
            bottom: 0,
            left: { xs: "-1rem", md: "-3rem" },
            borderBottom: (theme) =>
              `1px solid ${theme.palette.secondary.main}`,
            content: `''`,
          },
        }}
      >
        {readOnly ? (
          <>
            <BodyText
              preventTransition
              fontSize="1.5rem"
              color={(theme) => theme.palette.text.secondary}
            >
              {order.label || "Sans nom"}
            </BodyText>
            <BodyText preventTransition color="grey" fontSize="1rem">
              Commande
              {!!order.client.firstname
                ? ` de ${order.client.firstname} ${order.client.lastname || ""}`
                : null}
              {!!order.client.company && ` / ${order.client.company}`}
            </BodyText>

            <Stack
              alignItems="end"
              width="100%"
              flexDirection="row"
              justifyContent="space-between"
              gap={2}
            >
              <Stack gap={1} className="flex-center row">
                <BodyText fontSize="1.5rem" preventTransition>
                  {(
                    Math.round(parseOrderPrice({ order, items }).totalPrice) /
                    100
                  ).toFixed(2)}
                  €
                </BodyText>

                <Status />
              </Stack>

              <Stack
                gap={2}
                className="flex-center"
                flexDirection={{ xs: "column", md: "row" }}
              >
                {order.status === "DRAFT" && (
                  <PillButton
                    preventTransition
                    width="auto"
                    padding="0 1rem"
                    startIcon={<CheckIcon />}
                    display={{ xs: "none", md: "flex" }}
                    onClick={handleOrderReady}
                  >
                    Commande prête ?
                  </PillButton>
                )}
                <DropdownOptions options={options} />
              </Stack>
            </Stack>
          </>
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
                  if (!order.id)
                    return router.push("/dashboard?active_tab=orders")
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
  const FormStack = (props) => (
    <Stack sx={{ width: { xs: "100%", md: "50%" } }} {...props} />
  )
  const TogglePaymentMode = () => (
    <ToggleButtonGroup
      color="primary"
      value={paymentMode}
      exclusive
      onChange={(e, val) => {
        switch (val) {
          case PAYMENT_MODES.ONCE:
            setOrder({ ...order, payment_fractions: [100] })
            break
          case PAYMENT_MODES.TWICE:
            setOrder({ ...order, payment_fractions: [60, 40] })
            break
          case PAYMENT_MODES.MULTIPLE:
            setOrder({ ...order, payment_fractions: [40, 30, 30] })
            break
        }
        setPaymentMode(val)
      }}
      sx={{
        justifyContent: "center",
        "& .Mui-selected": {
          backgroundColor: (theme) =>
            `${theme.palette.secondary.main} !important`,
        },
        "&>.MuiToggleButton-root": {
          borderRadius: "30px",
          backgroundColor: "rgb(0,0,0,0.2)",
          padding: ".5rem 1rem",
          textTransform: "initial",
          "&:hover": {
            color: (theme) => theme.palette.text.primary,
            backgroundColor: (theme) => theme.palette.secondary.main,
            opacity: 0.7,
          },
        },
      }}
    >
      <ToggleButton value={PAYMENT_MODES.ONCE}>Paiement unique</ToggleButton>
      <ToggleButton value={PAYMENT_MODES.TWICE}>Acompte / solde</ToggleButton>
      <ToggleButton value={PAYMENT_MODES.MULTIPLE}>Plusieurs fois</ToggleButton>
    </ToggleButtonGroup>
  )
  const ActivityTypeCard = ({ label, selected, ...props }) => (
    <Stack
      sx={{
        borderRadius: "30px",
        border: selected
          ? (theme) => `2px solid ${theme.palette.secondary.main}`
          : (theme) => `2px solid ${theme.palette.primary.main}`,
        padding: { xs: "1rem 2rem", md: "1rem 3rem" },
        background: selected
          ? (theme) => theme.palette.secondary.main
          : "transparent",
        cursor: "pointer",
      }}
      {...props}
    >
      <Typography
        variant="h4"
        color={selected ? "#000" : (theme) => theme.palette.primary.main}
      >
        {label}
      </Typography>
    </Stack>
  )
  const Li = ({ attribute, text }) => (
    <Box
      component="li"
      onClick={() => setOrder({ ...order, [attribute]: text })}
      sx={{
        cursor: "pointer",
        "&:hover": { color: (theme) => theme.palette.text.secondary },
      }}
    >
      {text}
    </Box>
  )
  const Cell = (props) => (
    <Stack
      sx={{
        padding: 2,
        height: "100%",
      }}
    >
      <BodyText color="#fff" {...props} preventTransition />
    </Stack>
  )
  const HeadCell = (props) => (
    <Stack
      sx={{
        bgcolor: "primary.main",
        padding: 2,
        height: "100%",
      }}
    >
      <BodyText color="#fff" {...props} preventTransition />
    </Stack>
  )

  const fractionSum = order.payment_fractions.reduce(
    (a, b) => Number(a) + Number(b),
    0
  )

  const onSortEnd = (e) => {
    const newState = arrayMoveImmutable(items, e.oldIndex, e.newIndex)
    setItems(newState)
    document.body.style.cursor = "default"
  }
  const SortableRow = SortableElement(({ item, index, onClick, ...props }) => {
    return (
      <Box
        onClick={onClick}
        component="li"
        className="list-style-none no-select"
        display="flex"
        sx={{
          position: "relative",
        }}
      >
        <Grid
          container
          sx={{
            "&:hover": {
              cursor: "pointer",
              background: "rgb(256,256,256, 0.05)",
            },
          }}
        >
          <Grid item xs={2}>
            <Cell>{item.type}</Cell>
          </Grid>
          <Grid item xs={2}>
            <Cell>{item.label}</Cell>
          </Grid>
          <Grid item xs={4}>
            <Cell>{item.description}</Cell>
          </Grid>
          <Grid item xs={1}>
            <Cell>{item.quantity}</Cell>
          </Grid>
          <Grid item xs={1}>
            <Cell>{item.vat} %</Cell>
          </Grid>
          <Grid item xs={1}>
            <Cell>{formatPrice(item.no_vat_price)} €</Cell>
          </Grid>
          <Grid item xs={1}>
            <Cell>
              {formatPrice(
                item.no_vat_price * item.quantity * (1 + item.vat / 100)
              )}{" "}
              €
            </Cell>
          </Grid>
        </Grid>
      </Box>
    )
  })
  const SortableList = SortableContainer(({ items }) => (
    <Stack
      minWidth="1000px"
      overflow="hidden"
      borderRadius="10px"
      border={`1px solid ${theme.palette.secondary.main}`}
    >
      <Box className="no-padding full-width">
        <Grid container>
          <Grid item xs={2}>
            <HeadCell>type</HeadCell>
          </Grid>
          <Grid item xs={2}>
            <HeadCell>label</HeadCell>
          </Grid>
          <Grid item xs={4}>
            <HeadCell>description</HeadCell>
          </Grid>
          <Grid item xs={1}>
            <HeadCell>Qté.</HeadCell>
          </Grid>
          <Grid item xs={1}>
            <HeadCell>TVA</HeadCell>
          </Grid>
          <Grid item xs={1}>
            <HeadCell>Prix unit.</HeadCell>
          </Grid>
          <Grid item xs={1}>
            <HeadCell>total</HeadCell>
          </Grid>
        </Grid>
      </Box>

      <Box
        component="ul"
        className="list-style-none no-padding full-width"
        margin={0}
      >
        {items.map((item, index) => (
          <SortableRow
            axis="xy"
            key={index}
            index={index}
            item={item}
            onClick={() => handleEdit(item, index)}
          />
        ))}
      </Box>
    </Stack>
  ))

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
        <CustomForm gap={2}>
          {/********** TOOLBAR **********/}
          <Toolbar />

          {/* READ ONLY MODE */}
          {(!EDIT_STATUSES.includes(order.status) || readOnly) && (
            <>
              <FullWidthTabs
                tabs={TABS}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {activeTab === 0 && (
                <>
                  <AlertInfo
                    content={{
                      show: !!order.client && !order.items?.length,
                      title: "Commande non visible par votre client",
                      js: (
                        <Stack gap={2}>
                          Vous devez ajouter des items à votre commande pour que
                          votre client puisse accéder à cette dernière.
                          <PillButton onClick={() => setReadOnly(false)}>
                            Modifier la commande
                          </PillButton>
                        </Stack>
                      ),
                      severity: "warning",
                    }}
                  />
                  <OrderReadOnlySection
                    items={items}
                    order={order}
                    hideModalities
                  />
                </>
              )}
              {activeTab === 1 && (
                <OrderReadOnlySection items={items} order={order} hideDetails />
              )}
              {activeTab === 2 && (
                <ClientSection
                  order={order}
                  handleOpenAssign={() => handleOpenModal(MODALS.ASSIGN)}
                />
              )}
              {activeTab === 3 && (
                <PaymentSection
                  handleGenerate={handleGeneratePaymentLink}
                  order={order}
                  handleOpenTag={() => handleOpenModal(MODALS.TAG)}
                />
              )}
              {activeTab === 4 && (
                <DocumentsSection
                  order={order}
                  handleGenerate={handleGenerate}
                  handleSend={handleSend}
                  isQuotationGenerating={isQuotationGenerating}
                  refreshData={fetchOrder}
                  loading={loading}
                />
              )}
              {activeTab === 5 && <LogsSection orderId={order.id} />}
            </>
          )}

          {/* EDIT MODE */}
          {!readOnly && EDIT_STATUSES.includes(order.status) && (
            <>
              {/********** ACTIVITY TYPE **********/}
              <Stack
                sx={{
                  padding: "2rem 1rem",
                  maxWidth: "900px",
                  gap: 4,
                  alignItems: "center",
                }}
              >
                <Typography variant="h4" color="secondary">
                  Quel est le type de prestation ?
                </Typography>
                <Stack className="row" gap={2}>
                  <ActivityTypeCard
                    label="Vidéo"
                    selected={order.activity_type === ACTIVITY_TYPES.video}
                    onClick={() =>
                      handleChangeActivityType(ACTIVITY_TYPES.video)
                    }
                  />
                  <ActivityTypeCard
                    label="Web"
                    selected={order.activity_type === ACTIVITY_TYPES.web}
                    onClick={() => handleChangeActivityType(ACTIVITY_TYPES.web)}
                  />
                </Stack>
              </Stack>

              {/********** CONDITIONS & MENTIONS **********/}
              <Stack
                sx={{
                  padding: "2rem 1rem",
                  gap: 8,
                  maxWidth: "900px",
                }}
              >
                <FormCard
                  title="Prestation"
                  step={1}
                  totalSteps={5}
                  icon={<WorkHistoryIcon />}
                >
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

                <FormCard
                  title="Livraison"
                  step={2}
                  totalSteps={5}
                  icon={<LocalShippingIcon />}
                >
                  <CustomDatePicker
                    disablePast
                    label="Date de livraison estimée"
                    value={order.delivery_date}
                    handleChange={handleChangeDate("delivery_date")}
                    error={errors.delivery_date}
                  />
                </FormCard>

                <FormCard
                  title="Paiement"
                  step={3}
                  totalSteps={5}
                  icon={<EuroIcon />}
                >
                  <TogglePaymentMode />
                  {paymentMode === PAYMENT_MODES.TWICE ? (
                    <Stack
                      spacing={2}
                      direction="row"
                      sx={{ mb: 1 }}
                      alignItems="center"
                    >
                      <Typography color="secondary">
                        Acompte ({order.payment_fractions[0]}%)
                      </Typography>
                      <Slider
                        color="secondary"
                        aria-label="Temperature"
                        value={order.payment_fractions[0] || 60}
                        valueLabelDisplay="auto"
                        onChange={(e, newValue) =>
                          setOrder({
                            ...order,
                            payment_fractions: [newValue, 100 - newValue],
                          })
                        }
                        step={5}
                        marks
                        min={0}
                        max={100}
                      />
                      <Typography color="secondary">
                        Solde ({100 - order.payment_fractions[0]}%)
                      </Typography>
                    </Stack>
                  ) : null}

                  {paymentMode === PAYMENT_MODES.MULTIPLE ? (
                    <Stack spacing={2}>
                      {order.payment_fractions.reduce(
                        (partialSum, a) => partialSum + parseInt(a),
                        0
                      ) !== 100 && (
                        <AlertInfo
                          content={{
                            show: true,
                            severity: "error",
                            title: "Pourcentages incorrects",
                            text: `Veuillez vérifier le total des pourcentages des échéances de paiements. Le total doit être égal à 100%. Le total est actuellement de ${order.payment_fractions.reduce(
                              (partialSum, a) => partialSum + parseInt(a),
                              0
                            )}%.`,
                          }}
                        />
                      )}
                      <PillButton
                        onClick={() => {
                          const localFractions = order.payment_fractions
                          localFractions.push(0)
                          setOrder({
                            ...order,
                            payment_fractions: localFractions,
                          })
                        }}
                      >
                        <AddIcon />
                      </PillButton>
                      <Stack>
                        {order.payment_fractions.map((fraction, key) => (
                          <Stack
                            flexDirection="row"
                            alignItems="center"
                            gap={1}
                            padding=".5rem 1.5rem"
                            justifyContent="space-between"
                            sx={{
                              background: key % 2 === 0 ? "rgb(0,0,0,0.2)" : "",
                            }}
                          >
                            <BodyText
                              preventTransition
                              fontSize="1rem"
                              color="grey"
                            >
                              {key === 0
                                ? "Acompte"
                                : key === order.payment_fractions.length - 1
                                ? "Solde"
                                : `Échéance ${key + 1}/${
                                    order.payment_fractions.length
                                  }`}
                            </BodyText>
                            <Stack
                              flexDirection="row"
                              alignItems="center"
                              gap={2}
                            >
                              <Stack flexDirection="row" gap={1}>
                                <IndeterminateCheckBoxIcon
                                  color="secondary"
                                  sx={{
                                    fontSize: "2.5rem",
                                    cursor: "pointer",
                                    "&:hover": {
                                      opacity: 0.5,
                                    },
                                  }}
                                  onClick={(e) => {
                                    const payment_fractions =
                                      order.payment_fractions
                                    if (Number(payment_fractions[key]) <= 0)
                                      return
                                    payment_fractions[key] =
                                      Number(payment_fractions[key]) - 10
                                    setOrder({ ...order, payment_fractions })
                                  }}
                                />
                                <CustomOutlinedInput
                                  type="phone"
                                  sx={{ width: "70px" }}
                                  InputProps={{
                                    disableUnderline: true,
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        %
                                      </InputAdornment>
                                    ),
                                  }}
                                  value={fraction}
                                  onChange={(e) => {
                                    const payment_fractions =
                                      order.payment_fractions
                                    payment_fractions[key] = Number(
                                      e.target.value
                                    )
                                    setOrder({ ...order, payment_fractions })
                                  }}
                                />
                                <AddBoxIcon
                                  color="secondary"
                                  sx={{
                                    fontSize: "2.5rem",
                                    cursor: "pointer",
                                    "&:hover": {
                                      opacity: 0.5,
                                    },
                                  }}
                                  onClick={(e) => {
                                    const payment_fractions =
                                      order.payment_fractions
                                    if (Number(payment_fractions[key] >= 100))
                                      return
                                    payment_fractions[key] =
                                      Number(payment_fractions[key]) + 10
                                    setOrder({ ...order, payment_fractions })
                                  }}
                                />
                              </Stack>
                              <DeleteIcon
                                color="secondary"
                                sx={{
                                  "&:hover": { opacity: 0.5 },
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  const payment_fractions =
                                    order.payment_fractions
                                  payment_fractions.splice(key, 1)
                                  setOrder({ ...order, payment_fractions })
                                }}
                              />
                            </Stack>
                          </Stack>
                        ))}
                      </Stack>
                    </Stack>
                  ) : null}

                  {fractionSum !== 100 && (
                    <AlertInfo
                      content={{
                        severity: "error",
                        title: `Somme de ${fractionSum}%`,
                        text: `La somme des échéances doit être égale à 100%. Elle est actuellement de ${fractionSum}%.`,
                      }}
                    />
                  )}

                  <CustomFilledInput
                    label="Conditions de règlement"
                    placeholder="Acompte de 60% lors de la signature du devis. Solde de 40% entre le jour de la prestation et la livraison."
                    value={order.payment_conditions}
                    onChange={handleChange("payment_conditions")}
                    helperText={
                      <ul style={{ padding: ".25rem 1rem", color: "grey" }}>
                        <Li
                          attribute="payment_conditions"
                          text="Paiement en une fois à la signature du devis."
                        />
                        <Li
                          attribute="payment_conditions"
                          text="
                          Acompte de 60% lors de la signature du devis. Solde de
                          40% entre le jour de la prestation et la livraison."
                        />
                        <Li
                          attribute="payment_conditions"
                          text="
                          Acompte de 40% lors de la signature du devis. Échéance
                          de 30% le jour de la prestation. Solde de 30% entre le
                          jour de la prestation et la livraison."
                        />
                      </ul>
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

                    <Stack flexDirection="row" gap={1}>
                      {PAYMENT_OPTIONS.map((opt) => (
                        <Stack
                          sx={{
                            padding: ".5rem 1rem",
                            borderRadius: "10px",
                            background: (theme) =>
                              order.payment_options[opt.id]
                                ? theme.palette.background.secondary
                                : theme.palette.background.main,
                            cursor: "pointer",
                            "&:hover": {
                              background: (theme) =>
                                theme.palette.text.secondary,
                              opacity: 0.7,
                            },
                          }}
                          onClick={() => {
                            let value = true
                            if (order.payment_options[opt.id]) value = false

                            setOrder({
                              ...order,
                              payment_options: {
                                ...order.payment_options,
                                [opt.id]: value,
                              },
                            })
                          }}
                        >
                          <BodyText
                            color={(theme) =>
                              order.payment_options[opt.id]
                                ? theme.palette.text.primary
                                : "#fff"
                            }
                          >
                            {opt.label}
                          </BodyText>
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                  <CustomFilledTextArea
                    id="payment_delay_penalties"
                    label="Pénalités de retard ou pour non paiement"
                    value={order.payment_delay_penalties}
                    onChange={handleChange("payment_delay_penalties")}
                    error={errors.payment_delay_penalties}
                    helperText={
                      <ul style={{ padding: ".25rem 1rem", color: "grey" }}>
                        <Li
                          attribute="payment_delay_penalties"
                          text="Une indemnité forfaitaire de 40€, à laquelle s'ajoute un taux d'Intérêt de retard de 15%. Calcul des intérêts de retard : Somme due TTC * jours de retard * taux d’intérêt / (365 * 100). Les jours de retard sont calculés à partir de la date de réception de la facture."
                        />
                      </ul>
                    }
                  />
                </FormCard>

                <FormCard
                  title="TVA"
                  step={4}
                  totalSteps={5}
                  icon={<PercentIcon />}
                >
                  <SwitchButton
                    checked={order.no_vat}
                    handleCheck={handleVAT}
                    label="TVA non applicable, article 293B du Code Général des Impôts (CGI)"
                  />
                </FormCard>
              </Stack>

              {/********** ITEMS TABLE WITH PRICES / QTY. **********/}
              <SmallTitle
                color={(theme) => theme.palette.secondary.main}
                alignItems="center"
                gap={2}
                display="flex"
                mt={2}
              >
                <SellIcon />
                Détails des produits / services <Span color="#fff">(5/5)</Span>
              </SmallTitle>

              <CustomFilledTextArea
                label="Objet de la commande"
                value={order.description}
                onChange={(e) =>
                  setOrder({ ...order, description: e.target.value })
                }
              />

              <Stack gap={2} width="100%" overflow="auto">
                <SortableList
                  component="ul"
                  className="list-style-none no-padding full-width flex-wrap"
                  gap=".5rem"
                  axis="xy"
                  items={items}
                  pressDelay={100}
                  onSortStart={() => {
                    document.body.style.cursor = "grabbing"
                  }}
                  onSortEnd={onSortEnd}
                />
              </Stack>

              {/********** NEW LINE BUTTON **********/}
              <Stack className="flex-center" width="100%">
                <SubmitButton
                  background={(theme) => theme.palette.background.secondary}
                  onClick={() => handleOpenModal(MODALS.CREATE_ITEM)}
                >
                  Nouvelle ligne
                  <AddIcon />
                </SubmitButton>
              </Stack>

              {/********** TOTAL PRICES **********/}
              <Stack alignSelf="center" mt={4}>
                <PriceDetails order={order} items={items} />
              </Stack>
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
            items={items}
            setItems={setItems}
            itemIndex={selectedItemIndex}
            incomingItem={selectedItem}
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
              Vous retrouverez la commande dans votre Dashboard dans l'onglet
              "Commandes".
            </BodyText>
            <CustomForm gap={4}>
              <CustomFilledInput
                value={order.label}
                onChange={handleChange("label")}
                label="Nom de la commande"
              />
              <Stack
                className="row"
                gap={2}
                alignSelf="end"
                alignItems="center"
              >
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
                  show: true,
                  js: (
                    <span>
                      Vous avez déjà envoyé le devis à :
                      <ul>
                        {selectedQuotation.recipient_emails.map(
                          (email, key) => (
                            <>
                              <Box
                                key={key}
                                component="li"
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
                            </>
                          )
                        )}
                      </ul>
                    </span>
                  ),
                }}
              />
            )}
            <CustomForm gap={4}>
              {!!selectedQuotation?.client?.email && (
                <>
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
                  <BodyText>ou</BodyText>
                </>
              )}

              <CustomFilledInput
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                label="Destinataire (e-mail)"
                error={emailError}
                helperText={emailError && "Adresse e-mail invalide"}
              />
              <Stack className="row" gap={2}>
                <CancelButton handleCancel={handleCloseModal} />
                <PillButton
                  type="submit"
                  onClick={() => handleSend(selectedQuotation.id)}
                >
                  Envoyer
                </PillButton>
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
              <QuotationClientFieldsForm
                orderId={order.id}
                handleFinish={async () => {
                  handleCloseModal()
                  fetchOrder()
                }}
                isAdmin
              />
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
                  <PillButton onClick={handleAssign}>Assigner</PillButton>
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
              <Stack className="row" gap={2} alignItems="center">
                <CancelTextButton handleCancel={handleCloseModal} />
                <PillButton onClick={generatePaymentLink}>Envoyer</PillButton>
              </Stack>
            </CustomForm>
          </>
        )}

        {/* TAG AS PAID */}
        {modal === MODALS.TAG && (
          <>
            <ModalTitle alignItems="center" display="flex" gap={1}>
              <DoneIcon /> Marquer le prochain paiement comme réglé
            </ModalTitle>
            <BodyText preventTransition fontSize="1rem">
              Quel a été le moyen de paiement utilisé ?
            </BodyText>

            <CustomForm gap={4}>
              <CustomRadio
                options={PAYMENT_OPTIONS}
                setValue={setPaymentMethod}
              />

              <Stack
                className="row"
                gap={2}
                alignSelf="end"
                alignItems="center"
              >
                <CancelTextButton handleCancel={handleCloseModal} />
                <PillButton onClick={handleTag} disabled={processing}>
                  {processing ? "Patientez..." : "Marquer comme payé"}
                </PillButton>
              </Stack>
            </CustomForm>
          </>
        )}
      </CustomModal>
    </>
  )
}

function LogsSection({ orderId }) {
  const [logs, setLogs] = useState([])
  const user = useContext(UserContext)

  async function fetchLogs() {
    const res = await apiCall.orders.getLogs({ id: orderId })
    if (res?.ok) {
      const jsonRes = await res.json()
      setLogs(jsonRes)
    }
  }
  function getIcon({ severity }) {
    return (
      <TimelineDot
        sx={{ background: (theme) => theme.alert.title[severity].background }}
      >
        <CheckCircleIcon
          sx={{ color: (theme) => theme.alert.title[severity].color }}
        />
      </TimelineDot>
    )
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  return (
    <Stack width="100%" gap={2}>
      <FormCard>
        <Stack gap={2}>
          <DocumentHeader>
            <DocumentType>Historique</DocumentType>
          </DocumentHeader>

          <Timeline
            sx={{
              "&.MuiTimeline-root": {
                padding: "0",
              },
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
          >
            {logs.map((log, key) => (
              <TimelineItem key={key}>
                <TimelineSeparator sx={{ margin: "1.25rem 0 0" }}>
                  {getIcon({ severity: log.severity })}
                  <TimelineConnector />
                </TimelineSeparator>

                <TimelineContent sx={{ py: "12px", px: 2 }}>
                  <Typography color="grey" fontSize="0.8rem">
                    {formatDayDate({
                      timestamp: log.created_at,
                      timezone: user.timezone,
                    })}
                  </Typography>

                  <Typography
                    variant="h6"
                    component="span"
                    sx={{
                      color: (theme) => theme.alert.title[log.severity].color,
                    }}
                  >
                    {LOG_CONTENT[log?.metadata?.event]?.label}
                  </Typography>

                  <Typography color="grey" my={1}>
                    {LOG_CONTENT[log?.metadata?.event]?.description(
                      log.metadata
                    )}
                  </Typography>

                  <CustomAccordion title="Metadata">
                    <Stack overflow="auto" width="100%">
                      <ReactJson
                        indentWidth={1.5}
                        displayDataTypes={false}
                        src={log?.metadata}
                        theme="pop"
                        enableClipboard={false}
                        style={{
                          zIndex: 0,
                          padding: "1rem .5rem",
                          borderRadius: "10px",
                          fontSize: "0.8rem",
                          cursor: "text",
                          wordBreak: "break-all",
                        }}
                      />
                    </Stack>
                  </CustomAccordion>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Stack>
      </FormCard>
    </Stack>
  )
}

export default withConfirmAction(OrderForm)
