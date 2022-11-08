import { Stack } from "@mui/material"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import SupervisedUserCircleRoundedIcon from "@mui/icons-material/SupervisedUserCircleRounded"
import DesktopMacOutlinedIcon from "@mui/icons-material/DesktopMacOutlined"
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined"
import OneActionCardsGrid from "../../Cards/one-action-cards-grid"
import FixedBackground from "../../Backgrounds/fixed-background"

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

export default function AdminIndex_Main() {
  return (
    <>
      <FixedBackground url="url(/medias/lines.jpg)" />
      <Stack zIndex={0}>
        <OneActionCardsGrid cards={CARDS} />
      </Stack>
    </>
  )
}
