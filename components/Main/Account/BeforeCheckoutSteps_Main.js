import { Box, Grid, Stack, Typography } from "@mui/material"
import { useContext, useEffect, useRef, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import Custom404_Main from "../../Main/Errors/Custom404_Main"
import SelectAddressSection from "../../Sections/Account/Orders/select-address-section"
import SelectPaymentMethodSection from "../../Sections/Account/Orders/select-payment-method-section"
import PleaseWait from "../../Helpers/please-wait"
import CustomStepper from "../../Navigation/custom-stepper"
import Custom401_Main from "../Errors/Custom401_Main"
import BodyText from "../../Text/body-text"
import PriceDetails from "../../Sections/Account/Orders/price-details"
import {
  getNextPaymentDetails,
  getPaymentFractionsDetails,
} from "../../../services/orders"
import Span from "../../Text/span"
import CustomCard from "../../Cards/custom-card"
import { formatPrice, zeroPad } from "../../../services/utils"
import PillButton from "../../Buttons/pill-button"
import EastIcon from "@mui/icons-material/East"
import { useRouter } from "next/router"
import { UserContext } from "../../../contexts/UserContext"
import { AppContext } from "../../../contexts/AppContext"
import EditIcon from "@mui/icons-material/Edit"

const steps = [
  "Adresse de facturation",
  // "Adresse de livraison",
  "Moyen de paiement",
  "Récapitulatif et paiement",
]

const ActionTitle = (props) => (
  <Typography variant="h6" color="#fff" {...props} />
)
const ActionText = (props) => (
  <BodyText {...props} preventTransition fontSize="1rem" />
)

export default function BeforeCheckoutSteps_Main({ orderId }) {
  const initialOrder = {
    id: null,
    created_at: null,
    state: null,
    client_id: null,
    total_price: null,
    items: [],
    payments: [],
    payment_fractions: [],
  }
  const initialPM = {}

  const { user } = useContext(UserContext)
  const { setSnackMessage, setSnackSeverity } = useContext(AppContext)

  const [order, setOrder] = useState(initialOrder)
  const [paymentMethod, setPaymentMethod] = useState(initialPM)
  const [loading, setLoading] = useState(false)
  const [invoiceAddress, setInvoiceAddress] = useState(null)
  const [deliveryAddress, setDeliveryAddress] = useState(null)
  const [is401, setIs401] = useState(false)
  const [processing, setProcessing] = useState(false)

  const router = useRouter()

  // Stepper utils
  const [activeStep, setActiveStep] = useState(0)
  const totalSteps = () => steps.length
  const isLastStep = () => activeStep === totalSteps() - 1
  const handleCompleteSteps = () => {
    alert("Steps completed !")
  }
  const handleNext = () => {
    if (isLastStep()) return handleCompleteSteps()
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const fetchOrder = async () => {
    setLoading(true)
    if (orderId) {
      const res = await apiCall.orders.get({ id: orderId })
      if (res && res.status === 401) setIs401(true)
      if (res && res.ok) {
        const jsonRes = await res.json()
        setOrder(jsonRes)
      }
    }
    setLoading(false)
  }
  const handleSelectPm = (paymentMethod) => {
    setPaymentMethod(paymentMethod)
    handleNext()
  }
  const handleRedirectCheckout = async () => {
    setProcessing(true)
    const res = await apiCall.orders.getCheckoutClientSecret({
      order: { id: orderId },
      invoiceAddress,
      deliveryAddress,
      payment_method: paymentMethod,
    })
    if (res && res.ok) {
      if (res.status === 200) {
        const jsonRes = await res.json()
        if (!!jsonRes.next_action?.url)
          window.location.href = jsonRes.next_action.url
        else {
          router.push(`/account/orders/${orderId}/checkout/result`)
          setSnackMessage("Paiement réussi ! ✅")
          setSnackSeverity("success")
        }
      } else if (res.status === 204) {
        router.push(`/account/orders/${orderId}/checkout/result`)
        setSnackMessage("Paiement réussi ! ✅")
        setSnackSeverity("success")
      }
    } else {
      setSnackMessage("Une erreur est survenue lors du paiement...")
      setSnackSeverity("error")
    }
    setProcessing(false)
  }

  const pmRef = useRef(null)
  const dRef = useRef(null)
  const iRef = useRef(null)
  const checkoutRef = useRef(null)
  const RefsForScroll = {
    invoicing: iRef,
    delivery: dRef,
    paymentMethod: pmRef,
    checkout: checkoutRef,
  }
  const scrollTo = (ref) => {
    ref?.current?.scrollIntoView({
      behavior: "smooth",
    })
  }

  useEffect(() => {
    fetchOrder()
  }, [])

  useEffect(() => {
    if (activeStep === 0) scrollTo(RefsForScroll.invoicing)
    else if (activeStep === 1) scrollTo(RefsForScroll.paymentMethod)
    else if (activeStep === 2) scrollTo(RefsForScroll.checkout)
  }, [activeStep])

  const nextPayment = getNextPaymentDetails({ order })
  const paymentFractions = getPaymentFractionsDetails({ order })

  if (is401) return <Custom401_Main redirect={`/order-view/${orderId}`} />
  if (!order.id && !loading) return <Custom404_Main />

  return (
    <>
      {/********** STEPPER **********/}
      <Stack
        position="sticky"
        top="56px"
        paddingTop="10px"
        alignSelf="flex-start"
        width="100%"
        zIndex={1}
        bgcolor="background.black"
      >
        <CustomCard
          marginBottom="1rem"
          backgroundColor={(theme) => theme.palette.background.main}
          padding={{ xs: "2rem 0.5rem", md: "1rem" }}
          borderRadius="20px"
        >
          <CustomStepper
            steps={steps}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        </CustomCard>
      </Stack>

      {loading && <PleaseWait />}

      <Stack
        gap={2}
        padding={{ xs: "0", md: "2rem 0" }}
        flexDirection={{ xs: "column", lg: "row" }}
        position="relative"
      >
        <Stack width="100%">
          <Stack
            ref={RefsForScroll.invoicing}
            sx={{ scrollMarginTop: "200px" }}
          />
          {activeStep !== 0 && (
            <>
              <CustomCard
                marginBottom="1rem"
                borderRadius="20px"
                padding={{ xs: "1rem", md: "2rem" }}
                backgroundColor={(theme) => theme.palette.background.main}
                gap={2}
              >
                <Stack flexDirection="row" justifyContent="space-between">
                  <Typography variant="h6" color="text.grey" textAlign="left">
                    Adresse de facturation
                  </Typography>
                  <EditButton
                    setActiveStep={setActiveStep}
                    targetStepIndex={0}
                  />
                </Stack>

                <BodyText>
                  <Span fontWeight="bold" fontSize="1.2rem">
                    {invoiceAddress.fullname}
                  </Span>
                  <br />
                  {user.email}
                  <br />
                  {!!invoiceAddress.phone && (
                    <>
                      {invoiceAddress.phone}
                      <br />
                    </>
                  )}
                  {!!invoiceAddress.line1 && <>{invoiceAddress.line1}, </>}
                  {!!invoiceAddress.line2 && <>{invoiceAddress.line2}, </>}
                  {invoiceAddress.postal_code || invoiceAddress.postalCode}{" "}
                  {invoiceAddress.city},{" "}
                  {!!invoiceAddress.region && <>{invoiceAddress.region}, </>}
                  {invoiceAddress.country}
                  <br />
                </BodyText>
              </CustomCard>
            </>
          )}

          <Stack
            ref={RefsForScroll.checkout}
            sx={{ scrollMarginTop: "200px" }}
          />
          {activeStep === 2 && (
            <>
              <CustomCard
                padding={{ xs: "1rem", md: "2rem" }}
                backgroundColor={(theme) => theme.palette.background.main}
                marginBottom="1rem"
                borderRadius="20px"
              >
                <Stack flexDirection="row" justifyContent="space-between">
                  <Typography variant="h6" color="text.grey" textAlign="left">
                    Moyen de paiement
                  </Typography>
                  <EditButton
                    setActiveStep={setActiveStep}
                    targetStepIndex={1}
                  />
                </Stack>

                <Stack width="100%" maxWidth="300px" alignSelf="center">
                  {!!paymentMethod.sepa_debit && (
                    <CustomCard
                      backgroundColor={(theme) =>
                        theme.palette.background.black
                      }
                      marginBottom={1}
                    >
                      <BodyText
                        textTransform="uppercase"
                        textAlign="right"
                        fontWeight="bold"
                      >
                        Prélèvement bancaire
                      </BodyText>
                      <Grid container mt={2}>
                        <Grid item xs={2} textAlign="left">
                          <BodyText color="grey" fontSize="0.7rem">
                            IBAN
                          </BodyText>
                        </Grid>
                        <Grid item xs={10} textAlign="right">
                          <BodyText>
                            {paymentMethod.sepa_debit.country}** **** **** ****
                            **
                            {paymentMethod.sepa_debit.last4[0]}{" "}
                            {paymentMethod.sepa_debit.last4[1]}
                            {paymentMethod.sepa_debit.last4[2]}
                            {paymentMethod.sepa_debit.last4[3]}{" "}
                          </BodyText>
                        </Grid>
                      </Grid>
                    </CustomCard>
                  )}
                  {!!paymentMethod.card && (
                    <CustomCard
                      marginBottom={1}
                      backgroundColor={(theme) =>
                        theme.palette.background.black
                      }
                      gap={1}
                    >
                      <BodyText
                        textTransform="uppercase"
                        textAlign="right"
                        fontWeight="bold"
                      >
                        {paymentMethod.card.brand}
                      </BodyText>
                      <Grid container mt={2}>
                        <Grid item xs={2} textAlign="left">
                          <BodyText color="grey" fontSize="0.7rem">
                            Num.
                          </BodyText>
                        </Grid>
                        <Grid item xs={10} textAlign="right">
                          <BodyText>
                            **** **** **** {paymentMethod.card.last4}
                          </BodyText>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={2} textAlign="left">
                          <BodyText color="grey" fontSize="0.7rem">
                            Exp.
                          </BodyText>
                        </Grid>
                        <Grid item xs={10} textAlign="right">
                          <BodyText>
                            {zeroPad(paymentMethod.card.exp_month, 2)}/
                            {paymentMethod.card.exp_year}
                          </BodyText>
                        </Grid>
                      </Grid>
                    </CustomCard>
                  )}
                </Stack>
              </CustomCard>
            </>
          )}

          {/********** FORMS **********/}
          {activeStep === 0 && (
            <CustomCard
              padding={{ xs: "1rem", md: "2rem" }}
              backgroundColor={(theme) => theme.palette.background.main}
              borderRadius="20px"
            >
              <Typography variant="h2" color="secondary" textAlign="center">
                Facturation
              </Typography>
              <SelectAddressSection
                defaultId={invoiceAddress?.id}
                handleNext={handleNext}
                setParentAddress={setInvoiceAddress}
              />
            </CustomCard>
          )}

          {/* {activeStep === 1 && (
          <>
              <AlertInfo
                content={{
                  title: "Pourquoi dois-je renseigner mon adresse ?",
                  severity: "info",
                  text: "Votre adresse est nécessaire pour la livraison de votre commande.",
                }}
              />
            <SelectAddressSection
              handleNext={handleNext}
              handleBack={handleBack}
              idImpossibleToDelete={invoiceAddress.id}
              setParentAddress={setDeliveryAddress}
              defaultId={deliveryAddress?.id || invoiceAddress?.id || null}
              delivery
            />
          </>
        )} */}
          {activeStep === 1 && (
            <>
              <Stack
                ref={RefsForScroll.paymentMethod}
                sx={{ scrollMarginTop: "200px" }}
              />
              <SelectPaymentMethodSection
                orderId={orderId}
                order={order}
                setOrder={setOrder}
                invoiceAddress={invoiceAddress}
                deliveryAddress={deliveryAddress}
                handleSelectPm={handleSelectPm}
              />
            </>
          )}
        </Stack>

        {/********** PRICE LATERAL BAR **********/}
        <Stack gap={1} position="sticky" top="180px" alignSelf="flex-start">
          <Stack maxWidth="400px">
            <PriceDetails items={order.items} order={order} />
          </Stack>

          {!!nextPayment && (
            <Stack
              sx={{
                padding: { xs: "1rem", md: 3 },
                gap: 2,
                borderRadius: "20px",
                background: (theme) => theme.palette.background.main,
              }}
            >
              {paymentFractions.length > 0 &&
                paymentFractions.map((f, key) => {
                  const isNextPayment = key === nextPayment.index
                  return (
                    isNextPayment && (
                      <Stack>
                        {isNextPayment && (
                          <ActionTitle>Je règle maintenant</ActionTitle>
                        )}
                        <ActionText key={key}>
                          <Box
                            color={(theme) =>
                              isNextPayment
                                ? theme.palette.text.secondary
                                : "grey"
                            }
                            component="span"
                            fontSize="1rem"
                          >
                            <Box
                              component="span"
                              color="grey"
                              className="initial-cap"
                            >
                              {paymentFractions.length === 1
                                ? null
                                : `${f.label} de ${f.percent}`}
                            </Box>
                            <Span ml={1}>{formatPrice(f.amount)}€ TTC</Span>
                          </Box>
                        </ActionText>
                      </Stack>
                    )
                  )
                })}
            </Stack>
          )}

          <Stack mt={2}>
            {activeStep === 2 && (
              <PillButton
                endIcon={<EastIcon />}
                onClick={handleRedirectCheckout}
                disabled={processing}
              >
                {processing
                  ? "Veuillez patienter..."
                  : "Payer et finaliser la commande"}
              </PillButton>
            )}

            {/* {activeStep === 1 && (
              <Stack width="100%" gap={1}>
                <PillButton
                  preventTransitionOut
                  width="100%"
                  onClick={handleRedirectCheckout("card")}
                  startIcon={<CreditCardIcon />}
                >
                  Carte bancaire
                </PillButton>
                <PillButton
                  preventTransitionOut
                  width="100%"
                  onClick={handleRedirectCheckout("sepa_debit")}
                  startIcon={<AccountBalanceIcon />}
                >
                  Prélèvement bancaire
                </PillButton>
                <PillButton
                  preventTransitionOut
                  width="100%"
                  onClick={handleRedirectCheckout("paypal")}
                  startIcon={<Paypal color="#000" />}
                >
                  Paypal
                </PillButton>
              </Stack>
            )} */}
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}

function EditButton({ setActiveStep, targetStepIndex }) {
  return (
    <PillButton
      onClick={() => setActiveStep(targetStepIndex)}
      background="transparent"
      border={(theme) => `1px solid ${theme.palette.secondary.main}`}
      color={(theme) => theme.palette.secondary.main}
      padding=".25rem .75rem"
      startIcon={<EditIcon />}
    >
      Modifier
    </PillButton>
  )
}
