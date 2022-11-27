import QuotationView_Main from "../../components/Main/Quotations/QuotationView_Main"
import PagesLayout from "../../components/Layouts/PagesLayout"

const head = {
  // Main meta tags
  title: "Devis",
  description: "Visualisez le brouillon du devis",
  // SEO helpers
  follow: false,
  keywords:
    "Filmmaker, Filmmaking, Videomaker, editor, content creator, wedding filmmaker, belgium, advertising, corporate videos, corporate filmmaking",
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

export default function CreateQuotationPage() {
  return (
    <PagesLayout head={head}>
      <QuotationView_Main />
    </PagesLayout>
  )
}
