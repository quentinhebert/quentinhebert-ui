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
import SmallTitle from "../../Titles/small-title"
import { formatDayDate } from "../../../services/date-time"
import { buildPublicURL } from "../../../services/utils"
import QuotationReadOnlySection from "../../Sections/Orders/order-read-only-section"
import { INVOICETYPES } from "../../../enums/invoiceTypes"
import {
  getNextPaymentDetails,
  getPaymentFractionsDetails,
} from "../../../services/orders"

const allowedStatesForPaying = [
  "WAITING_FOR_PAYMENT",
  "PAYMENT_FAILED",
  "DEPOSIT_PAID",
]

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

  const nextPayment = getNextPaymentDetails({ order })

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
        <Stack gap={8}>
          <Stack className="row gap-10" alignItems="center">
            <StatusChip order={order} />
            <BodyText>{ORDERSTATES[order.status].description}</BodyText>
            <Stack flexGrow={1} />
            {/* <RefreshButton refresh={fetchOrder} /> */}
            {allowedStatesForPaying.includes(order.status) && (
              <PillButton
                startIcon={<ShoppingCartIcon />}
                onClick={() =>
                  router.push(
                    `/account/orders/${orderId}/checkout/before-checkout-steps`
                  )
                }
              >
                Payer {nextPayment.amount / 100}€ ({nextPayment.label})
              </PillButton>
            )}
          </Stack>

          {order.invoices?.length > 0 && (
            <Stack gap={2}>
              <SmallTitle>Vos factures</SmallTitle>

              {order.invoices.map((invoice, key) => (
                <Stack
                  flexDirection="row"
                  gap={2}
                  key={key}
                  alignItems="center"
                >
                  <BodyText>
                    {formatDayDate({ timestamp: invoice.created_at })}
                  </BodyText>
                  <BodyText>{invoice.number}</BodyText>
                  <BodyText textTransform="capitalize">
                    {INVOICETYPES[invoice.type]}
                  </BodyText>
                  <Box
                    component="a"
                    href={buildPublicURL(invoice.path)}
                    target="_blank"
                  >
                    <PillButton startIcon={<ReceiptIcon />}>
                      Télécharger
                    </PillButton>
                  </Box>
                </Stack>
              ))}
            </Stack>
          )}

          <Stack gap={4}>
            <SmallTitle>Récapitulatif</SmallTitle>

            <QuotationReadOnlySection items={order.items} quotation={order} />

            <Stack width="100%" alignItems="end">
              <Stack direction="row" alignItems="center" gap={5}>
                {allowedStatesForPaying.includes(order.status) && (
                  <PillButton
                    startIcon={<ShoppingCartIcon />}
                    onClick={() =>
                      router.push(
                        `/account/orders/${orderId}/checkout/before-checkout-steps`
                      )
                    }
                  >
                    Payer {nextPayment.amount / 100}€ ({nextPayment.label})
                  </PillButton>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  )
}
