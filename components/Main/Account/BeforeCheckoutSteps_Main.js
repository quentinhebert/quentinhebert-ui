import { Box, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import Custom404_Main from "../../Main/Errors/Custom404_Main"
import AlertInfo from "../../Other/alert-info"
import SelectAddressSection from "../../Sections/Account/Orders/select-address-section"
import SelectPaymentMethodSection from "../../Sections/Account/Orders/select-payment-method-section"
import PleaseWait from "../../Helpers/please-wait"
import CustomStepper from "../../Navigation/custom-stepper"
import CenteredMaxWidthContainer from "../../Containers/centered-max-width-container"
import Custom401_Main from "../Errors/Custom401_Main"
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded"
import BodyText from "../../Text/body-text"
import SmallTitle from "../../Titles/small-title"
import DoneRoundedIcon from "@mui/icons-material/DoneRounded"
import PriceDetails from "../../Sections/Account/Orders/price-details"
import {
  getNextPaymentDetails,
  getPaymentFractionsDetails,
} from "../../../services/orders"

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
    <Stack gap={10} padding="2rem 0">
      {loading && <PleaseWait />}

      {/********** PRICE & ACTION DETAILS **********/}
      <CenteredMaxWidthContainer>
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
            {console.log("paymentFractions", paymentFractions)}
            {paymentFractions.length > 0 &&
              paymentFractions.map((f, key) => {
                const isNextPayment = key === nextPayment.index
                return f.paid ? (
                  <ActionText key={key}>
                    <Box color="grey" component="span">
                      {f.amount / 100}€ TTC ({f.label} {f.percent} payé)
                    </Box>
                  </ActionText>
                ) : (
                  <Stack paddingLeft={isNextPayment ? 2 : 0}>
                    {isNextPayment && (
                      <ActionTitle>Je règle maintenant</ActionTitle>
                    )}
                    <ActionText key={key}>
                      <Box
                        color={(theme) =>
                          isNextPayment ? theme.palette.text.secondary : "grey"
                        }
                        component="span"
                        fontSize="1rem"
                      >
                        {f.amount / 100}€ TTC{" "}
                        <Box component="span" color="grey">
                          {paymentFractions.length === 1
                            ? null
                            : `(${f.label} ${f.percent})`}
                        </Box>
                      </Box>
                    </ActionText>
                  </Stack>
                )
              })}
          </Stack>

          <PriceDetails items={order.items} order={order} />
        </Stack>
      </CenteredMaxWidthContainer>

      <Stack gap={8}>
        {/********** STEPPER **********/}
        <CustomStepper
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />

        {/********** FORMS **********/}
        {activeStep === 0 && (
          <>
            <SelectAddressSection
              defaultId={invoiceAddress?.id}
              handleNext={handleNext}
              setParentAddress={setInvoiceAddress}
            />
          </>
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
    </Stack>
  )
}
