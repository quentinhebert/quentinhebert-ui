import { Box, Grid, Stack, Tooltip, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
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
import DetectableOverflow from "react-detectable-overflow"
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { useInView } from "react-intersection-observer"
import HttpsTwoToneIcon from "@mui/icons-material/HttpsTwoTone"
import { CreditCard, Mastercard, Visa, Paypal, Stripe } from "grommet-icons"

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

  const [overflow, setOverflow] = useState(false)

  const [firstInvoiceRef, firstInvoiceInView] = useInView()
  const [lastInvoiceRef, lastInvoiceInView] = useInView()
  const first = useRef(null)
  const last = useRef(null)

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
        <>
          <PillButton
            preventTransition
            startIcon={<ShoppingCartIcon />}
            textTransform="initial"
            onClick={() =>
              router.push(
                `/account/orders/${orderId}/checkout/before-checkout-steps`
              )
            }
          >
            Payer {nextPayment.amount / 100}€{/* ({nextPayment.label}) */}
          </PillButton>

          <BodyText
            preventTransition
            className="flex-center flex gap-10"
            margin="1rem 0"
          >
            <HttpsTwoToneIcon color="secondary" /> Paiement 100% sécurisé
          </BodyText>

          <Stack margin="auto" gap={1} flexDirection="row">
            <CreditCard />
            <Mastercard />
            <Visa />
            <Paypal />
            <SepaDebit />
          </Stack>

          <Stack margin="auto" gap={1} flexDirection="row">
            <ApplePay />
            <GooglePay />
          </Stack>

          <Stack
            margin="auto"
            flexDirection="row"
            className="flex-center"
            gap=".25rem"
          >
            <Typography color="grey" fontSize=".8rem">
              Propulsé par
            </Typography>
            <StripeLogo />
          </Stack>
        </>
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

          {/* <Stack maxWidth="300px" margin="auto">
            <CheckoutBtn />
          </Stack> */}

          <Stack gap={2}>
            <Grid container spacing={4} position="relative" alignItems="start">
              <Grid
                item
                xs={12}
                lg={5}
                xl={3}
                sx={{
                  position: { xs: "relative", lg: "sticky" },
                  top: { xs: "0px", lg: "60px" },
                }}
                flexDirection="column"
                display="flex"
                gap={2}
              >
                <Stack
                  gap={2}
                  bgcolor="background.main"
                  padding={2}
                  borderRadius="30px"
                >
                  <PriceDetails items={order.items} order={order} />

                  <CheckoutBtn />
                </Stack>
              </Grid>

              <Grid
                item
                xs={12}
                lg={7}
                xl={9}
                gap={2}
                display="flex"
                flexDirection="column"
              >
                <H2>Détail de ma commande</H2>
                <OrderReadOnlySection
                  items={order.items}
                  order={order}
                  hideDetails
                  hidePaymentDetails
                />
                <OrderReadOnlySection
                  items={order.items}
                  order={order}
                  hideModalities
                  hidePriceDetails
                />
                <OrderReadOnlySection
                  items={order.items}
                  order={order}
                  hideDetails
                  hideDates
                />

                {order.invoices?.length > 0 && (
                  <Stack gap={2}>
                    <H2>Mes factures</H2>
                    <Stack gap={2} position="relative">
                      <Stack overflow="hidden" boxSizing="content-box">
                        <DetectableOverflow
                          onChange={setOverflow}
                          style={{
                            flexDirection: "row",
                            gap: 2,
                            overflowX: "scroll",
                            marginBottom: "-60px",
                            paddingBottom: "30px",
                            boxSizing: "content-box",
                          }}
                        >
                          <Stack sx={{ flexDirection: "row", gap: 2 }}>
                            {order.invoices.map((invoice, key) => (
                              <Stack
                                key={key}
                                alignItems="center"
                                ref={
                                  key === 0
                                    ? first
                                    : key === order.invoices.length - 1
                                    ? last
                                    : null
                                }
                              >
                                <Tooltip
                                  title={formatDayDate({
                                    timestamp: invoice.created_at,
                                  })}
                                >
                                  <Box
                                    component="a"
                                    href={buildPublicURL(invoice.path)}
                                    target="_blank"
                                    className="flex-center"
                                    gap={3}
                                    minWidth="100px"
                                    ref={
                                      key === 0
                                        ? firstInvoiceRef
                                        : key === order.invoices.length - 1
                                        ? lastInvoiceRef
                                        : null
                                    }
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
                                          getPaymentFractionsDetails({ order })[
                                            key
                                          ]?.percent
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
                        </DetectableOverflow>
                      </Stack>

                      <Stack
                        width="100%"
                        height="100%"
                        position="absolute"
                        top={0}
                        display={overflow ? "flex" : "none"}
                        sx={{ pointerEvents: "none" }}
                      >
                        <NavigationButton
                          side="left"
                          display={firstInvoiceInView ? "none" : "flex"}
                          onClick={() =>
                            first.current?.scrollIntoView({
                              behavior: "smooth",
                              block: "nearest",
                            })
                          }
                        />
                        <NavigationButton
                          side="right"
                          display={lastInvoiceInView ? "none" : "flex"}
                          onClick={() =>
                            last.current?.scrollIntoView({
                              behavior: "smooth",
                              block: "nearest",
                            })
                          }
                        />
                      </Stack>
                    </Stack>
                  </Stack>
                )}
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      )}
    </>
  )
}

function NavigationButton({ display, side, ...props }) {
  return (
    <Stack
      className="pointer flex-center"
      sx={{
        display,
        position: "absolute",
        [side]: "0",
        height: "100%",
        padding: side === "right" ? "0 0rem 0 2rem" : "0 2rem 0 0rem",
        background: `linear-gradient(${
          side === "right" ? "" : "-"
        }90deg, transparent 0%, #000 100%)`,
        color: "#fff",
        "&:hover": {
          color: (theme) => theme.palette.secondary.main,
        },
        pointerEvents: "auto",
      }}
      {...props}
    >
      <NavigateNextIcon
        sx={{
          fontSize: "2rem",
          display: "flex",
          margin: "auto",

          rotate: side === "left" ? "180deg" : "0deg",
        }}
      />
    </Stack>
  )
}

function StripeLogo() {
  return (
    <svg
      fill="grey"
      width="40px"
      height="40px"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.25 10.435l-2.165 0.46-0.010 7.12c0 1.315 0.99 2.165 2.305 2.165 0.73 0 1.265-0.135 1.56-0.295v-1.69c-0.285 0.115-1.685 0.525-1.685-0.785v-3.16h1.685v-1.89h-1.685zM12.705 13.015l-0.135-0.655h-1.92v7.66h2.215v-5.155c0.525-0.69 1.41-0.555 1.695-0.465v-2.040c-0.3-0.105-1.335-0.3-1.855 0.655zM17.32 9.4l-2.23 0.475v1.81l2.23-0.475zM2.245 14.615c0-0.345 0.29-0.48 0.755-0.485 0.675 0 1.535 0.205 2.21 0.57v-2.090c-0.735-0.29-1.47-0.405-2.205-0.405-1.8 0-3 0.94-3 2.51 0 2.46 3.375 2.060 3.375 3.12 0 0.41-0.355 0.545-0.85 0.545-0.735 0-1.685-0.305-2.43-0.71v2c0.825 0.355 1.66 0.505 2.425 0.505 1.845 0 3.115-0.79 3.115-2.39 0-2.645-3.395-2.17-3.395-3.17zM32 16.28c0-2.275-1.1-4.070-3.21-4.070s-3.395 1.795-3.395 4.055c0 2.675 1.515 3.91 3.675 3.91 1.060 0 1.855-0.24 2.46-0.575v-1.67c-0.605 0.305-1.3 0.49-2.18 0.49-0.865 0-1.625-0.305-1.725-1.345h4.345c0.010-0.115 0.030-0.58 0.030-0.795zM27.605 15.44c0-1 0.615-1.42 1.17-1.42 0.545 0 1.125 0.42 1.125 1.42zM21.96 12.21c-0.87 0-1.43 0.41-1.74 0.695l-0.115-0.55h-1.955v10.24l2.22-0.47 0.005-2.51c0.32 0.235 0.795 0.56 1.57 0.56 1.59 0 3.040-1.16 3.040-3.98 0.005-2.58-1.465-3.985-3.025-3.985zM21.43 18.335c-0.52 0-0.83-0.19-1.045-0.42l-0.015-3.3c0.23-0.255 0.55-0.44 1.060-0.44 0.81 0 1.37 0.91 1.37 2.070 0.005 1.195-0.545 2.090-1.37 2.090zM15.095 20.020h2.23v-7.66h-2.23z" />
    </svg>
  )
}

function SepaDebit() {
  return <img src="/medias/sepa.svg" width="50px" />
}

function ApplePay() {
  return (
    <Stack borderRadius="5px" border="1px solid grey" padding="0 .5rem">
      <svg
        fill="grey"
        width="30px"
        height="30px"
        viewBox="0 -34.55 120.3 120.3"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M22.8 6.6c1.4-1.8 2.4-4.2 2.1-6.6-2.1.1-4.6 1.4-6.1 3.1-1.3 1.5-2.5 4-2.2 6.3 2.4.3 4.7-1 6.2-2.8M24.9 10c-3.4-.2-6.3 1.9-7.9 1.9-1.6 0-4.1-1.8-6.8-1.8-3.5.1-6.7 2-8.5 5.2-3.6 6.3-1 15.6 2.6 20.7 1.7 2.5 3.8 5.3 6.5 5.2 2.6-.1 3.6-1.7 6.7-1.7s4 1.7 6.8 1.6 4.6-2.5 6.3-5.1c2-2.9 2.8-5.7 2.8-5.8-.1-.1-5.5-2.1-5.5-8.3-.1-5.2 4.2-7.7 4.4-7.8-2.3-3.6-6.1-4-7.4-4.1" />

        <g>
          <path d="M54.3 2.9c7.4 0 12.5 5.1 12.5 12.4 0 7.4-5.2 12.5-12.7 12.5H46v12.9h-5.9V2.9h14.2zm-8.3 20h6.7c5.1 0 8-2.8 8-7.5 0-4.8-2.9-7.5-8-7.5h-6.8v15h.1zM68.3 33c0-4.8 3.7-7.8 10.3-8.2l7.6-.4v-2.1c0-3.1-2.1-4.9-5.5-4.9-3.3 0-5.3 1.6-5.8 4h-5.4c.3-5 4.6-8.7 11.4-8.7 6.7 0 11 3.5 11 9.1v19h-5.4v-4.5h-.1c-1.6 3.1-5.1 5-8.7 5-5.6 0-9.4-3.4-9.4-8.3zm17.9-2.5v-2.2l-6.8.4c-3.4.2-5.3 1.7-5.3 4.1 0 2.4 2 4 5 4 4 0 7.1-2.7 7.1-6.3zM96.9 51v-4.6c.4.1 1.4.1 1.8.1 2.6 0 4-1.1 4.9-3.9 0-.1.5-1.7.5-1.7l-10-27.6h6.1l7 22.5h.1l7-22.5h6L110 42.4c-2.4 6.7-5.1 8.8-10.8 8.8-.4-.1-1.8-.1-2.3-.2z" />
        </g>
      </svg>
    </Stack>
  )
}

function GooglePay() {
  return (
    <Stack borderRadius="5px" border="1px solid grey" padding="0 .5rem">
      <svg
        fill="grey"
        width="30px"
        height="30px"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M32 13.333l-4.177 9.333h-1.292l1.552-3.266-2.75-6.068h1.359l1.99 4.651h0.026l1.927-4.651zM14.646 16.219v3.781h-1.313v-9.333h3.474c0.828-0.021 1.63 0.266 2.25 0.807 0.615 0.505 0.953 1.219 0.943 1.974 0.010 0.766-0.339 1.5-0.943 1.979-0.604 0.531-1.354 0.792-2.25 0.792zM14.641 11.818v3.255h2.198c0.484 0.016 0.958-0.161 1.297-0.479 0.339-0.302 0.526-0.714 0.526-1.141 0-0.432-0.188-0.844-0.526-1.141-0.349-0.333-0.818-0.51-1.297-0.495zM22.63 13.333c0.833 0 1.495 0.234 1.979 0.698s0.724 1.099 0.724 1.906v3.859h-1.083v-0.87h-0.047c-0.469 0.714-1.089 1.073-1.865 1.073-0.667 0-1.219-0.203-1.667-0.615-0.438-0.385-0.682-0.948-0.672-1.531 0-0.646 0.234-1.161 0.708-1.547 0.469-0.38 1.099-0.573 1.885-0.573 0.672 0 1.224 0.13 1.656 0.385v-0.271c0.005-0.396-0.167-0.776-0.464-1.042-0.297-0.276-0.688-0.432-1.094-0.427-0.63 0-1.13 0.276-1.5 0.828l-0.995-0.646c0.547-0.818 1.359-1.229 2.432-1.229zM21.167 17.88c-0.005 0.302 0.135 0.583 0.375 0.766 0.25 0.203 0.563 0.313 0.88 0.307 0.474 0 0.932-0.198 1.271-0.547 0.359-0.333 0.563-0.802 0.563-1.292-0.354-0.292-0.844-0.438-1.474-0.438-0.464 0-0.844 0.115-1.151 0.344-0.307 0.234-0.464 0.516-0.464 0.859zM5.443 10.667c1.344-0.016 2.646 0.479 3.641 1.391l-1.552 1.521c-0.568-0.526-1.318-0.813-2.089-0.797-1.385 0.005-2.609 0.891-3.057 2.198-0.229 0.661-0.229 1.38 0 2.042 0.448 1.307 1.672 2.193 3.057 2.198 0.734 0 1.365-0.182 1.854-0.505 0.568-0.375 0.964-0.958 1.083-1.625h-2.938v-2.052h5.13c0.063 0.359 0.094 0.719 0.094 1.083 0 1.625-0.594 3-1.62 3.927-0.901 0.813-2.135 1.286-3.604 1.286-2.047 0.010-3.922-1.125-4.865-2.938-0.771-1.505-0.771-3.286 0-4.792 0.943-1.813 2.818-2.948 4.859-2.938z" />
      </svg>
    </Stack>
  )
}
