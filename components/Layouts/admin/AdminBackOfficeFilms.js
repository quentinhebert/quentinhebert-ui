import { Box, Stack } from "@mui/material"
import PageTitle from "../../ReusableComponents/titles/page-title"
import Breadcrumbs from "../../ReusableComponents/navigation/breadcrumbs"
import OneActionCardsGrid from "../../ReusableComponents/cards/one-action-cards-grid"
import SuperIcon from "supercons"
import { Multimedia, Camera } from "grommet-icons"

const CARDS = [
  {
    title: "Mes films",
    icon: <Multimedia color="#fff" size="large" />,
    description:
      "Modifiez les informations de votre site (descriptions, footer, barre de navigation...).",
    button: { text: "Gérer", href: "/admin/back-office/films/manage-films" },
  },
  {
    title: "Mon matériel",
    icon: <Camera color="#fff" size="large" />,
    description: "Ajoutez, modifiez et supprimez du contenu de votre site.",
    button: { text: "Gérer", href: "/admin/back-office/websites" },
  },
]

export default function AdminBackOfficeFilms(props) {
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
