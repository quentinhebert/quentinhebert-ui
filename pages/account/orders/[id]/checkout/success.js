import { Stack } from "@mui/material"
import { useRouter } from "next/router"
import PagesLayout from "../../../../../components/Layouts/PagesLayout"
import PillButton from "../../../../../components/ReusableComponents/buttons/pill-button"
import BodyText from "../../../../../components/ReusableComponents/text/body-text"
import PageTitle from "../../../../../components/ReusableComponents/titles/page-title"

const head = {
  // Main meta tags
  title: "Paiement réussi !",
  description: "quentinhebert.com : merci pour votre commande !",
  // SEO helpers
  follow: false,
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

export default function SuccessPaymentPage() {
  const router = useRouter()

  return (
    <PagesLayout head={head}>
      <Stack flexGrow={1} className="flex-center">
        <Stack textAlign="center" gap={4}>
          <PageTitle text="Paiement réussi ✅" />
          <BodyText textAlign="center">Merci pour votre paiement !</BodyText>
          <PillButton onClick={() => router.push("/account/orders")}>
            Mes commandes
          </PillButton>
        </Stack>
      </Stack>
    </PagesLayout>
  )
}
