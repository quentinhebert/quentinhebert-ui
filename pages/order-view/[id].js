import OrderView_Main from "../../components/Main/Orders/OrderView_Main"
import PagesLayout from "../../components/Layouts/PagesLayout"

const head = {
  // Main meta tags
  title: "Votre commande",
  description: "Récapitulatif de commande",
  // SEO helpers
  follow: false,
  keywords:
    "Filmmaker, Filmmaking, Videomaker, editor, content creator, wedding filmmaker, belgium, advertising, corporate videos, corporate filmmaking",
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.jpg",
}

export default function OrderViewPage() {
  return (
    <PagesLayout head={head}>
      <OrderView_Main />
    </PagesLayout>
  )
}
