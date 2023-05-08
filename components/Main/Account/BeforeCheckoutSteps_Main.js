import { Box, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
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

const steps = [
  "Adresse de facturation",
  // "Adresse de livraison",
  "Moyen de paiement",
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
  const [order, setOrder] = useState(initialOrder)
  const [loading, setLoading] = useState(false)
  const [invoiceAddress, setInvoiceAddress] = useState(null)
  const [deliveryAddress, setDeliveryAddress] = useState(null)
  const [is401, setIs401] = useState(false)

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

  useEffect(() => {
    fetchOrder()
  }, [])

  const nextPayment = getNextPaymentDetails({ order })
  const paymentFractions = getPaymentFractionsDetails({ order })

  if (is401) return <Custom401_Main redirect={`/order-view/${orderId}`} />
  if (!order.id && !loading) return <Custom404_Main />

  return (
    <Stack gap={6} padding="2rem 0">
      {loading && <PleaseWait />}

      <Stack>
        {/********** STEPPER **********/}
        <CenteredMaxWidthContainer>
          <CustomCard
            backgroundColor={(theme) => theme.palette.background.main}
          >
            <CustomStepper
              steps={steps}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </CustomCard>
        </CenteredMaxWidthContainer>

        {/********** FORMS **********/}
        {activeStep === 0 && (
          <CenteredMaxWidthContainer>
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

        {activeStep === 1 && (
          <SelectPaymentMethodSection
            orderId={orderId}
            invoiceAddress={invoiceAddress}
            deliveryAddress={deliveryAddress}
          />
        )}
      </Stack>

      {/********** PRICE & ACTION DETAILS **********/}
      <CenteredMaxWidthContainer>
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
            backgroundColor={(theme) => theme.palette.background.main}
          >
            <Typography variant="h2" color="secondary" textAlign="center">
              Facturation
            </Typography>

            <BodyText>La facture sera émise avec ces informations :</BodyText>

            <CustomCard
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
                {`${invoiceAddress.postal_code} ${invoiceAddress.city}`}
                <br />
                {invoiceAddress.region} {invoiceAddress.country}
                <br />
              </BodyText>
            </CustomCard>
          </CustomCard>
        )}

        <Stack sx={{ flexDirection: { xs: "column", md: "row" } }} gap={2}>
          <Stack
            sx={{
              // width: "50%",
              flexGrow: 1,
              padding: 3,
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
                          <Span ml={1}>{f.amount / 100}€ TTC</Span>
                        </Box>
                      </ActionText>
                    </Stack>
                  )
                )
              })}
          </Stack>

          <PriceDetails items={order.items} order={order} />
        </Stack>
      </CenteredMaxWidthContainer>
    </Stack>
  )
}
