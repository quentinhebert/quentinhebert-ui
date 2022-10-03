import { Box, Stack, Typography } from "@mui/material"
import { useState } from "react"
import apiCall from "../../../../services/apiCalls/apiCall"
import withSnacks from "../../../hocs/withSnacks"
import { ModalTitle } from "../../../Modals/Modal-Components/modal-title"
import CustomForm from "../../../ReusableComponents/forms/custom-form"
import CenteredMaxWidthContainer from "../../../ReusableComponents/containers/centered-max-width-container"
import BodyText from "../../../ReusableComponents/text/body-text"
import CustomAccordion from "../../../ReusableComponents/containers/custom-accordion"
import { Clock, Map, PhoneVertical, Language } from "grommet-icons"
import CustomSubmitButton from "../../../ReusableComponents/forms/custom-submit-button"
import { compose } from "redux"
import withConfirmAction from "../../../hocs/withConfirmAction"
import PleaseWait from "../../../ReusableComponents/helpers/please-wait"
import LogoutIcon from "@mui/icons-material/Logout"
import RefreshIcon from "@mui/icons-material/Refresh"

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

const RenderSessions = (props) => {
  const {
    user,
    setActionToFire,
    setOpenConfirmModal,
    setConfirmTitle,
    setNextButtonText,
    setConfirmContent,
    setSeverity,
    setMessageSnack,
    setOpenSnackBar,
  } = props

  // USE-STATES
  const [sessions, setSessions] = useState([])
  const [isFetching, setIsFetching] = useState(false)

  const fetchSessions = async () => {
    setIsFetching(true)
    const res = await apiCall.users.getSessions(user.id)
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
    setSeverity("success")
    setOpenSnackBar("true")
    setMessageSnack("L'appareil a bien été déconnecté.")
    await fetchSessions() // Refresh data
  }
  const handleError = () => {
    setSeverity("error")
    setOpenSnackBar("true")
    setMessageSnack(
      "Une erreur est survenue lors de la déconnexion de l'appareil..."
    )
  }
  const deleteSession = async (sessionId) => {
    const res = await apiCall.users.deleteSession(user.id, sessionId)
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
          <CustomSubmitButton
            startIcon={<RefreshIcon />}
            onClick={fetchSessions}
          >
            Raffraîchir
          </CustomSubmitButton>
        </Stack>
      </Stack>

      {sessions &&
        sessions.map((session, key) => {
          const formattedDate = new Date(session.date).toLocaleDateString(
            "fr-FR",
            {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }
          )
          let formattedLocation = "Localisation inconnue"
          if (session.location.city && session.location.region)
            formattedLocation = `${session.location.city}, ${session.location.region}`
          if (session.location.country && session.location.continent)
            formattedLocation += ` (${session.location.country}, ${session.location.continent})`

          return (
            <CustomAccordion
              key={key}
              title={
                <Typography>
                  {session.device.os.name + " / " + session.device.browser}
                  <Box sx={{ color: (theme) => theme.palette.text.white }}>
                    {session.location.region || "Localisation inconnue"}
                  </Box>
                </Typography>
              }
            >
              <Stack gap={2}>
                <DataRow>
                  <PhoneVertical color="#fff" size="medium" />
                  Appareil :{" "}
                  <DataValue>
                    {session.device.os.name + " " + session.device.os.version}
                  </DataValue>
                </DataRow>
                <DataRow>
                  <Language color="#fff" size="medium" />
                  Navigateur : <DataValue>{session.device.browser}</DataValue>
                </DataRow>
                <DataRow>
                  <Clock color="#fff" size="medium" />
                  Dernière connexion : <DataValue>{formattedDate}</DataValue>
                </DataRow>
                <DataRow>
                  <Map color="#fff" size="medium" />
                  Localisation : <DataValue>{formattedLocation}</DataValue>
                </DataRow>

                <Stack
                  flexDirection="row"
                  gap={2}
                  justifyContent="end"
                  marginTop={4}
                >
                  <CustomSubmitButton
                    secondary="true"
                    startIcon={<LogoutIcon />}
                    onClick={() => handleDeleteSession(session.id)}
                  >
                    Déconnecter
                  </CustomSubmitButton>
                </Stack>
              </Stack>
            </CustomAccordion>
          )
        })}
    </Stack>
  )
}

function Sessions(props) {
  const {
    user,
    setUser,
    setActionToFire,
    setOpenConfirmModal,
    setConfirmTitle,
    setNextButtonText,
    setConfirmContent,
    setSeverity,
    setMessageSnack,
    setOpenSnackBar,
  } = props

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
              user={user}
              setActionToFire={setActionToFire}
              setOpenConfirmModal={setOpenConfirmModal}
              setConfirmTitle={setConfirmTitle}
              setNextButtonText={setNextButtonText}
              setConfirmContent={setConfirmContent}
              setSeverity={setSeverity}
              setMessageSnack={setMessageSnack}
              setOpenSnackBar={setOpenSnackBar}
            />
          </Stack>
        </Stack>
      </CustomForm>
    </CenteredMaxWidthContainer>
  )
}

export default compose(withSnacks, withConfirmAction)(Sessions)
