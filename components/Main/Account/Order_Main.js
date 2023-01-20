import { Box, Stack, Tooltip, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import Custom404_Main from "../../Main/Errors/Custom404_Main"
import { useRouter } from "next/router"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { ORDERSTATES } from "../../../enums/orderStates"
import PillButton from "../../Buttons/pill-button"
import PleaseWait from "../../Helpers/please-wait"
import BodyText from "../../Text/body-text"
import Pill from "../../Text/pill"
import { formatDayDate } from "../../../services/date-time"
import { buildPublicURL } from "../../../services/utils"
import OrderReadOnlySection from "../../Sections/Orders/order-read-only-section"
import { INVOICETYPES } from "../../../enums/invoiceTypes"
import { getNextPaymentDetails } from "../../../services/orders"
import RefreshButton from "../../Buttons/refresh-button"
import DownloadIcon from "@mui/icons-material/Download"

const allowedStatesForPaying = [
  "WAITING_FOR_PAYMENT",
  "PAYMENT_FAILED",
  "DEPOSIT_PAID",
  "PARTIALLY_PAID",
]

const StatusChip = ({ order }) => (
  <Pill
    preventTransition
    bgColor={(theme) =>
      theme.alert.title[ORDERSTATES[order.status].severity].color
    }
    padding="0 1rem"
    lineHeight={0}
  >
    <BodyText
      preventTransition
      fontSize="1rem"
      color={(theme) =>
        theme.alert.title[ORDERSTATES[order.status].severity].background
      }
      textTransform="initial"
    >
      {ORDERSTATES[order.status].label}
    </BodyText>
  </Pill>
)
const H2 = (props) => (
  <BodyText preventTransition color="grey" fontSize="1.5rem" {...props} />
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

  const nextPayment = getNextPaymentDetails({ order })

  useEffect(() => {
    fetchOrder()
  }, [])

  const router = useRouter()

  const handleDownload = async ({ name, url }) => {
    //
  }

  const CheckoutBtn = () =>
    allowedStatesForPaying.includes(order.status) && (
      <Stack alignItems="center">
        <PillButton
          startIcon={<ShoppingCartIcon />}
          textTransform="initial"
          onClick={() =>
            router.push(
              `/account/orders/${orderId}/checkout/before-checkout-steps`
            )
          }
        >
          Payer {nextPayment.amount / 100}€ ({nextPayment.label})
        </PillButton>
      </Stack>
    )

  if (!order.id && !loading) return <Custom404_Main />

  return (
    <>
      {loading && <PleaseWait />}

      {order.id && !loading && (
        <Stack gap={10}>
          <Stack gap={2}>
            <Stack className="row gap-10" alignItems="center">
              <StatusChip order={order} />
              <BodyText color="grey" fontSize="1rem" preventTransition>
                {ORDERSTATES[order.status].description}
              </BodyText>
              <Stack flexGrow={1} />
              <RefreshButton refresh={fetchOrder} />
            </Stack>

            <BodyText fontSize="2rem" preventTransition>
              {order?.label || ""}
            </BodyText>
          </Stack>

          <CheckoutBtn />

          {order.invoices?.length > 0 && (
            <Stack gap={2}>
              <H2>Mes factures</H2>

              {order.invoices.map((invoice, key) => (
                <Stack
                  flexDirection="row"
                  gap={2}
                  key={key}
                  alignItems="center"
                >
                  <Tooltip
                    title={formatDayDate({ timestamp: invoice.created_at })}
                  >
                    <Box
                      component="a"
                      href={buildPublicURL(invoice.path)}
                      target="_blank"
                    >
                      <Stack className="flex-center row gap-10">
                        <DownloadIcon color="secondary" />
                        <Typography
                          color="secondary"
                          letterSpacing={1}
                          className="cool-button"
                        >
                          Télécharger {INVOICETYPES[invoice.type]}
                        </Typography>
                      </Stack>
                    </Box>
                  </Tooltip>
                </Stack>
              ))}
            </Stack>
          )}

          <Stack gap={4}>
            <H2>Détail de ma commande</H2>

            <OrderReadOnlySection
              items={order.items}
              quotation={order}
              hideDetails
            />
            <OrderReadOnlySection
              items={order.items}
              quotation={order}
              hideModalities
            />

            <Stack width="100%" alignItems="end">
              <CheckoutBtn />
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  )
}
