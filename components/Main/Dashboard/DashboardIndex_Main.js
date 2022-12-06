import { Stack } from "@mui/material"
import FixedBackground from "../../Backgrounds/fixed-background"
import PillButton from "../../Buttons/pill-button"
import CustomCard from "../../Cards/custom-card"
import DescriptionIcon from "@mui/icons-material/Description"
import EastIcon from "@mui/icons-material/East"
import BodyText from "../../Text/body-text"
import { useRouter } from "next/router"
import OneActionBubblesGrid from "../../Cards/one-action-bubbles-grid"
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined"
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined"
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined"
import TaskIcon from "@mui/icons-material/Task"

const CARDS = [
  {
    title: "Prospects",
    icon: <MarkEmailUnreadOutlinedIcon className="full-width full-height" />,
    button: { text: "Accéder", href: "/dashboard/quotation-requests" },
  },
  {
    title: "Commandes",
    icon: <WorkOutlineOutlinedIcon className="full-width full-height" />,
    button: { text: "Accéder", href: "/dashboard/orders" },
  },
  {
    title: "Devis",
    icon: <TaskIcon className="full-width full-height" />,
    button: { text: "Accéder", href: "/dashboard/quotations" },
  },
  {
    title: "Factures",
    icon: <DescriptionOutlinedIcon className="full-width full-height" />,
    button: { text: "Accéder", href: "/dashboard/invoices" },
  },
]

export default function AdminIndex_Main() {
  const router = useRouter()
  return (
    <>
      <FixedBackground url="url(/medias/lines.jpg)" />

      <Stack zIndex={0} gap={4}>
        <CustomCard
          backgroundColor={(theme) => theme.palette.background.main}
          background={"transparent"}
        >
          <Stack gap={4} className="flex-center" padding="1.5rem">
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

        <OneActionBubblesGrid cards={CARDS} />
      </Stack>
    </>
  )
}
