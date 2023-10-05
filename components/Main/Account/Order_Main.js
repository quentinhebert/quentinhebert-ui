import { Box, Grid, Stack, Tooltip, Typography } from "@mui/material"
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
import { getPaymentFractionsDetails } from "../../../services/orders"
import PriceDetails from "../../Sections/Account/Orders/price-details"

const allowedStatesForPaying = [
  "WAITING_FOR_PAYMENT",
  "PAYMENT_FAILED",
  "DEPOSIT_PAID",
  "PARTIALLY_PAID",
  "REQUIRES_ACTION",
]

const StatusChip = ({ order }) => (
  <Pill
    preventTransition
    bgColor={(theme) =>
      theme.alert.title[ORDERSTATES[order.status].severity].background
    }
    border={(theme) =>
      `1px solid ${theme.alert.title[ORDERSTATES[order.status].severity].color}`
    }
    padding="0 1rem"
    lineHeight={0}
  >
    <BodyText
      preventTransition
      fontSize="1rem"
      color={(theme) =>
        theme.alert.title[ORDERSTATES[order.status].severity].color
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
        // Invert order of invoices from DESC to ASC
        jsonRes.invoices = jsonRes.invoices.reverse()
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

  const CheckoutBtn = () => {
    if (!nextPayment) return <></>
    return (
      allowedStatesForPaying.includes(order.status) && (
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
      )
    )
  }

  if (!order.id && !loading) return <Custom404_Main />

  return (
    <>
      {loading && <PleaseWait />}

      {order.id && !loading && (
        <Stack gap={4}>
          <Stack gap={2}>
            <BodyText
              fontSize="2rem"
              preventTransition
              alignItems={{ xs: "start", md: "center" }}
              display="flex"
              gap={{ xs: 2, md: 2 }}
              width="100%"
              color="secondary"
              sx={{
                flexDirection: { xs: "column-reverse", md: "row" },
              }}
            >
              {order?.label || ""}
              <Stack
                flexDirection="row"
                alignItems="center"
                width={{ xs: "100%", md: "auto" }}
              >
                <StatusChip order={order} />
                <Stack flexGrow={1} />
                <RefreshButton refresh={fetchOrder} />
              </Stack>
            </BodyText>

            <BodyText color="grey" fontSize="1rem" preventTransition>
              {ORDERSTATES[order.status].description}
            </BodyText>
          </Stack>

          <Stack maxWidth="300px" margin="auto">
            <CheckoutBtn />
          </Stack>

          <Stack gap={2}>
            <H2>Détail de ma commande</H2>

            <Grid container spacing={2} position="relative" alignItems="start">
              <Grid
                item
                lg={8}
                xl={9}
                gap={2}
                display="flex"
                flexDirection="column"
              >
                <OrderReadOnlySection
                  items={order.items}
                  order={order}
                  hideDetails
                />
                <OrderReadOnlySection
                  items={order.items}
                  order={order}
                  hideModalities
                  hidePriceDetails
                />
              </Grid>

              <Grid
                item
                lg={4}
                xl={3}
                sx={{ position: "sticky", top: "60px" }}
                flexDirection="column"
                display="flex"
                gap={2}
              >
                <PriceDetails items={order.items} order={order} />

                <CheckoutBtn />
              </Grid>
            </Grid>
          </Stack>

          {order.invoices?.length > 0 && (
            <Stack gap={2}>
              <H2>Mes factures</H2>

              <Stack
                flexDirection="row"
                gap={2}
                overflow="auto"
                paddingBottom={17}
                marginBottom={-17}
              >
                <Stack sx={{ flexDirection: "row", gap: 2 }}>
                  {order.invoices.map((invoice, key) => (
                    <Stack key={key} alignItems="center">
                      <Tooltip
                        title={formatDayDate({ timestamp: invoice.created_at })}
                      >
                        <Box
                          component="a"
                          href={buildPublicURL(invoice.path)}
                          target="_blank"
                          className="flex-center"
                          gap={3}
                          minWidth="100px"
                        >
                          <Stack
                            className="flex-center"
                            sx={{
                              background: "transparent",
                              borderRadius: "30px",
                              height: "50px",
                              width: "50px",
                              margin: "auto",
                              border: (theme) =>
                                `1px solid ${theme.palette.secondary.main}`,
                              transition: ".3s ease",
                              "&:hover": {
                                "& > .MuiSvgIcon-root": {
                                  display: "flex",
                                },
                                "& > .MuiTypography-root": {
                                  display: "none",
                                },
                                background: (theme) =>
                                  theme.palette.secondary.main,
                              },
                            }}
                          >
                            <DownloadIcon
                              sx={{
                                display: "none",
                              }}
                            />
                            <Typography color="secondary">
                              {
                                getPaymentFractionsDetails({ order })[key]
                                  ?.percent
                              }
                            </Typography>
                          </Stack>
                          <Typography
                            color="secondary"
                            letterSpacing={1}
                            textTransform="capitalize"
                            textAlign="center"
                            margin=".75rem auto"
                          >
                            {INVOICETYPES[invoice.type]}
                          </Typography>
                        </Box>
                      </Tooltip>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          )}
        </Stack>
      )}
    </>
  )
}
