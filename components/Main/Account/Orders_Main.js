import { Stack } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import { UserContext } from "../../../contexts/UserContext"
import {
  convertToShortString,
  getLocaleDateTime,
} from "../../../services/date-time"
import { ORDERSTATES } from "../../../enums/orderStates"
import BodyText from "../../Text/body-text"
import Pill from "../../Text/pill"
import RefreshButton from "../../Buttons/refresh-button"
import Link from "next/link"

const StatusChip = ({ order, display }) => (
  <Pill
    bgColor={(theme) =>
      theme.alert.title[ORDERSTATES[order.status].severity].background
    }
    border={(theme) =>
      `1px solid ${theme.alert.title[ORDERSTATES[order.status].severity].color}`
    }
    padding="0 .75rem"
    lineHeight={2}
    display={display}
  >
    <BodyText
      fontSize=".9rem"
      color={(theme) =>
        theme.alert.title[ORDERSTATES[order.status].severity].color
      }
    >
      {ORDERSTATES[order.status].label}
    </BodyText>
  </Pill>
)
const OrdersCards = ({ orders }) => (
  <Stack gap={2}>
    {!!orders?.length &&
      orders.map((order, key) => (
        <Link key={key} href={`/account/orders/${order.id}`} passHref>
          <Stack
            sx={{
              background: (theme) => theme.palette.background.main,
              borderRadius: "30px",
              padding: 2,
              gap: 2,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              "&:hover": {
                background: "rgb(256,256,256,0.1)",
              },
            }}
          >
            <Stack
              className="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Stack marginRight="1.5rem" gap={1}>
                <BodyText fontSize="1rem" color="grey">
                  {
                    convertToShortString(
                      getLocaleDateTime(order.created_at)
                    ).split(" ")[0]
                  }
                </BodyText>
                <BodyText
                  fontSize="1rem"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: { xs: 2, md: 1 },
                    WebkitBoxOrient: "vertical",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {order.label}
                </BodyText>
                <StatusChip
                  order={order}
                  display={{ xs: "inline-flex", md: "none" }}
                />
              </Stack>
              <StatusChip
                order={order}
                display={{ xs: "none", md: "inline-flex" }}
              />
            </Stack>

            <Stack
              sx={{
                borderLeft: "3px dotted grey",
                padding: "1.5rem 1rem",
                minWidth: "110px",
              }}
            >
              <BodyText
                fontSize="1.5rem"
                textAlign="right"
                sx={{ whiteSpace: "nowrap" }}
              >
                {order.total_price / 100} €
              </BodyText>
            </Stack>
          </Stack>
        </Link>
      ))}
  </Stack>
)

export default function Orders_Main() {
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

  return (
    <Stack gap={2}>
      <Stack className="row full-width">
        <Stack flexGrow={1} />
        <RefreshButton refresh={fetchOrders} loading={loading} />
      </Stack>

      {orders.length < 1 && !loading && (
        <BodyText>Pas de commande pour le moment</BodyText>
      )}

      <OrdersCards orders={orders} loading={loading} />
    </Stack>
  )
}
