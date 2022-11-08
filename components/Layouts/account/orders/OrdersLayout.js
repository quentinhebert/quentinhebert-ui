import { Stack } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import apiCall from "../../../../services/apiCalls/apiCall"
import AccountPagesLayout from "../../AccountPagesLayout"
import { useRouter } from "next/router"
import { UserContext } from "../../../../contexts/UserContext"
import {
  convertToShortString,
  getLocaleDateTime,
} from "../../../../services/date-time"
import { ORDERSTATES } from "../../../../enums/orderStates"
import PillButton from "../../../Buttons/pill-button"
import PleaseWait from "../../../Helpers/please-wait"
import BodyText from "../../../text/body-text"
import Pill from "../../../Text/pill"
import RefreshButton from "../../../Buttons/refresh-button"

const StatusChip = ({ order }) => (
  <Stack marginBottom={4}>
    <Pill
      bgColor={(theme) => theme.alert.title[ORDERSTATES[order.state].severity]}
    >
      <BodyText color="#000">{ORDERSTATES[order.state].label}</BodyText>
    </Pill>
  </Stack>
)

export default function OrdersLayout() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useContext(UserContext)

  const fetchOrders = async () => {
    setLoading(true)
    if (!user?.id) return
    const res = await apiCall.orders.getAllByClient({ id: user.id })
    if (res && res.ok) {
      const jsonRes = await res.json()
      setOrders(jsonRes)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const router = useRouter()

  return (
    <AccountPagesLayout title="Mes commandes">
      <Stack gap={4}>
        <Stack className="row full-width">
          <Stack flexGrow={1} />
          <RefreshButton refresh={fetchOrders} />
        </Stack>

        {loading && <PleaseWait />}

        {orders.length < 1 && !loading && (
          <BodyText>Pas de commande pour le moment</BodyText>
        )}
        <Stack sx={{ gap: { xs: 10, sm: 4 } }}>
          {!loading &&
            orders.map((order, key) => (
              <Stack
                className="full-height flex-center"
                key={key}
                gap={4}
                sx={{ flexDirection: { xs: "column", sm: "row" } }}
              >
                <Stack
                  sx={{
                    flexGrow: 1,
                    border: (theme) =>
                      `1px solid ${theme.palette.secondary.main}`,
                    borderRadius: "30px",
                    padding: 2,
                  }}
                >
                  <StatusChip order={order} />
                  <BodyText>N° de commande: {order.id}</BodyText>
                  <BodyText>
                    Date:{" "}
                    {convertToShortString(
                      getLocaleDateTime(order.created_at, user.timezone)
                    )}
                  </BodyText>
                  <BodyText>{order.total_price / 100}€</BodyText>
                </Stack>
                <Stack className="full-height">
                  <PillButton
                    onClick={() => router.push(`/account/orders/${order.id}`)}
                  >
                    + d'infos
                  </PillButton>
                </Stack>
              </Stack>
            ))}
        </Stack>
      </Stack>
    </AccountPagesLayout>
  )
}
