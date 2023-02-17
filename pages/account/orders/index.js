import { useContext } from "react"
import Orders_Main from "../../../components/Main/Account/Orders_Main"
import AccountLayout from "../../../components/Layouts/AccountLayout"
import Custom401_Main from "../../../components/Main/Errors/Custom401_Main"
import Login_Main from "../../../components/Main/Login_Main"
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
  ogImg: "/medias/ogimg.jpg",
}

export default function OrdersPage() {
  // Check if user has grant to access that page
  const { user } = useContext(UserContext)

  return (
    <PagesLayout head={head}>
      {/* UNLOGGED */}
      {!user && <Login_Main />}

      {/* WRONG CREDENTIALS */}
      {!!user && user.type !== USERTYPES.CLIENT && <Custom401_Main />}

      {/* GOOD CREDENTIALS */}
      {!!user && user.type === USERTYPES.CLIENT && (
        <AccountLayout title="Mes commandes">
          <Orders_Main />
        </AccountLayout>
      )}
    </PagesLayout>
  )
}
