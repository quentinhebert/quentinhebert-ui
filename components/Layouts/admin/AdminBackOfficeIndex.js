import { Box, Stack } from "@mui/material"
import PageTitle from "../../ReusableComponents/titles/page-title"
import OneActionCardsGrid from "../../ReusableComponents/cards/one-action-cards-grid"
import Breadcrumbs from "../../ReusableComponents/navigation/breadcrumbs"
import FlashingRec from "../../Animation/FlashingRec"
import FlashingUnderscore from "../../Animation/flashing-underscore"

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
