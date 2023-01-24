import { Box, Grid, Stack } from "@mui/material"
import PillButton from "../../Buttons/pill-button"
import CustomCard from "../../Cards/custom-card"
import DescriptionIcon from "@mui/icons-material/Description"
import EastIcon from "@mui/icons-material/East"
import BodyText from "../../Text/body-text"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../contexts/UserContext"
import apiCall from "../../../services/apiCalls/apiCall"

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
    <Value>{data.prospects}</Value>
    <Label>Commandes en cours</Label>
    <Value>{data.orders}</Value>
    <Label>Projets livrés</Label>
    <Value>0</Value>
    <Label>C.A.</Label>
    <Value>{data.turnover / 100}€</Value>
  </Grid>
)

const Card = ({ title, ...props }) => (
  <Stack padding={2}>
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
  const [kpi, setKpi] = useState({
    this_week: {
      prospects: 0,
      orders: 0,
    },
    this_month: {
      prospects: 0,
      orders: 0,
    },
    this_year: {
      prospects: 0,
      orders: 0,
    },
  })

  const { user } = useContext(UserContext)

  async function fetchKpi() {
    const res = await apiCall.dashboard.kpi.get()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setKpi(jsonRes)
    }
  }

  useEffect(() => {
    fetchKpi()
  }, [])

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
            <RenderKpi data={kpi.this_week} />
          </Card>

          <Card title="Ce mois-ci">
            <RenderKpi data={kpi.this_month} />
          </Card>

          <Card title="Cette année">
            <RenderKpi data={kpi.this_year} />
          </Card>
        </Stack>
      </Stack>
    </CustomCard>
  )
}
