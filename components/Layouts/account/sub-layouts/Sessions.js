import { Box, Stack, Typography } from "@mui/material"
import { useContext, useState } from "react"
import apiCall from "../../../../services/apiCalls/apiCall"
import { ModalTitle } from "../../../Modals/Modal-Components/modal-title"
import { Clock, Map, PhoneVertical, Language, Wifi } from "grommet-icons"
import ComputerRoundedIcon from "@mui/icons-material/ComputerRounded"
import TabletRoundedIcon from "@mui/icons-material/TabletRounded"
import withConfirmAction from "../../../hocs/withConfirmAction"
import LogoutIcon from "@mui/icons-material/Logout"
import {
  convertToLongString,
  convertToShortString,
  getLocaleDateTime,
} from "../../../../services/date-time"
import { UserContext } from "../../../../contexts/UserContext"
import { AppContext } from "../../../../contexts/AppContext"
import CustomForm from "../../../Forms/custom-form"
import PleaseWait from "../../../Helpers/please-wait"
import BodyText from "../../../Text/body-text"
import CenteredMaxWidthContainer from "../../../Containers/centered-max-width-container"
import RefreshButton from "../../../Buttons/refresh-button"
import CustomAccordion from "../../../Containers/custom-accordion"
import RectangleButton from "../../../Buttons/rectangle-button"

const DataRow = (props) => (
  <BodyText
    gap={1}
    sx={{
      display: "inline-flex",
      alignItems: "center",
      flexDirection: { xs: "column", md: "row" },
    }}
    {...props}
  />
)

const DataValue = (props) => (
  <Box color="text.secondary" fontStyle="italic" {...props} />
)

const DeviceIcon = ({ type }) => {
  switch (type) {
    case "desktop":
      return <ComputerRoundedIcon sx={{ color: "#fff" }} />
    case "tablet":
      return <TabletRoundedIcon sx={{ color: "#fff" }} />
    case "smartphone":
      return <PhoneVertical color="#fff" size="medium" />
    case "mobile":
      return <PhoneVertical color="#fff" size="medium" />
    case "phone":
      return <PhoneVertical color="#fff" size="medium" />
    default:
      return <ComputerRoundedIcon sx={{ color: "#fff" }} />
  }
}

const RenderSessions = (props) => {
  const {
    setActionToFire,
    setOpenConfirmModal,
    setConfirmTitle,
    setNextButtonText,
    setConfirmContent,
  } = props

  // USER CONTEXT
  const { user } = useContext(UserContext)
  // APP CONTEXT
  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  // USE-STATES
  const [sessions, setSessions] = useState([])
  const [isFetching, setIsFetching] = useState(false)

  const fetchSessions = async () => {
    setIsFetching(true)
    const res = await apiCall.users.sessions.get(user.id)
    if (res && res.ok) {
      const jsonRes = await res.json()
      setSessions(jsonRes)
    }
    setIsFetching(false)
  }

  // Initial fetch
  useState(() => {
    fetchSessions()
  }, [])

  // HANDLERS
  const handleSuccess = async () => {
    setSnackSeverity("success")
    setSnackMessage("L'appareil a bien été déconnecté.")
    await fetchSessions() // Refresh data
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage(
      "Une erreur est survenue lors de la déconnexion de l'appareil..."
    )
  }
  const deleteSession = async (sessionId) => {
    const res = await apiCall.users.sessions.delete(user.id, sessionId)
    if (res && res.ok) await handleSuccess()
    else handleError()
  }
  const handleDeleteSession = async (sessionId) => {
    setActionToFire(() => async () => await deleteSession(sessionId))
    setConfirmTitle("Déconnecter l'appareil")
    setNextButtonText("Confirmer")
    setConfirmContent({
      text: 'Cet appareil sera automatiquement déconnecté dans 1 minute si vous cliquez sur "Confirmer". L\'utilisateur devra se connecter de nouveau sur cet appareil.',
    })
    setOpenConfirmModal(true)
  }

  if (isFetching) return <PleaseWait />

  return (
    <Stack gap={2}>
      <Stack width="100%">
        <Stack alignSelf="flex-end">
          <RefreshButton refresh={fetchSessions} />
        </Stack>
      </Stack>

      <Stack width="100%">
        {sessions &&
          sessions.map((session, key) => {
            // Convert date time with user's timezone
            const localeDateTime = getLocaleDateTime(
              session.date,
              user.timezone
            )
            // Convert date to long and short strings (UX readability)
            let formattedDate = convertToLongString(localeDateTime)
            let shortDate = convertToShortString(localeDateTime)

            const mainLocation = session.location?.location1
            let formattedMainLocation = ""

            // If we have zero info about location
            if (
              !mainLocation?.city &&
              !mainLocation?.postal_code &&
              !mainLocation?.region
            )
              formattedMainLocation = "Localisation inconnue"

            // If we have city, postal code and region
            if (
              mainLocation?.city &&
              mainLocation?.postal_code &&
              mainLocation?.region
            )
              formattedMainLocation = `${mainLocation?.city} ${mainLocation?.postal_code}, (${mainLocation?.region})`

            // If we have only the region
            if (
              !mainLocation?.city &&
              !mainLocation?.postal_code &&
              mainLocation?.region
            )
              formattedMainLocation = `${mainLocation?.region}`

            if (
              mainLocation?.country &&
              mainLocation?.continent &&
              mainLocation?.flag
            )
              formattedMainLocation += ` (${mainLocation?.country} ${mainLocation?.flag}, ${mainLocation.continent})`

            let shortMainLocation = "Localisation inconnue"
            if (mainLocation?.region)
              shortMainLocation = `${mainLocation?.region}`
            if (mainLocation?.country && mainLocation?.flag)
              shortMainLocation += ` (${mainLocation?.country} ${mainLocation?.flag})`

            const secondaryLocation = session.location?.location2
            let formattedSecondaryLocation = "Localisation inconnue"
            if (secondaryLocation?.city && secondaryLocation?.region)
              formattedSecondaryLocation = `${secondaryLocation?.city}, ${secondaryLocation?.region}`
            if (secondaryLocation?.country)
              formattedSecondaryLocation += ` (${secondaryLocation?.country})`

            return (
              <CustomAccordion
                key={key}
                title={
                  <Stack flexDirection="row" alignItems="center" gap={2}>
                    <DeviceIcon type={session.device.type} />
                    <Typography>
                      {`${session.device.brand || ""} ${
                        session.device.os.name
                      } ${session.device.os.version} / ${
                        session.device.browser
                      }`}
                      <Box sx={{ color: (theme) => theme.palette.text.white }}>
                        {shortMainLocation} – {shortDate}
                      </Box>
                    </Typography>
                  </Stack>
                }
              >
                <Stack gap={2}>
                  <DataRow>
                    <DeviceIcon type={session.device.type} />
                    Appareil :{" "}
                    <DataValue>
                      {`${session.device.model || ""} ${
                        session.device.os.name
                      } (${session.device.os.version})`}
                    </DataValue>
                  </DataRow>
                  <DataRow>
                    <Language color="#fff" size="medium" />
                    Navigateur :{" "}
                    <DataValue>
                      {session.device.browser || "Navigateur inconnu"}
                    </DataValue>
                  </DataRow>
                  <DataRow>
                    <Wifi color="#fff" size="medium" />
                    Réseau :{" "}
                    <DataValue>
                      {mainLocation?.network || "Réseau inconnu"}
                    </DataValue>
                  </DataRow>
                  <DataRow>
                    <Clock color="#fff" size="medium" />
                    Dernière connexion : <DataValue>{formattedDate}</DataValue>
                  </DataRow>
                  <DataRow>
                    <Map color="#fff" size="medium" />
                    Localisation 1 :{" "}
                    <DataValue>{formattedMainLocation}</DataValue>
                  </DataRow>
                  <DataRow>
                    <Map color="#fff" size="medium" />
                    Localisation 2 :{" "}
                    <DataValue>{formattedSecondaryLocation}</DataValue>
                  </DataRow>

                  <Stack
                    flexDirection="row"
                    gap={2}
                    justifyContent="end"
                    marginTop={4}
                  >
                    <RectangleButton
                      secondary="true"
                      startIcon={<LogoutIcon />}
                      onClick={() => handleDeleteSession(session.id)}
                    >
                      Déconnecter
                    </RectangleButton>
                  </Stack>
                </Stack>
              </CustomAccordion>
            )
          })}
      </Stack>
    </Stack>
  )
}

function Sessions(props) {
  const {
    setActionToFire,
    setOpenConfirmModal,
    setConfirmTitle,
    setNextButtonText,
    setConfirmContent,
  } = props

  // USER CONTEXT
  const { user } = useContext(UserContext)

  if (!user) return <></>

  return (
    <CenteredMaxWidthContainer>
      <CustomForm>
        <Stack
          gap={4}
          padding={4}
          width="100%"
          alignItems="center"
          borderRadius="10px"
          sx={{ backgroundColor: (theme) => theme.palette.background.main }}
        >
          <ModalTitle>Sessions de connexion</ModalTitle>

          <Stack width="100%">
            <BodyText fontSize="1rem">
              Gérez toutes le sessions actives de connexion à votre compte.
            </BodyText>
          </Stack>

          <Stack width="100%">
            <RenderSessions
              setActionToFire={setActionToFire}
              setOpenConfirmModal={setOpenConfirmModal}
              setConfirmTitle={setConfirmTitle}
              setNextButtonText={setNextButtonText}
              setConfirmContent={setConfirmContent}
            />
          </Stack>
        </Stack>
      </CustomForm>
    </CenteredMaxWidthContainer>
  )
}

export default withConfirmAction(Sessions)
