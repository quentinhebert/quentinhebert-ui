import { Stack } from "@mui/material"
import OneActionCardsGrid from "../../Cards/one-action-cards-grid"
import FixedBackground from "../../Backgrounds/fixed-background"
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined"
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined"
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined"

const CARDS = [
  {
    title: "Prospects",
    icon: (
      <MarkEmailUnreadOutlinedIcon
        sx={{ marginRight: ".5rem", fontSize: "5rem" }}
      />
    ),
    description: "Retrouvez tous vos prospects qui vous ont demandé un devis.",
    button: { text: "Accéder", href: "/dashboard/quotation-requests" },
  },
  {
    title: "Devis",
    icon: (
      <DescriptionOutlinedIcon
        sx={{ marginRight: ".5rem", fontSize: "5rem" }}
      />
    ),
    description:
      "Retrouvez tous les devis brouillons ou envoyés à vos prospects.",
    button: { text: "Accéder", href: "/dashboard/quotations" },
  },
  {
    title: "Missions",
    icon: (
      <WorkOutlineOutlinedIcon
        sx={{ marginRight: ".5rem", fontSize: "5rem" }}
      />
    ),
    description: "Retrouvez toutes vos missions (vidéo et web), factures...",
    button: { text: "Accéder", href: "/dashboard/missions" },
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
