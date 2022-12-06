import { Box, Grid, Stack } from "@mui/material"
import PillButton from "../../Buttons/pill-button"
import CustomCard from "../../Cards/custom-card"
import DescriptionIcon from "@mui/icons-material/Description"
import EastIcon from "@mui/icons-material/East"
import BodyText from "../../Text/body-text"
import { useContext } from "react"
import { UserContext } from "../../../contexts/UserContext"

const Label = (props) => (
  <Grid item xs={8}>
    <Stack>
      <BodyText color="grey" {...props} />
    </Stack>
  </Grid>
)
const Value = (props) => (
  <Grid item xs={4}>
    <Stack>
      <BodyText textAlign="right" {...props} />
    </Stack>
  </Grid>
)

const RenderKpi = ({ data }) => (
  <Grid container spacing={2}>
    <Label>Prospects</Label>
    <Value>0</Value>
    <Label>Commandes en cours</Label>
    <Value>0</Value>
    <Label>Projets livrés</Label>
    <Value>0</Value>
    <Label>C.A.</Label>
    <Value>0 €</Value>
  </Grid>
)

const Card = ({ title, ...props }) => (
  <Stack padding={4}>
    <Stack
      sx={{
        background: "rgb(0,0,0,0.3)",
        borderRadius: "15px",
        padding: 4,
        gap: 4,
        minWidth: "250px",
        scrollSnapAlign: "center",
      }}
    >
      <BodyText textAlign="center">{title}</BodyText>
      <Stack {...props} />
    </Stack>
  </Stack>
)

export default function KpiModule({}) {
  const { user } = useContext(UserContext)

  return (
    <CustomCard
      backgroundColor={(theme) => theme.palette.background.main}
      background={"transparent"}
    >
      <Stack
        className="flex-center"
        sx={{
          gap: { xs: 2, md: 6 },
          padding: { xs: "0", md: "1.5rem" },
        }}
      >
        <BodyText
          className="inline-flex gap-10"
          alignItems="center"
          fontSize="1.5rem"
          lineHeight="2rem"
          textAlign="center"
        >
          Content de vous revoir {user.firstname} ! 🎉
        </BodyText>

        <Stack
          flexDirection="row"
          overflow="auto"
          width="100%"
          sx={{
            scrollSnapType: "x mandatory",
            overflowX: "auto",
            scrollBehavior: "smooth",
          }}
        >
          <Card title="Cette semaine">
            <RenderKpi />
          </Card>

          <Card title="Ce mois-ci">
            <RenderKpi />
          </Card>

          <Card title="Cette année">
            <RenderKpi />
          </Card>
        </Stack>
      </Stack>
    </CustomCard>
  )
}
