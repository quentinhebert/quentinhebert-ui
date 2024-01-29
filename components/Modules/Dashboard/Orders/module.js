import { createContext, useContext, useEffect, useState } from "react"
import apiCall from "../../../../services/apiCalls/apiCall"
import { AppContext } from "../../../../contexts/AppContext"
import BodyText from "../../../Text/body-text"
import { Box, Grid, Stack } from "@mui/material"
import SmallTitle from "../../../Titles/small-title"
import OrdersSection from "./orders-section"
import { ORDERSTATES } from "../../../../enums/orderStates"
import { UserContext } from "../../../../contexts/UserContext"

export default function OrdersModule() {
  const { user } = useContext(UserContext)

  // INITIAL STATES
  const initialOrders = []
  const initialState = {
    orders: initialOrders,
    isFetching: false,
    modal: null,
    openModal: false,
    selectedItem: {},
    selectedItemIndex: null,
    tab: 2,
    timezone: user.timezone,
  }
  // MODULE STATE
  const [state, setState] = useState(initialState)
  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  // INITIAL FETCH
  useEffect(() => {
    fetchOrders()
  }, [])

  // RENDER
  return (
    <Context.Provider
      value={{
        state,
        setState,
        fetchOrders,
        handleDelete,
        handleOpenModal,
        handleCloseModal,
      }}
    >
      <OrdersSection />
    </Context.Provider>
  )

  // FUNCTIONS
  async function fetchOrders(options) {
    setState({ ...state, isFetching: true, openModal: false })
    const res = await apiCall.orders.getAll()
    if (!res?.ok) throw Error("Fetching request has failed!")
    const jsonRes = await res.json()
    const newState = {
      ...state,
      orders: jsonRes,
      filteredOrders: jsonRes,
      isFetching: false,
    }
    if (!!options?.tab) newState.tab = options?.tab
    setState(newState)
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
  function handleOpenModal(modal) {
    setState({ ...state, openModal: true, modal })
  }
  function handleCloseModal() {
    setState({ ...state, openModal: false })
  }
}

// CONTEXT
export const Context = createContext()

// GLOBALS FOR MODULE
const allStatuses = []
Object.keys(ORDERSTATES).map((key) => allStatuses.push(key))
export const inProgressStatuses = [
  "WAITING_FOR_PAYMENT",
  "PARTIALLY_PAID",
  "DEPOSIT_PAID",
  "PAYMENT_SUCCEEDED",
]
export const STATUS_OPTIONS = [
  {
    id: "ALL",
    statuses: allStatuses,
    label: "toutes",
  },
  { id: "DRAFT", statuses: ["DRAFT"], label: "brouillon" },
  {
    id: "IN_PROGRESS",
    statuses: inProgressStatuses,
    label: "en cours",
  },
  {
    id: "FINISHED",
    statuses: ["FINISHED", "PAYMENT_SUCCEEDED"],
    label: "terminées",
  },
  { id: "CANCELED", statuses: ["CANCELED"], label: "annulées" },
  { id: "ARCHIVED", statuses: ["ARCHIVED"], label: "archivées" },
]
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
