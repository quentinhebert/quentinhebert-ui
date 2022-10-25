import { Box, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import apiCall from "../../../../services/apiCalls/apiCall"
import PillButton from "../../../ReusableComponents/buttons/pill-button"
import PleaseWait from "../../../ReusableComponents/helpers/please-wait"
import BodyText from "../../../ReusableComponents/text/body-text"
import AccountPagesLayout from "../../AccountPagesLayout"
import Custom404Layout from "../../error/Custom404Layout"
import PaymentIcon from "@mui/icons-material/Payment"
import { useRouter } from "next/router"

const OrderNumber = ({ orderId }) => (
  <BodyText display="inline-flex">
    {`Commande n°`}
    <div style={{ marginLeft: ".5rem" }}>{orderId}</div>
  </BodyText>
)

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
  const [loading, setLoading] = useState(true)

  const fetchOrder = async () => {
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

  // HANDLERS
  const handleRedirectCheckout = async () => {
    const res = await apiCall.orders.getCheckoutClientSecret(order)
    if (res && res.ok) {
      const jsonRes = await res.json()
      router.push(
        `/account/orders/${order.id}/checkout/${jsonRes.client_secret}`
      )
    }
  }

  if (!order.id && !loading) return <Custom404Layout />

  return (
    <AccountPagesLayout title="Information sur la commande">
      {loading && <PleaseWait />}
      {order.id && !loading && (
        <Stack gap={4}>
          <Stack gap={2}>
            <OrderNumber orderId={order.id} />
            <BodyText>Statut : {order.state}</BodyText>
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
              <HeadItem>Prix HT</HeadItem>
              {order.items.map((item, key) => (
                <Row key={key}>
                  <Value data={item.item_type} />
                  <Value data={item.label} />
                  <Value data={item.description} />
                  <Value data={item.quantity} />
                  <Value data={`${item.no_vat_price / 100}€`} />
                </Row>
              ))}
            </Box>

            <Stack width="100%" alignItems="end">
              <Stack direction="row" alignItems="center" gap={5}>
                <TotalPrice totalPrice={order.total_price} />
                {order.state === "accepted" && (
                  <PillButton
                    startIcon={<PaymentIcon />}
                    onClick={handleRedirectCheckout}
                  >
                    Payer
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
