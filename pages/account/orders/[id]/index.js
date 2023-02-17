import { useRouter } from "next/router"
import { useContext } from "react"
import Order_Main from "../../../../components/Main/Account/Order_Main"
import AccountLayout from "../../../../components/Layouts/AccountLayout"
import Custom401_Main from "../../../../components/Main/Errors/Custom401_Main"
import Login_Main from "../../../../components/Main/Login_Main"
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
  ogImg: "/medias/ogimg.jpg",
}

export default function OrderPage() {
  // Check if user has grant to access that page
  const { user } = useContext(UserContext)

  const router = useRouter()

  const orderId = router.query.id

  return (
    <PagesLayout head={head}>
      {/* UNLOGGED */}
      {!user && <Login_Main />}

      {/* WRONG CREDENTIALS */}
      {!!user && user.type !== USERTYPES.CLIENT && <Custom401_Main />}

      {/* GOOD CREDENTIALS */}
      {!!user && user.type === USERTYPES.CLIENT && (
        <AccountLayout>
          <Order_Main orderId={orderId} />
        </AccountLayout>
      )}
    </PagesLayout>
  )
}
