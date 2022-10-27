import { Box, Grid, Stack } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../../../../contexts/AppContext"
import { UserContext } from "../../../../../contexts/UserContext"
import apiCall from "../../../../../services/apiCalls/apiCall"
import CenteredMaxWidthContainer from "../../../../ReusableComponents/containers/centered-max-width-container"
import { useRouter } from "next/router"
import PillButton from "../../../../ReusableComponents/buttons/pill-button"
import PageTitle from "../../../../ReusableComponents/titles/page-title"

export default function SelectPaymentMethod({ orderId }) {
  const { user } = useContext(UserContext)
  const { setSnackMessage, setSnackSeverity } = useContext(AppContext)

  const router = useRouter()

  // HANDLERS
  const handleRedirectCheckout = async () => {
    const res = await apiCall.orders.getCheckoutClientSecret({ id: orderId })
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