import { Grid, Stack } from "@mui/material"
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

export default function Orders_Main({}) {
  /******* USE-STATES *******/
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState(MODES_ENUM.LIST)

  const router = useRouter()
  const { user } = useContext(UserContext)

  /******* FETCH DATA *******/
  const fetchOrders = async () => {
    setLoading(true)
    const res = await apiCall.orders.getAll()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setOrders(jsonRes)
    }
    setLoading(false)
  }

  /******* INITIAL FETCH *******/
  useEffect(() => {
    fetchOrders()
  }, [])

  const handleNewQuotation = () => router.push("/dashboard/quotations/create")

  return (
    <Stack
      gap={4}
      sx={{
        background: (theme) => theme.palette.background.main,
        borderRadius: "30px",
      }}
      padding="2rem"
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
      </BodyText>

      <Stack className="row" alignItems="center" width="100%">
        <ModesToggle mode={mode} setMode={setMode} />
        <PillButton startIcon={<AddIcon />} onClick={handleNewQuotation}>
          Nouvelle commande
        </PillButton>
      </Stack>

      {loading ? (
        <PleaseWait />
      ) : (
        <Grid container spacing={1}>
          {orders.map((order, key) => (
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
                  router.push(`/dashboard/quotations/${order.id}/edit`)
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
