import { Stack } from "@mui/material"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import SupervisedUserCircleRoundedIcon from "@mui/icons-material/SupervisedUserCircleRounded"
import DesktopMacOutlinedIcon from "@mui/icons-material/DesktopMacOutlined"
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined"
import FixedBackground from "../../Backgrounds/fixed-background"
import BtnCardsGrid from "../../Cards/btn-cards-grid"

const CARDS = [
  {
    title: "Informations",
    icon: <InfoOutlinedIcon sx={{ fontSize: "2rem" }} />,
    button: { text: "Accéder", href: "/admin/manage-website-informations" },
  },
  {
    title: "Back-Office",
    icon: <DesktopMacOutlinedIcon sx={{ fontSize: "2rem" }} />,
    button: { text: "Accéder", href: "/admin/back-office" },
  },
  {
    title: "Utilisateurs",
    icon: <SupervisedUserCircleRoundedIcon sx={{ fontSize: "2rem" }} />,
    button: { text: "Gérer", href: "/admin/manage-users" },
  },
  {
    title: "Fichiers",
    icon: <FolderOpenOutlinedIcon sx={{ fontSize: "2rem" }} />,
    button: { text: "Gérer", href: "/admin/manage-files" },
  },
]

export default function AdminIndex_Main() {
  return (
    <>
      <FixedBackground url="url(/medias/lines.jpg)" />
      <Stack zIndex={0}>
        <BtnCardsGrid cards={CARDS} />
      </Stack>
    </>
  )
}
