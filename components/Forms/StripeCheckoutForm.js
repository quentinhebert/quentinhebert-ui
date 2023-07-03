import { Stack } from "@mui/material"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import apiCall from "../../services/apiCalls/apiCall"
import { getNextPaymentDetails } from "../../services/orders"
import { formatPaymentErrors } from "../../services/stripe-utils"
import PillButton from "../Buttons/pill-button"
import CustomCard from "../Cards/custom-card"
import PleaseWait from "../Helpers/please-wait"
import AlertInfo from "../Other/alert-info"
import MediumTitle from "../Titles/medium-title"
import CustomForm from "./custom-form"
import { formatPrice } from "../../services/utils"
import { UserContext } from "../../contexts/UserContext"
import { defaultConfig } from "../../config/defaultConfig"

export default function StripeCheckoutForm({ orderId, clientSecret }) {
  const stripe = useStripe()
  const elements = useElements()

  const router = useRouter()
  const { user } = useContext(UserContext)

  const [client, setClient] = useState(null)
  const fetchClient = async () => {
    const res = await apiCall.clients.get(user)
    if (res && res.ok) {
      const jsonRes = await res.json()
      setClient(jsonRes)
    }
  }
  useEffect(() => {
    if (!!user) fetchClient()
  }, [user])

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)

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

    return async () => await handleCancel()
  }, [])

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    if (!!event) event.preventDefault()
    if (!stripe || !elements) return

    // Hide the previous alert if is was displayed
    setShowAlert(initalAlert)

    setProcessing(true)
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${defaultConfig.webclientUrl}/account/orders/${orderId}/checkout/success`,
      },
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
      if (result.paymentIntent.status === "succeeded") {
        return router.push(`/account/orders/${orderId}/checkout/success`)
      }

      if (result.paymentIntent.status === "processing") {
        return router.push(`/account/orders/${orderId}/checkout/processing`)
      }
    }
  }

  const handleCancel = async () => {
    const res = await apiCall.orders.cancelPaymentIntent({
      orderId,
      clientSecret,
    })
    if (res && res.ok) {
      // Go back to order page
      router.push(`/account/orders/${orderId}/checkout/before-checkout-steps`)
    }
  }

  const amountToPay = order ? getNextPaymentDetails({ order })?.amount : 0

  return (
    <Stack margin="100px 0" className="flex-center">
      <Stack>
        {loading && <PleaseWait />}
        {order && (
          <CustomCard
            boxShadow={(theme) => `0 0 50px ${theme.palette.secondary.main}`}
          >
            <CustomForm onSubmit={handleSubmit}>
              <MediumTitle>Payer {formatPrice(amountToPay)}€</MediumTitle>
              {showAlert.show && (
                <Stack textAlign="left" maxWidth="300px" width="100%">
                  <AlertInfo content={showAlert} />
                </Stack>
              )}
              <PaymentElement
                id="payment-element"
                className="form-control"
                options={{
                  defaultValues: {
                    billingDetails: {
                      name: user.firstname + " " + user.lastname || "",
                      email: user.email || "",
                      address: {
                        line1: client?.line1 || "",
                        line2: client?.line2 || "",
                        postal_code: client?.postal_code || "",
                        city: client?.city || "",
                        country: "FRANCE",
                      },
                    },
                  },
                }}
              />
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
