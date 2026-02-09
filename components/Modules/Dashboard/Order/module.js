import { createContext, useContext, useEffect, useState } from "react"
import { QUOTATION_STATUS } from "../../../../enums/quotationStatus"
import { ACTIVITY_TYPES } from "../../../../enums/activityTypesEnum"
import dynamic from "next/dynamic"
import apiCall from "../../../../services/apiCalls/apiCall"
import Modals from "./components/readonly/modals/modals"
import { AppContext } from "../../../../contexts/AppContext"
import BodyText from "../../../Text/body-text"
import { Box, Button, Grid, Stack } from "@mui/material"
import SmallTitle from "../../../Titles/small-title"
import { checkBeforeGen } from "../../../../services/quotations"
import useConfirm from "../../../../hooks/useConfirm"
import { useRouter } from "next/router"
import CustomModal from "../../../Modals/custom-modal"
const OrderEdit = dynamic(() => import("./edit"))
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
    payment_fractions: [30, 70],
    activity_type: ACTIVITY_TYPES.video,
    variable_quote: false,
    variable_quote_elements: {
      price_conditions: "",
      price_estimation: "",
      price_validation: "",
    },
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
    selectedItem: {},
    selectedItemIndex: null,
    selectedQuotation: {},
  }
  // MODULE STATE
  const [state, setState] = useState(initialState)
  const router = useRouter()
  const Confirm = useConfirm()
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
      }}
    >
      {state.mode === MODES.READONLY ? (
        <OrderReadonly />
      ) : state.mode === MODES.EDIT ? (
        <OrderEdit />
      ) : null}

      <Modals />

      <CustomModal open={Confirm.open} handleClose={Confirm.handleClose}>
        <Confirm.DialogContent />
      </CustomModal>
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
        mode: MODES.READONLY,
      })
    } catch (err) {
      console.error(err.message)
      setState({ ...state, isFetching: false })
    }
  }
  async function handleDelete() {
    Confirm.setContent({
      title: "Supprimer la commande",
      nextBtnText: "Supprimer",
      cancelLabel: "Je souhaite encore modifier ma commande",
      message: (
        <BodyText>
          Voulez vous vraiment supprimer la commande {state.order.label} ? Les
          devis associés seront également supprimés. Les factures seront
          sauvegardées mais uniquement accessibles depuis l'hébergeur ou la DB.
        </BodyText>
      ),
      nextAction: async function () {
        setState({ ...state, isFetching: true })
        const res = await apiCall.orders.delete({ id: state.order.id })
        if (res && res.ok) {
          setSnackMessage("Devis supprimé")
          setSnackSeverity("success")
          router.push("/dashboard?active_tab=orders")
        } else {
          setSnackMessage("Un problème est survenu")
          setSnackSeverity("error")
        }
        setState({ ...state, isFetching: false })
      },
    })
    Confirm.setOpen(true)
  }
  function checkMissingFields() {
    const errors = checkBeforeGen(state.order)

    const errorsCount = Object.values(errors).filter(
      (elt) => elt === true,
    ).length
    if (errorsCount !== 0 && !(errorsCount === 1 && errors.client))
      return errors
    return null
  }
  function handleOpenModal(modal) {
    setState({ ...state, openModal: true, modal })
  }
  function handleCloseModal() {
    setState({ ...state, openModal: false })
  }
  // TODO: add, edit, delete order item => update a copy of items, and allow save or cancel
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
    if (!!state.order.label) return await save({ noSnack: false })
    handleOpenModal(MODALS.SAVE)
  }
}

// CONTEXT
export const Context = createContext()

// GLOBALS FOR MODULE
export const MODES = { EDIT: "EDIT", READONLY: "READONLY" }
export const MODALS = {
  SAVE: "SAVE",
  SEND: "SEND",
  ASSIGN: "ASSIGN",
  CREATE_ITEM: "CREATE_ITEM",
  EDIT_ITEM: "EDIT_ITEM",
  PAYMENT: "PAYMENT",
  TAG: "TAG",
  CLIENT_ADDRESS: "CLIENT_ADDRESS",
}
export const PAYMENT_MODES = {
  ONCE: "ONCE",
  TWICE: "TWICE",
  MULTIPLE: "MULTIPLE",
}
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
    <Stack
      className="flex pointer gap-10"
      onClick={onClick}
      sx={{
        flexDirection: "row",
        "&:hover": {
          color: (theme) => theme.palette.text.secondary,
        },
      }}
    >
      {icon}{" "}
      <Box component="span" sx={{ display: { xs: "none", lg: "block" } }}>
        {label}
      </Box>
    </Stack>
  )
}
export function GridItem({ xs, md, lg, textAlign, ...props }) {
  return (
    <Grid
      item
      xs={xs || 2}
      md={md || xs || 2}
      lg={lg || md || xs || 2}
      textAlign={textAlign || "left"}
    >
      <BodyText {...props} preventTransition fontSize="1rem" />
    </Grid>
  )
}
