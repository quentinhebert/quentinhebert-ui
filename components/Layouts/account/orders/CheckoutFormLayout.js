import { Stack, Step, StepButton, Stepper } from "@mui/material"
import { useEffect, useState } from "react"
import apiCall from "../../../../services/apiCalls/apiCall"
import PleaseWait from "../../../ReusableComponents/helpers/please-wait"
import AccountPagesLayout from "../../AccountPagesLayout"
import Custom404Layout from "../../error/Custom404Layout"
import { useRouter } from "next/router"
import CustomStepper from "../../../ReusableComponents/navigation/custom-stepper"
import AlertInfo from "../../../Other/alert-info"
import SelectAddress from "./CheckoutFormSteps/SelectAddress"
import CenteredMaxWidthContainer from "../../../ReusableComponents/containers/centered-max-width-container"
import SelectPaymentMethod from "./CheckoutFormSteps/SelectPaymentMethod"

const steps = [
  "Adresse de facturation",
  "Adresse de livraison",
  "Moyen de paiement",
]

export default function CheckoutFormLayout({ orderId }) {
  const initialOrder = {
    id: null,
    created_at: null,
    state: null,
    client_id: null,
    total_price: null,
    items: [],
  }
  const [order, setOrder] = useState(initialOrder)
  const [loading, setLoading] = useState(false)
  const [invoiceAddress, setInvoiceAddress] = useState(null)
  const [deliveryAddress, setDeliveryAddress] = useState(null)

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
    <AccountPagesLayout title={`Finalisez votre commande`}>
      {loading && <PleaseWait />}

      <Stack gap={4}>
        <CustomStepper
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
        {activeStep === 0 && (
          <>
            <CenteredMaxWidthContainer>
              <AlertInfo
                content={{
                  title: "Pourquoi dois-je renseigner mon adresse ?",
                  severity: "info",
                  text: "Vos informations sont nécessaires pour l'édition de la facture de votre commande.",
                }}
              />
            </CenteredMaxWidthContainer>
            <SelectAddress
              defaultId={invoiceAddress?.id}
              handleNext={handleNext}
              setParentAddress={setInvoiceAddress}
            />
          </>
        )}
        {activeStep === 1 && (
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
            <SelectAddress
              handleNext={handleNext}
              handleBack={handleBack}
              idImpossibleToDelete={invoiceAddress.id}
              setParentAddress={setDeliveryAddress}
              defaultId={deliveryAddress?.id || invoiceAddress?.id || null}
              delivery
            />
          </>
        )}
        {activeStep === 2 && <SelectPaymentMethod orderId={orderId} />}
      </Stack>
    </AccountPagesLayout>
  )
}
