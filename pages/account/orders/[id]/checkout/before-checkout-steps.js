import { useRouter } from "next/router"
import { useContext } from "react"
import BeforeCheckoutSteps_Main from "../../../../../components/Main/Account/BeforeCheckoutSteps_Main"
import AccountLayout from "../../../../../components/Layouts/AccountLayout"
import Custom401_Main from "../../../../../components/Main/Errors/Custom401_Main"
import Login_Main from "../../../../../components/Main/Login_Main"
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
  ogImg: "/medias/ogimg.jpg",
}

export default function BeforeCheckoutStepsPage() {
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
        <AccountLayout title="Finalisez votre commande">
          <BeforeCheckoutSteps_Main orderId={orderId} />
        </AccountLayout>
      )}
    </PagesLayout>
  )
}
