import { Stack } from "@mui/material"
import { useEffect, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import Custom404_Main from "../../Main/Errors/Custom404_Main"
import AlertInfo from "../../Other/alert-info"
import SelectAddressSection from "../../Sections/Account/Orders/select-address-section"
import SelectPaymentMethodSection from "../../Sections/Account/Orders/select-payment-method-section"
import PleaseWait from "../../Helpers/please-wait"
import CustomStepper from "../../Navigation/custom-stepper"
import CenteredMaxWidthContainer from "../../Containers/centered-max-width-container"

const steps = [
  "Adresse de facturation",
  "Adresse de livraison",
  "Moyen de paiement",
]

export default function BeforeCheckoutSteps_Main({ orderId }) {
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

  if (!order.id && !loading) return <Custom404_Main />

  return (
    <>
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
            <SelectAddressSection
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
            <SelectAddressSection
              handleNext={handleNext}
              handleBack={handleBack}
              idImpossibleToDelete={invoiceAddress.id}
              setParentAddress={setDeliveryAddress}
              defaultId={deliveryAddress?.id || invoiceAddress?.id || null}
              delivery
            />
          </>
        )}
        {activeStep === 2 && (
          <SelectPaymentMethodSection
            orderId={orderId}
            invoiceAddress={invoiceAddress}
            deliveryAddress={deliveryAddress}
          />
        )}
      </Stack>
    </>
  )
}
