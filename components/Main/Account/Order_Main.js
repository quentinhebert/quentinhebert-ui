import { Box, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import Custom404_Main from "../../Main/Errors/Custom404_Main"
import { useRouter } from "next/router"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { ORDERSTATES } from "../../../enums/orderStates"
import ReceiptIcon from "@mui/icons-material/Receipt"
import PillButton from "../../Buttons/pill-button"
import PleaseWait from "../../Helpers/please-wait"
import BodyText from "../../Text/body-text"
import Pill from "../../Text/pill"
import RefreshButton from "../../Buttons/refresh-button"
import SmallTitle from "../../Titles/small-title"
import { formatDayDate } from "../../../services/date-time"
import { buildPublicURL } from "../../../services/utils"

const allowedStatesForPaying = [
  "WAITING_FOR_PAYMENT",
  "PAYMENT_FAILED",
  "DEPOSIT_PAID",
]

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
      border: (theme) => `1px solid #000`,
      padding: 2,
    }}
  >
    <BodyText color={(theme) => theme.palette.text.grey} {...props} />
  </Box>
)

const Row = (props) => <Box component="tr" {...props} />

const Value = ({ data }) => (
  <Box
    component="td"
    sx={{
      border: (theme) => `1px solid #000`,
      padding: 2,
    }}
  >
    <BodyText>{data}</BodyText>
  </Box>
)

const StatusChip = ({ order }) => (
  <Pill
    bgColor={(theme) =>
      theme.alert.title[ORDERSTATES[order.status].severity].color
    }
  >
    <BodyText
      color={(theme) =>
        theme.alert.title[ORDERSTATES[order.status].severity].background
      }
    >
      {ORDERSTATES[order.status].label}
    </BodyText>
  </Pill>
)

export default function Order_Main({ orderId }) {
  const initialOrder = {
    id: null,
    created_at: null,
    state: null,
    client_id: null,
    total_price: null,
    items: [],
    invoices: [],
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

  const handleDownload = async ({ name, url }) => {
    //
  }

  if (!order.id && !loading) return <Custom404_Main />

  return (
    <>
      {loading && <PleaseWait />}

      {order.id && !loading && (
        <Stack gap={4}>
          <Stack className="row gap-10" alignItems="center">
            <StatusChip order={order} />
            <BodyText>{ORDERSTATES[order.status].description}</BodyText>
            <Stack flexGrow={1} />
            <RefreshButton refresh={fetchOrder} />
          </Stack>

          <Stack gap={2}>
            <SmallTitle>Récapitulatif</SmallTitle>
            <Stack sx={{ overflowX: "auto" }}>
              <Box
                component="table"
                sx={{
                  borderCollapse: "collapse",
                  background: (theme) => theme.palette.background.main,
                }}
              >
                <HeadItem>Type</HeadItem>
                {/* <HeadItem>Item</HeadItem> */}
                <HeadItem>Description</HeadItem>
                <HeadItem>Qté</HeadItem>
                <HeadItem>TVA</HeadItem>
                <HeadItem>Prix HT</HeadItem>
                {order.items.map((item, key) => (
                  <Row key={key}>
                    <Value data={item.type} />
                    {/* <Value data={item.label} /> */}
                    <Value
                      data={
                        <>
                          {item.label}
                          <br />
                          <Box
                            component="span"
                            fontSize="1rem"
                            sx={{ color: (theme) => theme.palette.text.grey }}
                          >
                            {item.description}
                          </Box>
                        </>
                      }
                    />
                    <Value data={item.quantity} />
                    <Value data={`${item.vat}%`} />
                    <Value data={`${item.no_vat_price / 100}€`} />
                  </Row>
                ))}
              </Box>
            </Stack>

            <Stack width="100%" alignItems="end">
              <Stack direction="row" alignItems="center" gap={5}>
                <TotalPrice totalPrice={order.total_price} />
                {allowedStatesForPaying.includes(order.status) && (
                  <PillButton
                    startIcon={<ShoppingCartIcon />}
                    onClick={() =>
                      router.push(
                        `/account/orders/${orderId}/checkout/before-checkout-steps`
                      )
                    }
                  >
                    {order.status === "DEPOSIT_PAID"
                      ? "Payer le reste"
                      : "Finaliser la commande"}
                  </PillButton>
                )}
              </Stack>
            </Stack>
          </Stack>

          {order.invoices?.length > 0 && <SmallTitle>Vos factures</SmallTitle>}
          {order.invoices.map((invoice, key) => (
            <Stack flexDirection="row" gap={2} key={key} alignItems="center">
              <BodyText>
                {formatDayDate({ timestamp: invoice.created_at })}
              </BodyText>
              <BodyText>{invoice.number}</BodyText>
              <Box
                component="a"
                href={buildPublicURL(invoice.path)}
                target="_blank"
              >
                <PillButton startIcon={<ReceiptIcon />}>Facture</PillButton>
              </Box>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  )
}
