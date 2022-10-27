import { Box, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import apiCall from "../../../../services/apiCalls/apiCall"
import PillButton from "../../../ReusableComponents/buttons/pill-button"
import PleaseWait from "../../../ReusableComponents/helpers/please-wait"
import BodyText from "../../../ReusableComponents/text/body-text"
import AccountPagesLayout from "../../AccountPagesLayout"
import Custom404Layout from "../../error/Custom404Layout"
import { useRouter } from "next/router"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import RefreshButton from "../../../ReusableComponents/buttons/refresh-button"
import { ORDERSTATES } from "../../../../enums/orderStates"
import Pill from "../../../ReusableComponents/text/pill"

const allowedStatesForPaying = ["WAITING_FOR_PAYMENT", "PAYMENT_FAILED"]

const TotalPrice = ({ totalPrice }) => (
  <BodyText display="inline-flex">
    Prix TTC :<div style={{ marginLeft: ".5rem" }}>{totalPrice / 100}€</div>
  </BodyText>
)

const HeadItem = (props) => (
  <Box
    component="th"
    textAlign="left"
    sx={{
      border: (theme) => `2px solid ${theme.palette.secondary.main}`,
      padding: 2,
    }}
  >
    <BodyText color={(theme) => theme.palette.text.secondary} {...props} />
  </Box>
)

const Row = (props) => <Box component="tr" {...props} />

const Value = ({ data }) => (
  <Box
    component="td"
    sx={{
      border: (theme) => `2px solid ${theme.palette.secondary.main}`,
      padding: 2,
    }}
  >
    <BodyText>{data}</BodyText>
  </Box>
)

const StatusChip = ({ order }) => (
  <Pill
    bgColor={(theme) => theme.alert.title[ORDERSTATES[order.state].severity]}
  >
    <BodyText color="#000">{ORDERSTATES[order.state].label}</BodyText>
  </Pill>
)

export default function OrderInformationLayout({ orderId }) {
  const initialOrder = {
    id: null,
    created_at: null,
    state: null,
    client_id: null,
    total_price: null,
    items: [],
  }
  const [order, setOrder] = useState(initialOrder)
  const [loading, setLoading] = useState(false)

  const fetchOrder = async () => {
    setLoading(true)
    if (orderId) {
      const res = await apiCall.orders.get({ id: orderId })
      if (res && res.ok) {
        const jsonRes = await res.json()
        setOrder(jsonRes)
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchOrder()
  }, [])

  const router = useRouter()

  if (!order.id && !loading) return <Custom404Layout />

  return (
    <AccountPagesLayout
      title={order.id ? `Commande n° ${order.id}` : "Commande"}
    >
      {loading && <PleaseWait />}

      {order.id && !loading && (
        <Stack gap={4}>
          <Stack className="row gap-10" alignItems="center">
            <StatusChip order={order} />
            <BodyText>{ORDERSTATES[order.state].description}</BodyText>
            <Stack flexGrow={1} />
            <RefreshButton refresh={fetchOrder} />
          </Stack>

          <Stack gap={2}>
            <BodyText>Récapitulatif :</BodyText>
            <Box
              component="table"
              sx={{
                border: "1px solid #fff",
                borderCollapse: "collapse",
              }}
            >
              <HeadItem>Type</HeadItem>
              <HeadItem>Item</HeadItem>
              <HeadItem>Description</HeadItem>
              <HeadItem>Quantité</HeadItem>
              <HeadItem>TVA</HeadItem>
              <HeadItem>Prix HT</HeadItem>
              {order.items.map((item, key) => (
                <Row key={key}>
                  <Value data={item.item_type.type} />
                  <Value data={item.label} />
                  <Value data={item.description} />
                  <Value data={item.quantity} />
                  <Value data={`${item.item_type.percent}%`} />
                  <Value data={`${item.no_vat_price / 100}€`} />
                </Row>
              ))}
            </Box>

            <Stack width="100%" alignItems="end">
              <Stack direction="row" alignItems="center" gap={5}>
                <TotalPrice totalPrice={order.total_price} />
                {allowedStatesForPaying.includes(order.state) && (
                  <PillButton
                    startIcon={<ShoppingCartIcon />}
                    onClick={() =>
                      router.push(`/account/orders/${orderId}/checkout/form`)
                    }
                  >
                    Finaliser la commande
                  </PillButton>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </AccountPagesLayout>
  )
}
