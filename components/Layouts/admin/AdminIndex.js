import { Box, Stack } from "@mui/material"
import PageTitle from "../../ReusableComponents/titles/page-title"
import OneActionCardsGrid from "../../ReusableComponents/cards/one-action-cards-grid"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import SupervisedUserCircleRoundedIcon from "@mui/icons-material/SupervisedUserCircleRounded"
import DesktopMacOutlinedIcon from "@mui/icons-material/DesktopMacOutlined"
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined"

const CARDS = [
  {
    title: "Informations",
    icon: <InfoOutlinedIcon sx={{ marginRight: ".5rem", fontSize: "5rem" }} />,
    description:
      "Modifiez les informations de votre site (descriptions, footer, barre de navigation...).",
    button: { text: "Accéder", href: "/admin/manage-website-informations" },
  },
  {
    title: "Back-Office",
    icon: (
      <DesktopMacOutlinedIcon sx={{ marginRight: ".5rem", fontSize: "5rem" }} />
    ),
    description: "Ajoutez, modifiez et supprimez du contenu de votre site.",
    button: { text: "Accéder", href: "/admin/back-office" },
  },
  {
    title: "Utilisateurs",
    icon: (
      <SupervisedUserCircleRoundedIcon
        sx={{ marginRight: ".5rem", fontSize: "5rem" }}
      />
    ),
    description:
      "Ajoutez, modifiez et supprimez ou ou des utilisateurs de votre site.",
    button: { text: "Gérer", href: "/admin/manage-users" },
  },
  {
    title: "Fichiers",
    icon: (
      <FolderOpenOutlinedIcon sx={{ marginRight: ".5rem", fontSize: "5rem" }} />
    ),
    description:
      "Ajoutez, modifiez et supprimez ou ou des utilisateurs de votre site.",
    button: { text: "Gérer", href: "/admin/manage-files" },
  },
]

export default function AdminIndex() {
  return (
    <Stack
      flexGrow={1}
      direction="column"
      gap={4}
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
      <PageTitle zIndex={1} text="Panneau administrateur" />

      <Stack zIndex={0}>
        <OneActionCardsGrid cards={CARDS} />
      </Stack>
    </Stack>
  )
}
