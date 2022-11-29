import { Stack } from "@mui/material"
import OneActionCardsGrid from "../../Cards/one-action-cards-grid"
import FixedBackground from "../../Backgrounds/fixed-background"
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined"
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined"
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined"
import PillButton from "../../Buttons/pill-button"
import CustomCard from "../../Cards/custom-card"
import DescriptionIcon from "@mui/icons-material/Description"
import EastIcon from "@mui/icons-material/East"
import BodyText from "../../Text/body-text"
import { useRouter } from "next/router"

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
  const router = useRouter()
  return (
    <>
      <FixedBackground url="url(/medias/lines.jpg)" />
      <Stack zIndex={0} gap={4}>
        <CustomCard
          backgroundColor={"#000"}
          background={(theme) => theme.palette.secondary.main}
        >
          <Stack gap={4} className="flex-center">
            <BodyText
              className="inline-flex gap-10"
              alignItems="center"
              fontSize="1.5rem"
            >
              <DescriptionIcon sx={{ display: "flex", fontSize: "2rem" }} />{" "}
              Créer un document
            </BodyText>
            <Stack
              sx={{
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 2, sm: 4 },
              }}
            >
              <PillButton
                endIcon={<EastIcon />}
                onClick={() => router.push("/dashboard/quotations/create")}
              >
                Nouveau devis
              </PillButton>
              <PillButton
                endIcon={<EastIcon />}
                onClick={() => router.push("/dashboard/invoices/new")}
              >
                Nouvelle facture
              </PillButton>
            </Stack>
          </Stack>
        </CustomCard>

        <OneActionCardsGrid cards={CARDS} />
      </Stack>
    </>
  )
}
