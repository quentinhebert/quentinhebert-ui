import { Grid, Stack } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import { useRouter } from "next/router"
import { UserContext } from "../../../contexts/UserContext"
import {
  convertToShortString,
  getLocaleDateTime,
} from "../../../services/date-time"
import { ORDERSTATES } from "../../../enums/orderStates"
import PillButton from "../../Buttons/pill-button"
import PleaseWait from "../../Helpers/please-wait"
import BodyText from "../../Text/body-text"
import Pill from "../../Text/pill"
import RefreshButton from "../../Buttons/refresh-button"

const StatusChip = ({ order }) => (
  <Pill
    bgColor={(theme) =>
      theme.alert.title[ORDERSTATES[order.status].severity].color
    }
  >
    <BodyText fontSize="1rem" color="#000">
      {ORDERSTATES[order.status].label}
    </BodyText>
  </Pill>
)

const GridItem = ({ ...props }) => (
  <Grid item md={2.4} {...props} paddingLeft="2rem" />
)

const GridHead = () => {
  const headItems = ["Status", "Description", "Date", "Montant", ""]
  return (
    <Grid
      container
      sx={{
        flexDirection: { xs: "column", sm: "row" },
        background: (theme) => theme.palette.background.main,
        borderRadius: "60px",
        padding: 2,
        justifyContent: "space-between",
      }}
    >
      {headItems.map((label, key) => (
        <GridItem paddingLeft={key === 0 ? "1rem" : 0}>
          <BodyText fontSize="1rem" color={(theme) => theme.palette.text.grey}>
            {label}
          </BodyText>
        </GridItem>
      ))}
    </Grid>
  )
}

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

  const router = useRouter()

  return (
    <Stack gap={4}>
      <Stack className="row full-width">
        <Stack flexGrow={1} />
        <RefreshButton refresh={fetchOrders} />
      </Stack>

      {loading && <PleaseWait />}

      {orders.length < 1 && !loading && (
        <BodyText>Pas de commande pour le moment</BodyText>
      )}
      <Stack sx={{ gap: { xs: 10, sm: 2 } }}>
        <GridHead />
        {!loading &&
          orders.map((order, key) => (
            <Grid
              container
              key={key}
              sx={{
                flexDirection: { xs: "column", sm: "row" },
                border: (theme) => `1px solid ${theme.palette.secondary.main}`,
                background: (theme) => theme.palette.background.main,
                borderRadius: "60px",
                padding: 2,
                alignItems: "center",
              }}
            >
              <GridItem sx={{ paddingLeft: 0 }}>
                <StatusChip order={order} />
              </GridItem>
              <GridItem>
                <BodyText
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {order.label && order.label !== ""
                    ? order.label
                    : "Pas de description"}
                </BodyText>
              </GridItem>
              <GridItem>
                <BodyText>
                  {
                    convertToShortString(
                      getLocaleDateTime(order.created_at)
                    ).split(" ")[0]
                  }
                </BodyText>
              </GridItem>
              <GridItem>
                <BodyText>{order.total_price / 100}€</BodyText>
              </GridItem>
              <GridItem textAlign="right">
                <Stack className="full-height">
                  <PillButton
                    onClick={() => router.push(`/account/orders/${order.id}`)}
                  >
                    + d'infos
                  </PillButton>
                </Stack>
              </GridItem>
            </Grid>
          ))}
      </Stack>
    </Stack>
  )
}
