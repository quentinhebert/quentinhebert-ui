import {
  Box,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material"
import BodyText from "../Text/body-text"
import CircleIcon from "@mui/icons-material/Circle"
import { useContext, useEffect, useState } from "react"
import apiCall from "../../services/apiCalls/apiCall"
import { formatDayDate } from "../../services/date-time"
import { UserContext } from "../../contexts/UserContext"
import PleaseWait from "../Helpers/please-wait"
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined"
import Pill from "../Text/pill"
import RefreshButton from "../Buttons/refresh-button"
import DropdownOptions from "../Dropdown/dropdown-options"
import { useRouter } from "next/router"
import { AppContext } from "../../contexts/AppContext"
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import ListIcon from "@mui/icons-material/List"
import CustomIconButton from "../Buttons/custom-icon-button"
import AddRoundedIcon from "@mui/icons-material/AddRounded"
import useAddProspect from "../../hooks/useAddProspect"
import { ACTIVITY_TYPES } from "../../enums/activityTypesEnum"
import PROSPECT_STATES from "../../enums/prospectStates"
import useEditProspect from "../../hooks/useEditProspect"
import { alignProperty } from "@mui/material/styles/cssUtils"

export default function QuotationRequests_Main({}) {
  const MODES = { FORM: "FORM", LIST: "LIST" }
  const { user } = useContext(UserContext)
  const [list, setList] = useState([])
  const [prospects, setProspects] = useState([])
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState(MODES.FORM)
  const newNotifList = list.filter((item) => item.opened === false)

  const { handleOpenAddProspectModal, AddProspectDialog } = useAddProspect({
    refreshData: fetchProspects,
  })

  // Fetch data
  useEffect(() => {
    if (mode === MODES.FORM) fetchData()
    else if (mode === MODES.LIST) fetchProspects()
  }, [mode])

  // RENDER
  return (
    <Stack
      gap={4}
      sx={{
        background: (theme) => theme.palette.background.main,
        borderRadius: "30px",
      }}
      padding="2rem"
    >
      <ToggleButtonGroup
        color="tersary"
        value={mode}
        exclusive
        onChange={handleChangeMode}
        sx={{ margin: "auto" }}
      >
        <ToggleButton
          value={MODES.FORM}
          sx={{ textTransform: "capitalize", gap: 1 }}
        >
          <MarkEmailUnreadOutlinedIcon />
          Demandes de contact{" "}
          {newNotifList.length ? `(${newNotifList.length})` : null}
        </ToggleButton>
        <ToggleButton
          value={MODES.LIST}
          sx={{ textTransform: "capitalize", gap: 1 }}
        >
          <ListIcon />
          Liste personnelle {prospects.length ? `(${prospects.length})` : null}
        </ToggleButton>
      </ToggleButtonGroup>

      <Stack width="100%" alignItems="end" flexDirection="row" gap={1}>
        <CustomIconButton
          onClick={handleOpenAddProspectModal}
          icon={<AddRoundedIcon sx={{ fontSize: "1.5rem" }} />}
          tooltip="Ajouter un prospect"
        />
        <RefreshButton
          refresh={mode === MODES.FORM ? fetchData : fetchProspects}
        />
      </Stack>

      <Stack gap={2}>
        {loading && <PleaseWait />}
        {mode === MODES.FORM &&
          !!list?.length &&
          list.map((item) => {
            // Format date
            const formattedDate = formatDayDate({
              timestamp: item.created_at,
              timezone: user.timezone,
            })

            return (
              <QuotationRequestsCard
                key={item.id}
                id={item.id}
                opened={item.opened}
                firstname={item.firstname}
                email={item.email}
                description={item.description}
                services={item.services}
                date={formattedDate}
                refreshData={fetchData}
              />
            )
          })}
        {mode === MODES.LIST && !!prospects?.length && (
          <Stack>
            <Grid container padding=".25rem .5rem" columnSpacing={2}>
              <Grid item xs={1}>
                <BodyText color="gray">Service(s)</BodyText>
              </Grid>
              <Grid item xs={2}>
                <BodyText color="gray">Contact</BodyText>
              </Grid>
              <Grid item xs={2}>
                <BodyText color="gray">Entreprise</BodyText>
              </Grid>
              <Grid item xs={5}>
                <BodyText color="gray">Description</BodyText>
              </Grid>
              <Grid item xs={2}>
                <BodyText color="gray">Status</BodyText>
              </Grid>
            </Grid>
            {prospects.map((item, key) => {
              // Format date
              const formattedDate = formatDayDate({
                timestamp: item.created_at,
                timezone: user.timezone,
              })

              return (
                <PropsectsCard
                  key={key}
                  index={key}
                  id={item.id}
                  status={item.status}
                  firstname={item.firstname}
                  lastname={item.lastname}
                  email={item.email}
                  company={item.company}
                  description={item.description}
                  contacted={item.contacted}
                  activity_type={item.activity_type}
                  date={formattedDate}
                  refreshData={fetchProspects}
                />
              )
            })}
          </Stack>
        )}

        {AddProspectDialog({})}
      </Stack>
    </Stack>
  )

  function handleChangeMode(e, newMode) {
    if (newMode === MODES.LIST) return setMode(MODES.LIST)
    else if (newMode === MODES.FORM) return setMode(MODES.FORM)
  }
  async function fetchData() {
    setLoading(true)
    const res = await apiCall.quotations.requests.getAll()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setList(jsonRes)
    }
    return setLoading(false)
  }
  async function fetchProspects() {
    setLoading(true)
    const res = await apiCall.dashboard.prospects.getAll()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setProspects(jsonRes)
    }
    return setLoading(false)
  }
}

function QuotationRequestsCard({
  id,
  opened,
  firstname,
  email,
  description,
  date,
  services,
  refreshData,
}) {
  const router = useRouter()
  const { setSnackMessage, setSnackSeverity } = useContext(AppContext)
  const options = [
    {
      label: opened ? "Marquer comme non lue" : "Marquer comme lue",
      handleClick: opened ? markAsUnread : markAsRead,
      icon: <MarkEmailUnreadIcon />,
    },
    {
      label: "Ouvrir dans un nouvel onglet",
      handleClick: () =>
        window.open(`/dashboard/quotation-requests/${id}`, "_blank").focus(),
      icon: <OpenInNewIcon />,
    },
  ]

  return (
    <Stack
      sx={{
        flexDirection: "column",
        padding: "1rem 2rem",
        gap: 2,
        borderRadius: "30px",
        background: opened ? "rgb(0,0,0,0.3)" : "rgb(198, 144, 14, 0.2)",
        "&:hover": {
          background: opened ? "rgb(0,0,0,0.5)" : "rgb(198, 144, 14, 0.5)",
        },
      }}
      justifyContent="space-between"
    >
      <Stack className="row" alignItems="center">
        {!opened && (
          <CircleIcon color="secondary" sx={{ marginRight: "1rem" }} />
        )}
        <BodyText textAlign="right" preventTransition>
          {date || ""}
        </BodyText>

        <Stack flexGrow={1} />

        <DropdownOptions options={options} />
      </Stack>

      <Stack
        onClick={(e) => router.push(`/dashboard/quotation-requests/${id}`)}
        flexGrow={1}
        sx={{
          cursor: "pointer",
          display: "box",
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        <BodyText fontWeight="bold" preventTransition>
          {firstname || ""}{" "}
          <Box
            component="span"
            fontSize="1rem"
            sx={{
              color: (theme) => "rgb(256, 256, 256, 0.7)",
            }}
          >
            {email || ""}
          </Box>
        </BodyText>

        <BodyText
          color={opened ? "gray" : "rgb(256, 256, 256, 0.7)"}
          fontSize="1rem"
          preventTransition
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {description || ""}
        </BodyText>
      </Stack>

      <Stack className="row" gap={1}>
        {services.map((service, key) => (
          <Pill
            key={key}
            margin="0rem"
            padding="0 0.75rem"
            preventTransition
            bgColor={(theme) => theme.alert.title["disabled"].background}
            border="1px solid"
            borderColor={(theme) => theme.alert.title["disabled"].color}
          >
            <BodyText
              fontSize="0.8rem"
              color={(theme) => theme.alert.title["disabled"].color}
              preventTransition
            >
              {service}
            </BodyText>
          </Pill>
        ))}
      </Stack>
    </Stack>
  )

  async function markAsRead() {
    const res = await apiCall.quotations.requests.setOpened({
      id,
      opened: true,
    })
    if (!res || !res.ok) {
      setSnackMessage("Une erreur s'est produite")
      setSnackSeverity("error")
    }
    return refreshData()
  }
  async function markAsUnread() {
    const res = await apiCall.quotations.requests.setOpened({
      id,
      opened: false,
    })
    if (!res || !res.ok) {
      setSnackMessage("Une erreur s'est produite")
      setSnackSeverity("error")
    }
    return refreshData()
  }
}

function PropsectsCard({
  index,
  id,
  status,
  firstname,
  lastname,
  company,
  description,
  activity_type,
  refreshData,
}) {
  const { handleOpenEditProspectModal, EditProspectDialog } = useEditProspect({
    id,
    refreshData,
  })
  const router = useRouter()
  const options = [
    {
      label: "Ouvrir dans un nouvel onglet",
      handleClick: () =>
        window.open(`/dashboard/quotation-requests/${id}`, "_blank").focus(),
      icon: <OpenInNewIcon />,
    },
  ]

  return (
    <>
      <Grid
        onClick={handleOpenEditProspectModal}
        columnSpacing={2}
        container
        padding=".5rem"
        className="pointer"
        sx={{
          background: index % 2 !== 0 ? "transparent" : "rgb(0,0,0,0.3)",
          "&:hover": {
            background: "rgb(256,256,256, 0.1)",
          },
        }}
      >
        <Grid item xs={1}>
          <BodyText color="gray">
            {activity_type.map((item) => (
              <Box>{ACTIVITY_TYPES[item]}</Box>
            ))}
          </BodyText>
        </Grid>

        <Grid item xs={2}>
          <BodyText fontWeight="bold" preventTransition>
            {firstname || ""} {lastname || ""}
          </BodyText>
        </Grid>

        <Grid item xs={2}>
          <BodyText fontWeight="bold" preventTransition>
            {company || ""}
          </BodyText>
        </Grid>

        <Grid item xs={5}>
          <BodyText
            color={"gray"}
            fontSize="1rem"
            preventTransition
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {description || ""}
          </BodyText>
        </Grid>

        <Grid item xs={2}>
          <BodyText
            sx={{
              width: "auto",
              padding: ".2rem .5rem",
              borderRadius: "15px",
              background: (theme) =>
                theme.alert.title[PROSPECT_STATES[status].severity].background,
              border: "1px solid",
              borderColor: (theme) =>
                theme.alert.title[PROSPECT_STATES[status].severity].color,
              color: (theme) =>
                theme.alert.title[PROSPECT_STATES[status].severity].color,
            }}
          >
            {PROSPECT_STATES[status].label}
          </BodyText>
        </Grid>
      </Grid>

      {EditProspectDialog({})}
    </>
  )
}
