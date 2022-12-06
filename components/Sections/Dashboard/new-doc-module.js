import { Stack } from "@mui/material"
import PillButton from "../../Buttons/pill-button"
import CustomCard from "../../Cards/custom-card"
import DescriptionIcon from "@mui/icons-material/Description"
import EastIcon from "@mui/icons-material/East"
import BodyText from "../../Text/body-text"

export default function NewDocModule({}) {
  return (
    <CustomCard
      backgroundColor={(theme) => theme.palette.background.main}
      background={"transparent"}
    >
      <Stack
        gap={4}
        className="flex-center"
        sx={{
          padding: { xs: "0", md: "1.5rem" },
        }}
      >
        <BodyText
          className="inline-flex gap-10"
          alignItems="center"
          fontSize="1.5rem"
          lineHeight="2rem"
        >
          <DescriptionIcon sx={{ display: "flex", fontSize: "2rem" }} /> Créer
          un document
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
  )
}
