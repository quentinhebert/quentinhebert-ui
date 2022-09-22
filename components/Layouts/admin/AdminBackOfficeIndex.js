import { Box, Stack } from "@mui/material"
import PageTitle from "../../ReusableComponents/titles/page-title"
import OneActionCardsGrid from "../../ReusableComponents/cards/one-action-cards-grid"
import Breadcrumbs from "../../ReusableComponents/navigation/breadcrumbs"
import SuperIcon from "supercons"
import { Icon } from "react-icons-kit"
import { videoCamera } from "react-icons-kit/icomoon/videoCamera"

const CARDS = [
  {
    title: "Films",
    icon: <Icon icon={videoCamera} size={80} />,
    description:
      "Modifiez les informations de votre site (descriptions, footer, barre de navigation...).",
    button: { text: "Gérer", href: "/admin/back-office/films" },
  },
  {
    title: "Sites web",
    icon: <SuperIcon glyph="event-code" size={80} />,
    description: "Ajoutez, modifiez et supprimez du contenu de votre site.",
    button: { text: "Gérer", href: "/admin/back-office/websites" },
  },
]

export default function AdminBackOfficeIndex() {
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
