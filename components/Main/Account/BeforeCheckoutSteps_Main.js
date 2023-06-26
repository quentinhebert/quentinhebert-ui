import { Box, Grid, Stack, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import Custom404_Main from "../../Main/Errors/Custom404_Main"
import SelectAddressSection from "../../Sections/Account/Orders/select-address-section"
import SelectPaymentMethodSection from "../../Sections/Account/Orders/select-payment-method-section"
import PleaseWait from "../../Helpers/please-wait"
import CustomStepper from "../../Navigation/custom-stepper"
import CenteredMaxWidthContainer from "../../Containers/centered-max-width-container"
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
  const [order, setOrder] = useState(initialOrder)
  const [paymentMethod, setPaymentMethod] = useState(initialPM)
  const [loading, setLoading] = useState(false)
  const [invoiceAddress, setInvoiceAddress] = useState(null)
  const [deliveryAddress, setDeliveryAddress] = useState(null)
  const [is401, setIs401] = useState(false)

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
    const res = await apiCall.orders.getCheckoutClientSecret({
      order: { id: orderId },
      invoiceAddress,
      deliveryAddress,
      payment_method: paymentMethod,
    })
    if (res && res.ok) {
      router.push(`/account/orders/${orderId}/checkout/success`)
    } else alert("Une erreur est survenue")
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
    ref.current.scrollIntoView({
      behavior: "smooth",
    })
  }

  useEffect(() => {
    fetchOrder()
  }, [])

  useEffect(() => {
    if (
      !RefsForScroll.invoicing.current ||
      !RefsForScroll.paymentMethod.current
    )
      return
    if (activeStep === 0) scrollTo(RefsForScroll.invoicing)
    else if (activeStep === 1) scrollTo(RefsForScroll.paymentMethod)
    else if (activeStep === 2) scrollTo(RefsForScroll.checkout)
  }, [activeStep])

  const nextPayment = getNextPaymentDetails({ order })
  const paymentFractions = getPaymentFractionsDetails({ order })

  if (is401) return <Custom401_Main redirect={`/order-view/${orderId}`} />
  if (!order.id && !loading) return <Custom404_Main />

  return (
    <Stack gap={{ xs: 0, md: 6 }} padding={{ xs: "0", md: "2rem 0" }}>
      {loading && <PleaseWait />}

      <Stack>
        {/********** STEPPER **********/}
        <Stack
          ref={RefsForScroll.checkout}
          sx={{ scrollMarginTop: (theme) => theme.navbar.marginTop }}
        />
        <CenteredMaxWidthContainer percents={{ xs: "100%", md: "80%" }}>
          <CustomCard
            backgroundColor={(theme) => theme.palette.background.main}
            padding={{ xs: "2rem 0.5rem", md: "2rem" }}
          >
            <CustomStepper
              steps={steps}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </CustomCard>
        </CenteredMaxWidthContainer>

        {/********** FORMS **********/}
        <Stack
          ref={RefsForScroll.invoicing}
          sx={{ scrollMarginTop: (theme) => theme.navbar.marginTop }}
        />
        {activeStep === 0 && (
          <CenteredMaxWidthContainer percents={{ xs: "100%", md: "80%" }}>
            <CustomCard
              backgroundColor={(theme) => theme.palette.background.main}
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
          </CenteredMaxWidthContainer>
        )}

        {/* {activeStep === 1 && (
          <>
            <CenteredMaxWidthContainer>
              <AlertInfo
                content={{
                  title: "Pourquoi dois-je renseigner mon adresse ?",
                  severity: "info",
                  text: "Votre adresse est nécessaire pour la livraison de votre commande.",
                }}
              />
            </CenteredMaxWidthContainer>
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

        <Stack
          ref={RefsForScroll.paymentMethod}
          sx={{ scrollMarginTop: (theme) => theme.navbar.marginTop }}
        />
        {activeStep === 1 && (
          <>
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

      {/********** PRICE & ACTION DETAILS **********/}
      <CenteredMaxWidthContainer percents={{ xs: "100%", md: "80%" }}>
        <Typography
          variant="h6"
          color="secondary"
          textAlign="left"
          fontStyle="italic"
        >
          Récapitulatif de votre commande
        </Typography>

        <Stack
          sx={{
            width: "100%",
            height: "3px",
            background: (theme) =>
              `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.background.black})`,
            mb: 4,
            borderRadius: "100px",
          }}
        />

        {activeStep !== 0 && (
          <CustomCard
            marginBottom="1rem"
            padding={{ xs: "1rem", md: "2rem" }}
            backgroundColor={(theme) => theme.palette.background.main}
            gap={2}
          >
            <Typography variant="h2" color="secondary" textAlign="center">
              Facturation
            </Typography>

            <BodyText>La facture sera émise avec ces informations :</BodyText>

            <CustomCard
              marginBottom="1rem"
              backgroundColor={(theme) => theme.palette.background.black}
            >
              <BodyText>
                <strong>{invoiceAddress.fullname}</strong>
                <br />
                {invoiceAddress.phone}
                <br />
                {invoiceAddress.line1}
                {invoiceAddress.line2}
                <br />
                {`${invoiceAddress.postal_code || invoiceAddress.postalCode} ${
                  invoiceAddress.city
                }`}
                <br />
                {invoiceAddress.region} {invoiceAddress.country}
                <br />
              </BodyText>
            </CustomCard>
          </CustomCard>
        )}
        {activeStep === 2 && (
          <CustomCard
            padding={{ xs: "1rem", md: "2rem" }}
            backgroundColor={(theme) => theme.palette.background.main}
            marginBottom="1rem"
          >
            <Typography variant="h2" color="secondary" textAlign="center">
              Moyen de paiement
            </Typography>

            <Stack width="100%" maxWidth="400px" alignSelf="center">
              {!!paymentMethod.sepa_debit && (
                <CustomCard
                  backgroundColor={(theme) => theme.palette.background.black}
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
                        {paymentMethod.sepa_debit.country}** **** **** **** **
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
                  backgroundColor={(theme) => theme.palette.background.black}
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
        )}

        <Stack sx={{ flexDirection: { xs: "column", md: "row" } }} gap={2}>
          <Stack
            sx={{
              // width: "50%",
              flexGrow: 1,
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

          <PriceDetails items={order.items} order={order} />
        </Stack>

        {activeStep === 2 && (
          <PillButton
            margin={{ xs: "1rem 0", md: "4rem 0" }}
            endIcon={<EastIcon />}
            onClick={handleRedirectCheckout}
          >
            Payer et finaliser la commande
          </PillButton>
        )}
      </CenteredMaxWidthContainer>
    </Stack>
  )
}
