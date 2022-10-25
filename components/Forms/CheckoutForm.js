import { Stack } from "@mui/material"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { defaultConfig } from "../../config/defaultConfig"
import apiCall from "../../services/apiCalls/apiCall"
import PillButton from "../ReusableComponents/buttons/pill-button"
import CustomCard from "../ReusableComponents/cards/custom-card"
import CustomForm from "../ReusableComponents/forms/custom-form"
import PleaseWait from "../ReusableComponents/helpers/please-wait"
import MediumTitle from "../ReusableComponents/titles/medium-title"

export default function CheckoutForm({ orderId, clientSecret }) {
  const stripe = useStripe()
  const elements = useElements()

  const router = useRouter()

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

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

    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      //   confirmParams: {
      //     return_url: `${defaultConfig.webclientUrl}/account/orders/${orderId}/checkout/success`,
      //   },
    })

    if (result.paymentIntent.status === "succeeded")
      return router.push(`/account/orders/${orderId}/checkout/success`)

    if (result.paymentIntent.status === "processing")
      return router.push(`/account/orders/${orderId}/checkout/processing`)

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message)
      alert("Problème !!! Checke la console")
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  }

  const handleCancel = async () => {
    const res = await apiCall.orders.cancelPaymentIntent({
      orderId,
      clientSecret,
    })
    if (res && res.ok) {
      alert("Abandon réussi, vous allez être redirigé")
      // Go back to order information page
      router.push(`/account/orders/${orderId}/information`)
    } else alert("Problème")
  }

  return (
    <Stack margin="100px 0" className="flex-center">
      <Stack>
        {loading && <PleaseWait />}
        {order && (
          <CustomCard>
            <CustomForm onSubmit={handleSubmit}>
              <MediumTitle>Payer {order.total_price / 100}€</MediumTitle>
              <PaymentElement id="payment-element" />
              <Stack className="row gap-10" marginTop={2}>
                <PillButton
                  disabled={!stripe}
                  onClick={handleCancel}
                  background="tarnsparent"
                  color={(theme) => theme.palette.text.secondary}
                  border={(theme) =>
                    `1px solid ${theme.palette.secondary.main}`
                  }
                >
                  Annuler
                </PillButton>
                <PillButton type="submit" disabled={!stripe}>
                  Payer
                </PillButton>
              </Stack>
            </CustomForm>
          </CustomCard>
        )}
      </Stack>
    </Stack>
  )
}
