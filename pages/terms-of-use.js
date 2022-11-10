import TermsOfUse_Main from "../components/Main/TermsOfUse_Main"
import prepareProps from "../services/public-fetchers"
import PagesLayout from "../components/Layouts/PagesLayout"
import TextContentLayout from "../components/Layouts/TextContentLayout"

const head = {
  // Main meta tags
  title: "Conditions Générales d'Utilisation",
  description:
    "Quentin Hébert (Freelance) : Conditions Générales d'Utilisation.",
  // SEO helpers
  follow: true,
  keywords:
    "Filmmaker, Filmmaking, Videomaker, editor, content creator, wedding filmmaker, advertising, corporate videos, corporate filmmaking",
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

export default function HomePage(props) {
  const { navbar, footer, termsOfUse } = props

  return (
    <PagesLayout head={head} navbarData={navbar} footerData={footer}>
      <TextContentLayout>
        <TermsOfUse_Main staticData={termsOfUse} />
      </TextContentLayout>
    </PagesLayout>
  )
}

export async function getStaticProps() {
  return await prepareProps(["navbar", "footer", "termsOfUse"])
}
