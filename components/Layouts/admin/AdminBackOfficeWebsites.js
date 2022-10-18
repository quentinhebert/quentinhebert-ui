import { Box, Stack } from "@mui/material"
import PageTitle from "../../ReusableComponents/titles/page-title"
import Breadcrumbs from "../../ReusableComponents/navigation/breadcrumbs"
import OneActionCardsGrid from "../../ReusableComponents/cards/one-action-cards-grid"
import { Icon } from "react-icons-kit"
import { browser } from "react-icons-kit/ikons/browser"
import { videoCamera } from "react-icons-kit/icomoon/videoCamera"
import { slideshow } from "react-icons-kit/ikons/slideshow"

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
    button: { text: "Gérer", href: "/admin/back-office/websites" },
  },
]

export default function AdminBackOfficeWebsites(props) {
  const {} = props

  return (
    <Stack
      flexGrow={1}
      direction="column"
      gap={2}
      padding={4}
      paddingTop={"7rem"}
      paddingBottom={"7rem"}
    >
      <Box
        position="fixed"
        width="100%"
        height="100%"
        zIndex={0}
        sx={{
          backgroundImage: "url(/medias/lines.jpg)",
          backgroundSize: "cover",
        }}
      />
      <PageTitle zIndex={1} text="Back-Office" />
      <Breadcrumbs panel="admin" />

      <Stack zIndex={0}>
        <OneActionCardsGrid cards={CARDS} />
      </Stack>
    </Stack>
  )
}
