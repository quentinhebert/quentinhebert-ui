import { useRouter } from "next/router"
import { useContext } from "react"
import BeforeCheckoutStepsLayout from "../../../../../components/Layouts/account/orders/BeforeCheckoutStepsLayout"
import Custom401Layout from "../../../../../components/Layouts/error/Custom401Layout"
import LoginLayout from "../../../../../components/Layouts/LoginLayout"
import PagesLayout from "../../../../../components/Layouts/PagesLayout"
import { UserContext } from "../../../../../contexts/UserContext"
import { USERTYPES } from "../../../../../enums/userTypes"

const head = {
  // Main meta tags
  title: "Passer la commande",
  description:
    "quentinhebert.com : encore quelques étapes avant de finaliser la commande",
  // SEO helpers
  follow: false,
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

export default function BeforeCheckoutStepsPage() {
  // Check if user has grant to access that page
  const { user } = useContext(UserContext)

  const router = useRouter()

  const orderId = router.query.id

  return (
    <PagesLayout head={head}>
      {!user && <LoginLayout />}
      {!!user && user.type === USERTYPES.CLIENT ? (
        <BeforeCheckoutStepsLayout orderId={orderId} />
      ) : (
        <Custom401Layout />
      )}
    </PagesLayout>
  )
}
