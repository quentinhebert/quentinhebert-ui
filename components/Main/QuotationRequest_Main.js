import { Box, Grid, Stack, Typography } from "@mui/material"
import CenteredMaxWidthContainer from "../Containers/centered-max-width-container"
import PageTitle from "../Titles/page-title"
import { useContext, useEffect, useState } from "react"
import apiCall from "../../services/apiCalls/apiCall"
import { formatDayDate } from "../../services/date-time"
import BodyText from "../Text/body-text"
import PersonIcon from "@mui/icons-material/Person"
import EuroIcon from "@mui/icons-material/Euro"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import Pill from "../Text/pill"
import { UserContext } from "../../contexts/UserContext"
import CommentIcon from "@mui/icons-material/Comment"
import PillButton from "../Buttons/pill-button"
import { useRouter } from "next/router"
import useSWR from "swr"

const InfoLine = ({ label, ...props }) => (
  <Stack width="100%" className="row gap-10">
    <BodyText preventTransition>{label} :</BodyText>
    <BodyText
      preventTransition
      color={(theme) => theme.palette.secondary.main}
      {...props}
    />
  </Stack>
)
const initialRequest = {
  id: null,
  created_at: "",
  firstname: "",
  email: "",
  description: "",
  opened: false,
  budget: "",
  company: "",
  phone: "",
  services: [],
}

export default function QuotationRequest_Main({ id }) {
  const [request, setRequest] = useState(initialRequest)

  const { user } = useContext(UserContext)
  const router = useRouter()
  const { mutate } = useSWR("dashboardNotifications")

  // Format date
  const formattedDate = formatDayDate({
    timestamp: request.created_at,
    timezone: user.timezone,
  })

  // FETCH
  const fetchData = async () => {
    if (!id) return
    const res = await apiCall.quotations.requests.get({ id })
    if (res && res.ok) {
      const jsonRes = await res.json()
      setRequest(jsonRes)
      if (!jsonRes.opened) await handleSetOpened() // set notification read
    }
  }

  const handleSetOpened = async () => {
    await apiCall.quotations.requests.setOpened({ id, opened: true })
    mutate() // update notifications component (dashboard tabs)
  }

  // INITIAL FETCH
  useEffect(() => {
    fetchData()
  }, [id])

  // SUB-COMPONENTS
  const ServiceChips = () => {
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

  const CardTitle = (props) => (
    <Typography
      variant="h5"
      color="#fff"
      {...props}
      display="flex"
      alignItems="center"
      gap={2}
    />
  )

  const Card = (props) => (
    <Stack
      gap={2}
      sx={{ border: "1px solid #fff", padding: 4, borderRadius: "30px" }}
      {...props}
    />
  )

  const ContactInfos = () => (
    <Card>
      <CardTitle>
        <PersonIcon />
        Envoyée par
      </CardTitle>
      <Grid container sx={{ gap: { xs: 1, md: 0 } }}>
        <InfoLine label="Nom" textTransform="capitalize">
          {request.firstname} {request.lastname}
        </InfoLine>
        <InfoLine label="E-mail">{request.email}</InfoLine>
        {request.phone !== "" ? (
          <InfoLine label="Tél.">{request.phone}</InfoLine>
        ) : null}
        {request.company !== "" ? (
          <InfoLine label="Entreprise">{request.company}</InfoLine>
        ) : null}
      </Grid>
    </Card>
  )

  const BudgetInfos = () => (
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

  const ProjectInfos = () => (
    <Card>
      <CardTitle>
        <CommentIcon />
        Commentaire
      </CardTitle>
      <BodyText fontStyle="italic" preventTransition>
        “{request.description}”
      </BodyText>
    </Card>
  )

  const Buttons = () => (
    <Stack width="100%" alignItems="end">
      <Stack className="row" alignItems="center" gap={2}>
        <PillButton
          onClick={() => router.push("/dashboard/quotation-requests")}
          background="transparent"
          color="#fff"
          className="cool-button"
        >
          Retour
        </PillButton>
        <Box component="a" href="/dashboard/orders/create" target="_blank">
          <PillButton endIcon={<OpenInNewIcon />}>Créer un devis</PillButton>
        </Box>
      </Stack>
    </Stack>
  )

  // RENDER
  return (
    <Stack flexGrow={1}>
      <CenteredMaxWidthContainer gap={2}>
        <Stack
          className="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <ServiceChips />
          <BodyText>{formattedDate}</BodyText>
        </Stack>
        <ContactInfos />
        <BudgetInfos />
        <ProjectInfos />
        <Buttons />
      </CenteredMaxWidthContainer>
    </Stack>
  )
}
