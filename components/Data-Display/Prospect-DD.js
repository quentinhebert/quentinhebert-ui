import { Box, Grid, Stack, Typography } from "@mui/material"
import { useContext } from "react"
import { formatDayDate } from "../../services/date-time"
import BodyText from "../Text/body-text"
import PersonIcon from "@mui/icons-material/Person"
import EuroIcon from "@mui/icons-material/Euro"
import Pill from "../Text/pill"
import { UserContext } from "../../contexts/UserContext"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"

export default function ProspectDD(
  request = {
    id,
    created_at,
    firstname,
    lastname,
    email,
    description,
    opened,
    budget,
    company,
    phone,
    services,
  }
) {
  const { user } = useContext(UserContext)

  // Format date
  const formattedDate = !!request.created_at
    ? formatDayDate({
        timestamp: request.created_at,
        timezone: user.timezone,
      })
    : ""

  // RENDER
  return (
    <Stack flexGrow={1} gap={2}>
      <Stack className="row" justifyContent="space-between" alignItems="center">
        <ServiceChips />
        <BodyText>{formattedDate}</BodyText>
      </Stack>
      <ContactInfos />
      <BudgetInfos />
      <ProjectInfos />
    </Stack>
  )

  // SUB-COMPONENTS
  function ProjectInfos() {
    return (
      <Card>
        <CardTitle>
          <InfoOutlinedIcon />
          Informations
        </CardTitle>
        <BodyText fontStyle="italic" preventTransition whiteSpace="pre-line">
          {request.description}
        </BodyText>
      </Card>
    )
  }
  function ServiceChips() {
    const Chip = (props) => (
      <Pill>
        <BodyText color="#000" {...props} padding="0 0.5rem" />
      </Pill>
    )
    return (
      <Stack className="row">
        {request.services.map((item) => (
          <Chip>{item}</Chip>
        ))}
      </Stack>
    )
  }
  function CardTitle(props) {
    return (
      <Typography
        variant="h5"
        color="#fff"
        {...props}
        display="flex"
        alignItems="center"
        gap={2}
      />
    )
  }
  function Card(props) {
    return (
      <Stack
        gap={2}
        sx={{
          boxShadow: "0 0 20px 1px rgb(0,0,0,0.5)",
          padding: 2,
          borderRadius: "15px",
        }}
        {...props}
      />
    )
  }
  function ContactInfos() {
    return (
      <Card>
        <CardTitle>
          <PersonIcon />
          Contact
        </CardTitle>
        <Grid container>
          <InfoLine
            label="Nom"
            textTransform="capitalize"
            background="rgb(0,0,0,0.3)"
          >
            {request.firstname} {request.lastname}
          </InfoLine>
          <InfoLine label="E-mail">{request.email}</InfoLine>
          {request.phone !== "" ? (
            <InfoLine label="Tél." background="rgb(0,0,0,0.3)">
              {request.phone}
            </InfoLine>
          ) : null}
          {request.company !== "" ? (
            <InfoLine label="Entreprise">{request.company}</InfoLine>
          ) : null}
        </Grid>
      </Card>
    )
  }
  function BudgetInfos() {
    return (
      <Card>
        <CardTitle>
          <EuroIcon />
          Budget
        </CardTitle>
        <BodyText preventTransition>
          {!!request.budget ? (
            <>
              Le prospect a un budget de{" "}
              <Box
                component="span"
                sx={{ color: (theme) => theme.palette.text.secondary }}
              >
                {request.budget}
              </Box>
              .
            </>
          ) : (
            <>Le prospect n'a pas renseigné de budget.</>
          )}
        </BodyText>
      </Card>
    )
  }
  function InfoLine({ label, background, ...props }) {
    return (
      <>
        <Grid
          item
          xs={4}
          sx={{ padding: ".25rem .75rem", background: background || "" }}
        >
          <BodyText preventTransition>{label}</BodyText>
        </Grid>
        <Grid
          item
          xs={8}
          sx={{ padding: ".25rem .75rem", background: background || "" }}
        >
          <Typography
            textAlign="right"
            right={0}
            color={(theme) => theme.palette.secondary.main}
            {...props}
          />
        </Grid>
      </>
    )
  }
}
