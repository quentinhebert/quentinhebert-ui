import { Stack } from "@mui/material"
import OneActionCardsGrid from "../../ReusableComponents/cards/one-action-cards-grid"
import { Icon } from "react-icons-kit"
import { browser } from "react-icons-kit/ikons/browser"
import { slideshow } from "react-icons-kit/ikons/slideshow"
import FixedBackground from "../../ReusableComponents/backgrounds/fixed-background"
import AdminPagesLayout from "../AdminPagesLayout"

const CARDS = [
  {
    title: "Mes sites web",
    icon: <Icon icon={browser} size={50} />,
    description:
      "Ajoutez, modifiez et supprimez des sites web de votre portfolio web.",
    button: {
      text: "Gérer",
      href: "/admin/back-office/websites/manage-websites",
    },
  },
  {
    title: "Diapositives",
    icon: <Icon icon={slideshow} size={50} />,
    description:
      "Captez l'attention de vos visiteurs grâce à vos diapositives textuelles !",
    button: {
      text: "Gérer",
      href: "/admin/back-office/websites/manage-slides",
    },
  },
]

export default function AdminBackOfficeWebsites(props) {
  const {} = props

  return (
    <AdminPagesLayout title="Web">
      <FixedBackground url="url(/medias/lines.jpg)" />

      <Stack zIndex={0}>
        <OneActionCardsGrid cards={CARDS} />
      </Stack>
    </AdminPagesLayout>
  )
}
