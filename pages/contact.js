import ContactLayout from "../components/Layouts/contact/ContactLayout"
import PageRoot from "../components/ReusableComponents/page-builder/page-root"
import HtmlHead from "../components/ReusableComponents/page-builder/html-head"
import Navbar from "../components/Navigation/Navbars/navbar"
import Footer from "../components/Navigation/Footers/Footer"

function ContactPage() {
  // Main meta tags
  const title = "Contact"
  const description =
    "Contactez-moi si vous avez un projet et que vous souhaitez collaborer !"

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

      <ContactLayout />

      <Footer />
    </PageRoot>
  )
}

export default ContactPage
