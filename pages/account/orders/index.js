import { useRouter } from "next/router"
import { useContext } from "react"
import OrdersLayout from "../../../components/Layouts/account/orders/OrdersLayout"
import Custom401Layout from "../../../components/Layouts/error/Custom401Layout"
import LoginLayout from "../../../components/Layouts/LoginLayout"
import PagesLayout from "../../../components/Layouts/PagesLayout"
import { UserContext } from "../../../contexts/UserContext"
import { USERTYPES } from "../../../enums/userTypes"

const head = {
  // Main meta tags
  title: "Commandes",
  description: "quentinhebert.com : toutes mes commandes !",
  // SEO helpers
  follow: false,
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

export default function OrdersPage() {
  // Check if user has grant to access that page
  const { user } = useContext(UserContext)

  const router = useRouter()

  return (
    <PagesLayout head={head}>
      {!user && <LoginLayout />}
      {!!user && user.type === USERTYPES.CLIENT ? (
        <OrdersLayout />
      ) : (
        <Custom401Layout />
      )}
    </PagesLayout>
  )
}
