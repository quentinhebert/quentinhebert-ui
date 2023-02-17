import DashboardIndex_Main from "../../components/Main/Dashboard/DashboardIndex_Main"
import PagesLayout from "../../components/Layouts/PagesLayout"
import Redirect from "../../components/Helpers/redirect"
import Login_Main from "../../components/Main/Login_Main"
import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import { USERTYPES } from "../../enums/userTypes"
import DashboardLayout from "../../components/Layouts/DashboardLayout"

const head = {
  // Main meta tags
  title: "Dashboard",
  description: "Retrouvez toutes vos missions, prospects, factures...",
  // SEO helpers
  follow: false,
  keywords:
    "Filmmaker, Filmmaking, Videomaker, editor, content creator, wedding filmmaker, belgium, advertising, corporate videos, corporate filmmaking",
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.jpg",
}

export default function CreateQuotationPage() {
  // Check if user has grant to access that page
  const { user } = useContext(UserContext)

  // If user is logged in but not as an admin, the user is redirected to his/her account page
  if (!!user && user.type !== USERTYPES.ADMIN)
    return <Redirect target="/account" />

  return (
    <PagesLayout head={head}>
      {!user && <Login_Main />}

      {!!user && user.type === USERTYPES.ADMIN && (
        <DashboardLayout title="Dashboard">
          <DashboardIndex_Main />
        </DashboardLayout>
      )}
    </PagesLayout>
  )
}
