import { Stack } from "@mui/material"
import { useRouter } from "next/router"
import PagesLayout from "../../../../../components/Layouts/PagesLayout"
import PillButton from "../../../../../components/Buttons/pill-button"
import CenteredMaxWidthContainer from "../../../../../components/Containers/centered-max-width-container"
import BodyText from "../../../../../components/Text/body-text"
import PageTitle from "../../../../../components/Titles/page-title"

const head = {
  // Main meta tags
  title: "Paiement en attente !",
  description: "quentinhebert.com : votre paiement est en attente !",
  // SEO helpers
  follow: false,
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

export default function ProcessingPaymentPage() {
  const router = useRouter()
  const orderId = router.query.id

  return (
    <PagesLayout head={head}>
      <Stack
        flexGrow={1}
        className="flex-center"
        minHeight="600px"
        height="100vh"
      >
        <CenteredMaxWidthContainer>
          <Stack textAlign="center" gap={4}>
            <PageTitle
              text="Votre paiement est en cours de traitement..."
              textAlign="center"
            />
            <BodyText textAlign="center">
              Votre moyen de paiement a bien été authentifié. Le paiement de
              votre commande est en cours de traitement. Veuillez actualiser la
              page page de votre commande pour suivre l'avancée de la réception
              de votre paiement.
            </BodyText>
            <PillButton
              onClick={() => router.push(`/account/orders/${orderId}`)}
            >
              Suivre ma commande
            </PillButton>
          </Stack>
        </CenteredMaxWidthContainer>
      </Stack>
    </PagesLayout>
  )
}
