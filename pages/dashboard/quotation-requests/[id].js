import PagesLayout from "../../../components/Layouts/PagesLayout"
import Login_Main from "../../../components/Main/Login_Main"
import Redirect from "../../../components/Helpers/redirect"
import { useContext } from "react"
import { UserContext } from "../../../contexts/UserContext"
import { USERTYPES } from "../../../enums/userTypes"
import { useRouter } from "next/router"
import QuotationRequest_Main from "../../../components/Main/QuotationRequest_Main"
import DashboardLayout from "../../../components/Layouts/DashboardLayout"

const head = {
  // Main meta tags
  title: "Demande de devis",
  description: "Vidéaste et Développeur Web : disponible dans toute la France.",
  // SEO helpers
  follow: false,
  keywords:
    "Filmmaker, Filmmaking, Videomaker, editor, content creator, wedding filmmaker, belgium, advertising, corporate videos, corporate filmmaking",
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

export default function QuotationRequestPage() {
  // Check if user has grant to access that page
  const { user } = useContext(UserContext)
  const router = useRouter()
  const id = router.query.id

  // If user is logged in but not as an admin, the user is redirected to his/her account page
  if (!!user && user.type !== USERTYPES.ADMIN)
    return <Redirect target="/account" />

  return (
    <PagesLayout head={head}>
      {!user && <Login_Main />}

      {!!user && user.type === USERTYPES.ADMIN && (
        <DashboardLayout title="Demande de devis">
          <QuotationRequest_Main id={id} />
        </DashboardLayout>
      )}
    </PagesLayout>
  )
}
