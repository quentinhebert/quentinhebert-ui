import Custom404Layout from "../components/Layouts/error/Custom404Layout"
import PagesLayout from "../components/Layouts/PagesLayout"

const head = {
  // Main meta tags
  title: "404 | Page inexistante",
  description: "Erreur 404 : la page demandée n'estiste pas",
  // SEO helpers
  follow: false,
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

export default function Custom404Page() {
  return (
    <PagesLayout head={head}>
      <Custom404Layout />
    </PagesLayout>
  )
}
