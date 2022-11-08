import { Stack } from "@mui/material"
import FlashingRec from "../../Animation/FlashingRec"
import FlashingUnderscore from "../../Animation/flashing-underscore"
import OneActionCardsGrid from "../../Cards/one-action-cards-grid"
import FixedBackground from "../../Backgrounds/fixed-background"

const CARDS = [
  {
    title: (
      <>
        Vidéo
        <FlashingRec color={(theme) => theme.palette.text.white} />
      </>
    ),
    description: "Gérez tout ce qui concerne votre contenu de vidéaste.",
    button: { text: "Gérer", href: "/admin/back-office/films" },
  },
  {
    title: (
      <>
        Web
        <FlashingUnderscore color={(theme) => theme.palette.text.white} />
      </>
    ),
    description: "Gérez tout ce qui concerne votre contenu de développeur.",
    button: { text: "Gérer", href: "/admin/back-office/websites" },
  },
  {
    title: "Références",
    description: "Gérez toutes vos références.",
    button: { text: "Gérer", href: "/admin/back-office/references" },
  },
]

export default function BackOffice_Main() {
  return (
    <>
      <FixedBackground url="url(/medias/lines.jpg)" />

      <Stack zIndex={0}>
        <OneActionCardsGrid cards={CARDS} />
      </Stack>
    </>
  )
}
