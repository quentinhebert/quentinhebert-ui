import PagesLayout from "../../../components/Layouts/PagesLayout"
import Redirect from "../../../components/Helpers/redirect"
import Login_Main from "../../../components/Main/Login_Main"
import { useContext } from "react"
import { UserContext } from "../../../contexts/UserContext"
import { USERTYPES } from "../../../enums/userTypes"
import DashboardLayout from "../../../components/Layouts/DashboardLayout"
import NewInvoice_Main from "../../../components/Main/Invoices/NewInvoice_Main"

const head = {
  // Main meta tags
  title: "Nouvelle facture",
  description:
    "Choisissez si vous partez de zéro ou d'un devis pour créer la nouvelle facture.",
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
        <DashboardLayout title="Nouvelle facture">
          <NewInvoice_Main />
        </DashboardLayout>
      )}
    </PagesLayout>
  )
}
