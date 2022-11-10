import TermsAndConditions_Main from "../components/Main/TermsAndConditions_Main"
import prepareProps from "../services/public-fetchers"
import PagesLayout from "../components/Layouts/PagesLayout"
import TextContentLayout from "../components/Layouts/TextContentLayout"

const head = {
  // Main meta tags
  title: "Conditions Générales de Vente",
  description: "Quentin Hébert (Freelance) : Conditions Générales de Vente.",
  // SEO helpers
  follow: true,
  keywords:
    "Filmmaker, Filmmaking, Videomaker, editor, content creator, wedding filmmaker, advertising, corporate videos, corporate filmmaking",
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

export default function HomePage(props) {
  const { navbar, footer, termsAndConditions } = props

  return (
    <PagesLayout head={head} navbarData={navbar} footerData={footer}>
      <TextContentLayout>
        <TermsAndConditions_Main staticData={termsAndConditions} />
      </TextContentLayout>
    </PagesLayout>
  )
}

export async function getStaticProps() {
  return await prepareProps(["navbar", "footer", "termsAndConditions"])
}
