import { useRouter } from "next/router"
import { useContext } from "react"
import OrderInformationLayout from "../../../../components/Layouts/account/orders/OrderInformationLayout"
import Custom401Layout from "../../../../components/Layouts/error/Custom401Layout"
import LoginLayout from "../../../../components/Layouts/LoginLayout"
import PagesLayout from "../../../../components/Layouts/PagesLayout"
import { UserContext } from "../../../../contexts/UserContext"
import { USERTYPES } from "../../../../enums/userTypes"

const head = {
  // Main meta tags
  title: "Commande",
  description:
    "quentinhebert.com : toutes les informations de votre commande !",
  // SEO helpers
  follow: false,
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

export default function OrderInformationPage() {
  // Check if user has grant to access that page
  const { user } = useContext(UserContext)

  const router = useRouter()

  const orderId = router.query.id

  return (
    <PagesLayout head={head}>
      {!user && <LoginLayout />}
      {!!user && user.type === USERTYPES.CLIENT ? (
        <OrderInformationLayout orderId={orderId} />
      ) : (
        <Custom401Layout />
      )}
    </PagesLayout>
  )
}
