import { Stack } from "@mui/material"
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
      <PageTitle text="Moyen de paiement" textAlign="center" />
      <Stack className="flex-center gap-10">
        <PillButton onClick={handleRedirectCheckout}>
          Carte ou virement bancaire
        </PillButton>
        {/* <PillButton>Paypal</PillButton> */}
      </Stack>
    </CenteredMaxWidthContainer>
  )
}
