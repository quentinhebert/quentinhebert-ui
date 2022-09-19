import Custom401Layout from "../components/Layouts/error/Custom401Layout"
import Footer from "../components/Navigation/Footers/Footer"
import Navbar from "../components/Navigation/Navbars/navbar"
import HtmlHead from "../components/ReusableComponents/page-builder/html-head"
import PageRoot from "../components/ReusableComponents/page-builder/page-root"

export default function Custom401Page() {
  // Main meta tags
  const title = "401 | Accès non autorisé"
  const description = "Erreur 401 : l'accès n'est pas autorisé"

  // SEO helpers
  const follow = false

  // OpenGraph additional tags (sharing)
  const type = "website"
  const ogImg = "/medias/ogimg.png"

  return (
    <PageRoot>
      <HtmlHead
        title={title}
        description={description}
        follow={follow}
        type={type}
        ogImg={ogImg}
      />

      <Navbar />

      <Custom401Layout />

      <Footer />
    </PageRoot>
  )
}
