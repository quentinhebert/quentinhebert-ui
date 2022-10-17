import React, { useContext } from "react"
import Footer from "../../components/Navigation/Footers/Footer"
import { USERTYPES } from "../../enums/userTypes"
import { UserContext } from "../../contexts/UserContext"
import AdminIndex from "../../components/Layouts/admin/AdminIndex"
import LoginLayout from "../../components/Layouts/LoginLayout"
import HtmlHead from "../../components/ReusableComponents/page-builder/html-head"
import PageRoot from "../../components/ReusableComponents/page-builder/page-root"
import { useRouter } from "next/router"
import prepareProps from "../../services/fetchers"

export default function AdminLoginPage({ footer }) {
  // Main meta tags
  const title = "Admin"
  const description = "Page d'administration du site"

  // SEO helpers
  const follow = false

  // OpenGraph additional tags (sharing)
  const type = "website"
  const ogImg = "/medias/ogimg.png"

  // Check if user has grant to access that page
  const { user } = useContext(UserContext)

  // If user is logged in but not as an admin, the user is redirected to his/her account page
  const router = useRouter()
  if (!!user && user.type !== USERTYPES.ADMIN) router.push("/account")

  return (
    <PageRoot>
      <HtmlHead
        title={title}
        description={description}
        follow={follow}
        type={type}
        ogImg={ogImg}
      />

      {!!user && user.type === USERTYPES.ADMIN ? (
        <AdminIndex />
      ) : (
        <LoginLayout />
      )}

      <Footer staticData={footer} />
    </PageRoot>
  )
}

export async function getStaticProps() {
  return await prepareProps(["footer"])
}
