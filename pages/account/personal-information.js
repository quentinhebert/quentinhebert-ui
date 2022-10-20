import React, { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import LoginLayout from "../../components/Layouts/LoginLayout"
import ChangePersonalInformationLayout from "../../components/Layouts/account/ChangePersonalInformationLayout"
import PagesLayout from "../../components/Layouts/PagesLayout"

const head = {
  // Main meta tags
  title: "Mon compte | Mes informations personnelles",
  description: "Modifiez vos informations personnelles",
  // SEO helpers
  follow: false, // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

function PersonalInformationPage() {
  // Check if user has grant to access that page
  const { user, setUser } = useContext(UserContext)

  return (
    <PagesLayout head={head}>
      {!user ? (
        <LoginLayout />
      ) : (
        <ChangePersonalInformationLayout user={user} setUser={setUser} />
      )}
    </PagesLayout>
  )
}

export default PersonalInformationPage
