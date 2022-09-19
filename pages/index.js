import IndexLayout from "../components/Layouts/IndexLayout"
import PageRoot from "../components/ReusableComponents/page-builder/page-root"
import Navbar from "../components/Navigation/Navbars/navbar"
import Footer from "../components/Navigation/Footers/Footer"
import HtmlHead from "../components/ReusableComponents/page-builder/html-head"

export default function HomePage() {
  // Main meta tags
  const title = "Freelance"
  const description =
    "Vidéaste et Développeur Web : disponible dans toute la France."

  // SEO helpers
  const follow = true
  const keywords =
    "Filmmaker, Filmmaking, Videomaker, editor, content creator, wedding filmmaker, belgium, advertising, corporate videos, corporate filmmaking"

  // OpenGraph additional tags (sharing)
  const type = "website"
  const ogImg = "/medias/ogimg.png"

  return (
    <PageRoot>
      <HtmlHead
        title={title}
        description={description}
        keywords={keywords}
        follow={follow}
        type={type}
        ogImg={ogImg}
      />
      <Navbar />

      <IndexLayout />

      <Footer />
    </PageRoot>
  )
}
