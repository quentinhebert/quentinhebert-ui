import { Box, Stack } from "@mui/material"
import PageTitle from "../../ReusableComponents/titles/page-title"
import OneActionCardsGrid from "../../ReusableComponents/cards/one-action-cards-grid"
import Breadcrumbs from "../../ReusableComponents/navigation/breadcrumbs"
import FlashingRec from "../../Animation/FlashingRec"
import FlashingUnderscore from "../../Animation/flashing-underscore"
import FixedBackground from "../../ReusableComponents/backgrounds/fixed-background"
import AdminPagesLayout from "../AdminPagesLayout"

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

export default function AdminBackOfficeIndex() {
  return (
    <AdminPagesLayout title="Back-Office">
      <FixedBackground url="url(/medias/lines.jpg)" />

      <Stack zIndex={0}>
        <OneActionCardsGrid cards={CARDS} />
      </Stack>
    </AdminPagesLayout>
  )
}
