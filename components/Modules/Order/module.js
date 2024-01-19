import { createContext, useContext, useEffect, useState } from "react"
import { QUOTATION_STATUS } from "../../../enums/quotationStatus"
import { ACTIVITY_TYPES } from "../../../enums/activityTypesEnum"
import dynamic from "next/dynamic"
import { checkBeforeGen } from "../../../services/quotations"
import apiCall from "../../../services/apiCalls/apiCall"
import Modals from "./components/readonly/modals/modals"
import { AppContext } from "../../../contexts/AppContext"
import BodyText from "../../Text/body-text"
import { Box, Grid, Stack } from "@mui/material"
const OrderForm = dynamic(() => import("./edit"))
const OrderReadonly = dynamic(() => import("./readonly"))

export default function OrderModule({ id, defaultMode }) {
  // INITIAL STATES
  const initialOrder = {
    id,
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
  const initialState = {
    order: initialOrder,
    items: [],
    orderToUpdate: {},
    isFetching: false,
    mode: MODES[defaultMode] || MODES.READONLY,
    errors: {
      date: false,
      delivery_date: false,
      payment_conditions: false,
      payment_options: false,
    },
    modal: null,
    openModal: false,
    activeTab: 0,
  }
  // MODULE STATE
  const [state, setState] = useState(initialState)
  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  // INITIAL FETCH
  useEffect(() => {
    fetchOrder()
  }, [])

  // RENDER
  return (
    <Context.Provider
      value={{
        state,
        setState,
        fetchOrder,
        handleDelete,
        checkMissingFields,
        handleOpenModal,
        handleCloseModal,
        handleSave,
        handleChange,
        handleSend,
      }}
    >
      {state.mode === MODES.EDIT && <OrderForm />}
      {state.mode === MODES.READONLY && <OrderReadonly />}

      <Modals />
    </Context.Provider>
  )

  // FUNCTIONS
  async function fetchOrder() {
    if (!id) return
    try {
      setState({ ...state, isFetching: true, openModal: false })
      const res = await apiCall.orders.get({ id })
      if (!res?.ok) throw Error("Fetching request has failed!")
      const jsonRes = await res.json()
      setState({
        ...state,
        items: jsonRes.items,
        order: jsonRes,
        isFetching: false,
        openModal: false,
      })
    } catch (err) {
      console.error(err.message)
      setState({ ...state, isFetching: false })
    }
  }
  async function handleDelete() {
    setOpenConfirmModal(true)
    setNextButtonText("Supprimer")
    setConfirmTitle("Supprimer la commande")
    setConfirmContent({
      text: `Voulez vous vraiment supprimer la commande ${order.label} ? Les devis et factures associés seront également supprimés.`,
    })
    setActionToFire(() => async () => {
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
    })
  }
  function checkMissingFields() {
    const errors = checkBeforeGen(state.order)
    setState({ ...state, errors })
    const errorsCount = Object.values(errors).filter(
      (elt) => elt === true
    ).length
    if (errorsCount !== 0 && !(errorsCount === 1 && errors.client))
      throw Error("missing_fields")
  }
  function handleOpenModal(modal) {
    setState({ ...state, openModal: true, modal })
  }
  function handleCloseModal() {
    setState({ ...state, openModal: false })
  }
  function handleChange(attribute) {
    return (e) =>
      setState({
        ...state,
        order: { ...state.order, [attribute]: e.target.value },
        orderToUpdate: { ...state.orderToUpdate, [attribute]: e.target.value },
      })
  }
  async function save({ noSnack }) {
    let res = null
    if (!state.order.id) {
      // If order is not created yet
      res = await apiCall.orders.create(state.order, state.items)
    } else {
      // If order is created and needs to be saved/updated
      res = await apiCall.orders.save({
        ...state.orderToUpdate,
        items: state.items,
        id: state.order.id,
      })
    }
    if (res && res.ok) {
      const jsonRes = await res.json()
      if (!noSnack) {
        setSnackSeverity("success")
        setSnackMessage("Commande sauvegardée")
      }
      handleCloseModal()
      // if no id provided === user is on CreateQuotationPage (not EditQuotationPage), we redirect the user onto the edit page (with the same quotationForm component)
      if (!id) return router.push(`/dashboard/orders/${jsonRes.id}/edit`)
      await fetchOrder()
      setState({
        ...state,
        mode: MODES.READONLY,
        orderToUpdate: {},
        openModal: false,
      })
      return true
    } else {
      setSnackSeverity("error")
      setSnackMessage("Une erreur est survenue...")
      return false
    }
  }
  async function handleSave() {
    if (!!state.orderToUpdate.label) return await save({ noSnack: false })
    handleOpenModal(MODALS.SAVE)
  }
  function missingFieldsSnack() {
    setSnackMessage(`Certains champs obligatoires sont manquants.`)
    setSnackSeverity("error")
  }
  async function sendQuotation(quotationId, email) {
    const res = await apiCall.quotations.send({
      id: quotationId,
      email: email || emailInput,
    })
    if (res && res.ok) {
      setSnackSeverity("success")
      setSnackMessage("Succès")
      fetchOrder()
    } else {
      setSnackSeverity("error")
      setSnackMessage("Erreur")
    }
  }
  async function handleSend(quotationId, email) {
    const localErrors = checkBeforeGen(order)
    setState({ ...state, errors: localErrors })
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
}

export const Context = createContext()
export const MODES = { EDIT: "EDIT", READONLY: "READONLY" }
export const MODALS = {
  SAVE: "SAVE",
  SEND: "SEND",
  ASSIGN: "ASSIGN",
  CREATE_ITEM: "CREATE_ITEM",
  EDIT_ITEM: "EDIT_ITEM",
  PAYMENT: "PAYMENT",
  TAG: "TAG",
}

// Global components for module
export function FormCard({
  title,
  width,
  icon,
  gap,
  step,
  totalSteps,
  ...props
}) {
  return (
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
}
export function DocumentHeader(props) {
  return (
    <Stack
      className="row"
      justifyContent="space-between"
      alignItems="center"
      padding={1.5}
      sx={{ background: "rgb(0,0,0, 0.5)", borderRadius: "10px" }}
      {...props}
    />
  )
}
export function DocumentType(props) {
  return (
    <BodyText preventTransition display="flex" alignItems="center" {...props} />
  )
}
export function ActionButton({ onClick, label, icon }) {
  return (
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
}
export function GridItem({ xs, md, textAlign, ...props }) {
  return (
    <Grid
      item
      xs={xs || 2.5}
      md={md || xs || 2.5}
      textAlign={textAlign || "left"}
    >
      <BodyText {...props} preventTransition fontSize="1rem" />
    </Grid>
  )
}
