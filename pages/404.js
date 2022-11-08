import PagesLayout from "../components/Layouts/PagesLayout"
import Custom404_Main from "../components/Main/Errors/Custom404_Main"

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
      <Custom404_Main />
    </PagesLayout>
  )
}
