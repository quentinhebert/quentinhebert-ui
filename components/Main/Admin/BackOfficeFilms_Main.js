import { Stack } from "@mui/material"
import { Multimedia } from "grommet-icons"
import { Icon } from "react-icons-kit"
import { videoCamera } from "react-icons-kit/icomoon/videoCamera"
import FixedBackground from "../../Backgrounds/fixed-background"
import OneActionCardsGrid from "../../Cards/one-action-cards-grid"

const CARDS = [
  {
    title: "Mes films",
    icon: <Multimedia color="#fff" size="large" />,
    description: "Ajoutez, modifiez et supprimez des films de votre site.",
    button: { text: "Gérer", href: "/admin/back-office/films/manage-films" },
  },
  {
    title: "Mon matériel",
    icon: <Icon icon={videoCamera} size={50} />,
    description:
      "Ajoutez, modifiez et supprimez des items de votre matériel vidéo.",
    button: { text: "Gérer", href: "/admin/back-office/films/manage-gear" },
  },
]

export default function BackOfficeFilms_Main(props) {
  const {} = props

  return (
    <>
      <FixedBackground url="url(/medias/lines.jpg)" />

      <Stack zIndex={0}>
        <OneActionCardsGrid cards={CARDS} />
      </Stack>
    </>
  )
}
