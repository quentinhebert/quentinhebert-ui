import Custom401Layout from "../components/Layouts/error/Custom401Layout"
import PagesLayout from "../components/Layouts/PagesLayout"

const head = {
  // Main meta tags
  title: "401 | Accès non autorisé",
  description: "Erreur 401 : l'accès n'est pas autorisé",
  // SEO helpers
  follow: false,
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

export default function Custom401Page() {
  return (
    <PagesLayout head={head}>
      <Custom401Layout />
    </PagesLayout>
  )
}
