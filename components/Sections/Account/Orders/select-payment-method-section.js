import { Stack, Typography } from "@mui/material"
import apiCall from "../../../../services/apiCalls/apiCall"
import { useRouter } from "next/router"
import CenteredMaxWidthContainer from "../../../Containers/centered-max-width-container"
import PageTitle from "../../../Titles/page-title"
import PillButton from "../../../Buttons/pill-button"

export default function SelectPaymentMethodSection({
  orderId,
  invoiceAddress,
  deliveryAddress,
}) {
  const router = useRouter()

  // HANDLERS
  const handleRedirectCheckout = async () => {
    const res = await apiCall.orders.getCheckoutClientSecret({
      order: { id: orderId },
      invoiceAddress,
      deliveryAddress,
    })
    if (res && res.ok) {
      const jsonRes = await res.json()
      router.push(
        `/account/orders/${orderId}/checkout/${jsonRes.client_secret}`
      )
    }
  }

  return (
    <CenteredMaxWidthContainer gap={4}>
      <Typography variant="h2" color="secondary" textAlign="center">
        Moyen de paiement
      </Typography>
      <Stack className="flex-center gap-10">
        <PillButton onClick={handleRedirectCheckout}>
          Carte ou virement bancaire
        </PillButton>
        {/* <PillButton>Paypal</PillButton> */}
      </Stack>
    </CenteredMaxWidthContainer>
  )
}
