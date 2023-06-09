import { Box, Grid, Stack, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../contexts/UserContext"
import apiCall from "../../../services/apiCalls/apiCall"
import PillButton from "../../Buttons/pill-button"
import PleaseWait from "../../Helpers/please-wait"
import BodyText from "../../Text/body-text"
import AddIcon from "@mui/icons-material/Add"
import { useRouter } from "next/router"
import OrderCard from "../../Cards/orders/order-card"
import ModesToggle from "../../Navigation/modes-toggle"
import { MODES_ENUM } from "../../../enums/modesEnum"
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined"
import CustomPillSelect from "../../Inputs/custom-pill-select"
import CustomSelectOption from "../../Inputs/custom-select-option"
import { ORDERSTATES } from "../../../enums/orderStates"

const allStatuses = []
Object.keys(ORDERSTATES).map((key) => allStatuses.push(key))
const inProgressStatuses = [
  "WAITING_FOR_PAYMENT",
  "PARTIALLY_PAID",
  "DEPOSIT_PAID",
  "PAYMENT_SUCCEEDED",
]

const STATUS_OPTIONS = [
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
  { id: "FINISHED", statuses: ["FINISHED"], label: "terminées" },
  { id: "CANCELED", statuses: ["CANCELED"], label: "annulées" },
  { id: "ARCHIVED", statuses: ["ARCHIVED"], label: "archivées" },
]

export default function Orders_Main({}) {
  /******* USE-STATES *******/
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState(orders) // Default filter === show all orders
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState(MODES_ENUM.LIST)
  const [selectedStatus, setSelectedStatus] = useState(STATUS_OPTIONS[0].id)

  const router = useRouter()
  const { user } = useContext(UserContext)

  /******* FETCH DATA *******/
  const fetchOrders = async () => {
    setLoading(true)
    const res = await apiCall.orders.getAll()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setOrders(jsonRes) // Populate orders
      setFilteredOrders(jsonRes) // Populate filtered orders
    }
    setLoading(false)
  }

  /******* INITIAL FETCH *******/
  useEffect(() => {
    fetchOrders()
  }, [])

  const handleNew = () => router.push("/dashboard/orders/create")
  const handleChangeStatus = (e) => setSelectedStatus(e.target.value)

  useEffect(() => {
    const localOrders = orders
    const localFilteredOrders = localOrders.filter((elt) =>
      STATUS_OPTIONS.filter(
        (opt) => opt.id === selectedStatus
      )[0].statuses.includes(elt.status)
    )
    setFilteredOrders(localFilteredOrders)
  }, [selectedStatus])

  return (
    <Stack
      gap={4}
      sx={{
        background: (theme) => theme.palette.background.main,
        borderRadius: "30px",
      }}
      padding={{ xs: "2rem 1rem", md: "2rem" }}
    >
      <BodyText
        className="inline-flex gap-10"
        alignItems="center"
        fontSize="1.5rem"
        lineHeight="2rem"
        textAlign="center"
        preventTransition
      >
        <WorkOutlineOutlinedIcon sx={{ fontSize: "2rem" }} /> Commandes
        <CustomPillSelect
          required
          value={selectedStatus}
          onChange={handleChangeStatus}
        >
          {STATUS_OPTIONS.map((option, key) => (
            <CustomSelectOption value={option.id} key={key}>
              <Box
                component="span"
                sx={{
                  "&:first-letter": {
                    textTransform: "capitalize",
                  },
                }}
              >
                {option.label}
              </Box>
            </CustomSelectOption>
          ))}
        </CustomPillSelect>
      </BodyText>

      <Stack
        className="row"
        alignItems="center"
        justifyContent={{ xs: "center", md: "space-between" }}
        width="100%"
      >
        <Stack display={{ xs: "none", md: "flex" }}>
          <ModesToggle mode={mode} setMode={setMode} />
        </Stack>
        <PillButton startIcon={<AddIcon />} onClick={handleNew}>
          Nouvelle commande
        </PillButton>
      </Stack>

      {loading ? (
        <PleaseWait />
      ) : (
        <Grid container spacing={1}>
          {filteredOrders.map((order, key) => (
            <Grid
              key={key}
              item
              xs={12}
              sm={mode === MODES_ENUM.LIST ? 12 : 6}
              md={mode === MODES_ENUM.LIST ? 12 : 4}
            >
              <OrderCard
                order={order}
                timezone={user.timezone}
                refreshData={fetchOrders}
                mode={mode}
                onClick={() =>
                  router.push(`/dashboard/orders/${order.id}/edit`)
                }
                optionsList={["delete"]}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  )
}
