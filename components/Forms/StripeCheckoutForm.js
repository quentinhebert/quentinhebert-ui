import { Stack } from "@mui/material"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import apiCall from "../../services/apiCalls/apiCall"
import { getNextPaymentDetails } from "../../services/orders"
import { formatPaymentErrors } from "../../services/stripe-utils"
import PillButton from "../Buttons/pill-button"
import CustomCard from "../Cards/custom-card"
import PleaseWait from "../Helpers/please-wait"
import AlertInfo from "../Other/alert-info"
import MediumTitle from "../Titles/medium-title"
import CustomForm from "./custom-form"

export default function StripeCheckoutForm({ orderId, clientSecret }) {
  const stripe = useStripe()
  const elements = useElements()

  const router = useRouter()

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  const initalAlert = {
    show: false,
    severity: "error",
    title: "",
    text: "",
  }
  const [showAlert, setShowAlert] = useState(initalAlert)

  const fetchOrder = async () => {
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

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    event.preventDefault()
    if (!stripe || !elements) return

    // Hide the previous alert if is was displayed
    setShowAlert(initalAlert)

    setProcessing(true)
    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    })
    setProcessing(false)

    if (result.error) {
      const formattedError = formatPaymentErrors(result.error)
      setShowAlert({
        ...showAlert,
        show: true,
        title: formattedError.title,
        text: formattedError.message,
      })
      return
    } else {
      if (result.paymentIntent.status === "succeeded")
        return router.push(`/account/orders/${orderId}/checkout/success`)

      if (result.paymentIntent.status === "processing")
        return router.push(`/account/orders/${orderId}/checkout/processing`)
    }
  }

  const handleCancel = async () => {
    const res = await apiCall.orders.cancelPaymentIntent({
      orderId,
      clientSecret,
    })
    if (res && res.ok) {
      alert("Abandon réussi, vous allez être redirigé")
      // Go back to order page
      router.push(`/account/orders/${orderId}`)
    } else alert("Problème")
  }

  // TODO: factorize that shit + check from payments not invoices
  const amountToPay = order ? getNextPaymentDetails({ order }).amount / 100 : 0

  return (
    <Stack margin="100px 0" className="flex-center">
      <Stack>
        {loading && <PleaseWait />}
        {order && (
          <CustomCard>
            <CustomForm onSubmit={handleSubmit}>
              <MediumTitle>Payer {amountToPay}€</MediumTitle>
              {showAlert.show && (
                <Stack textAlign="left" maxWidth="300px" width="100%">
                  <AlertInfo content={showAlert} />
                </Stack>
              )}
              <PaymentElement id="payment-element" />
              <Stack className="row gap-10" marginTop={2}>
                <PillButton
                  disabled={!stripe}
                  onClick={handleCancel}
                  background="transparent"
                  color={(theme) => theme.palette.text.secondary}
                  border={(theme) =>
                    `1px solid ${theme.palette.secondary.main}`
                  }
                >
                  Annuler
                </PillButton>
                <PillButton type="submit" disabled={!stripe || processing}>
                  {processing ? "Patientez" : "Payer"}
                </PillButton>
              </Stack>
            </CustomForm>
          </CustomCard>
        )}
      </Stack>
    </Stack>
  )
}
