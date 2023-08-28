import { Stack } from "@mui/material"
import { useRouter } from "next/router"
import PillButton from "../../../../../components/Buttons/pill-button"
import PagesLayout from "../../../../../components/Layouts/PagesLayout"
import BodyText from "../../../../../components/Text/body-text"
import Span from "../../../../../components/Text/span"
import PageTitle from "../../../../../components/Titles/page-title"
import { useEffect, useState } from "react"
import apiCall from "../../../../../services/apiCalls/apiCall"
import PleaseWait from "../../../../../components/Helpers/please-wait"

const head = {
  // Main meta tags
  title: "Veuillez patienter...",
  description: "quentinhebert.com : veuillez patienter...",
  // SEO helpers
  follow: false,
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.jpg",
}

export default function SuccessPaymentPage() {
  const router = useRouter()
  const order = { id: router.query.id }

  const [status, setStatus] = useState(null)

  const fetchData = async () => {
    if (!order?.id) return

    const res = await apiCall.orders.getLastPaymentStatus(order)
    if (res && res.ok) {
      const jsonRes = await res.json()
      setStatus(jsonRes.status)
    }
  }

  useEffect(() => {
    fetchData()
  }, [order?.id])

  return (
    <PagesLayout head={head}>
      <Stack flexGrow={1} className="flex-center" minHeight="400px">
        {status === null ? (
          <PleaseWait />
        ) : (
          <Stack textAlign="center" gap={4}>
            <PageTitle
              textAlign="center"
              text={
                <>
                  {status === "succeeded"
                    ? "Paiement réussi"
                    : "Le paiement a échoué...."}
                  <br />
                  <Span fontSize="0.5em">
                    {status === "succeeded" ? "✅" : "❌"}
                  </Span>
                </>
              }
            />
            <BodyText textAlign="center">
              {status === "succeeded"
                ? "Merci pour votre paiement !"
                : "Réessayez de payer de nouveau."}
            </BodyText>
            <PillButton
              onClick={() =>
                status === "succeeded"
                  ? router.push("/account/orders")
                  : router.push(
                      `/account/orders/${order.id}/checkout/before-checkout-steps`
                    )
              }
            >
              {status === "succeeded" ? "Mes commandes" : "Réessayer"}
            </PillButton>
          </Stack>
        )}
      </Stack>
    </PagesLayout>
  )
}
