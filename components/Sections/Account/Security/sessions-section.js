import { Box, Grid, Stack, Typography } from "@mui/material"
import { useContext, useState } from "react"
import { Clock, Map, PhoneVertical, Language, Wifi } from "grommet-icons"
import LogoutIcon from "@mui/icons-material/Logout"
import ComputerRoundedIcon from "@mui/icons-material/ComputerRounded"
import TabletRoundedIcon from "@mui/icons-material/TabletRounded"

import {
  convertToLongString,
  convertToShortString,
  getLocaleDateTime,
} from "../../../../services/date-time"
import apiCall from "../../../../services/apiCalls/apiCall"
import { ModalTitle } from "../../../Modals/Modal-Components/modal-title"
import { UserContext } from "../../../../contexts/UserContext"
import { AppContext } from "../../../../contexts/AppContext"
import PleaseWait from "../../../Helpers/please-wait"
import BodyText from "../../../Text/body-text"
import RefreshButton from "../../../Buttons/refresh-button"
import CustomAccordion from "../../../Containers/custom-accordion"
import PillButton from "../../../Buttons/pill-button"
import useConfirm from "../../../../hooks/useConfirm"
import CustomModal from "../../../Modals/custom-modal"

export default function SessionsSection({}) {
  // USE-STATES
  const [sessions, setSessions] = useState([])
  const [isFetching, setIsFetching] = useState(false)

  // CONTEXTS & HOOKS
  const { user } = useContext(UserContext)
  const { handleSuccess, handleError } = useContext(AppContext)
  const ConfirmDialog = useConfirm()

  // Initial fetch
  useState(() => {
    fetchSessions()
  }, [])

  if (!user) return <></>

  return (
    <>
      <Stack
        gap={4}
        padding={{ xs: "2rem 1rem", md: "2rem" }}
        width="100%"
        alignItems="center"
        borderRadius="10px"
        sx={{ backgroundColor: (theme) => theme.palette.background.main }}
      >
        <ModalTitle>Sessions de connexion</ModalTitle>

        <BodyText fontSize="1rem">
          Gérez toutes le sessions actives connectées à votre compte.
        </BodyText>

        <Stack width="100%">
          <Stack alignItems="flex-end" width="100%">
            <RefreshButton refresh={fetchSessions} loading={isFetching} />
          </Stack>

          <RenderSessions
            refresh={fetchSessions}
            sessions={sessions}
            isFetching={isFetching}
          />
        </Stack>

        <PillButton
          width="100%"
          background={(theme) => theme.palette.error.main}
          color="#fff"
          startIcon={<LogoutIcon />}
          onClick={handleDeleteSessions}
        >
          Déconnecter tout
        </PillButton>
      </Stack>

      <CustomModal
        open={ConfirmDialog.open}
        handleClose={ConfirmDialog.handleClose}
      >
        <ConfirmDialog.DialogContent />
      </CustomModal>
    </>
  )

  // HANDLERS
  async function fetchSessions() {
    setIsFetching(true)
    const res = await apiCall.users.sessions.get(user.id)
    if (res && res.ok) {
      const jsonRes = await res.json()
      setSessions(jsonRes)
    }
    setIsFetching(false)
  }
  async function deleteSessions() {
    const res = await apiCall.users.sessions.deleteAll(user.id)
    if (!res?.ok)
      return handleError(
        "Une erreur est survenue lors de la déconnexion des appareils..."
      )
    handleSuccess("Les appareils ont bien été déconnectés.")
    fetchSessions()
  }
  async function handleDeleteSessions(sessionId) {
    const title = "Déconnecter tous les appareils"
    const message = `Les appareils seront automatiquement déconnectés dans 1 minute si vous cliquez sur "Confirmer". L'utilisateur devra se connecter de nouveau sur tous ses appareils.`
    const nextAction = async () => await deleteSessions(sessionId)

    ConfirmDialog.setContent({ title, message, nextAction })
    ConfirmDialog.handleOpen()
  }
}

function RenderSessions({ sessions, refresh, isFetching }) {
  // USER CONTEXT
  const { user } = useContext(UserContext)
  // APP CONTEXT
  const { handleSuccess, handleError } = useContext(AppContext)

  const ConfirmDialog = useConfirm()

  // HANDLERS
  const deleteSession = async (sessionId) => {
    const res = await apiCall.users.sessions.delete(user.id, sessionId)
    if (!res?.ok)
      return handleError(
        "Une erreur est survenue lors de la déconnexion de l'appareil..."
      )
    handleSuccess("L'appareil a bien été déconnecté.")
    refresh() // Fetch sessions
  }
  const handleDeleteSession = async (sessionId) => {
    const title = "Déconnecter un appareil"
    const message =
      'Cet appareil sera automatiquement déconnecté dans 1 minute si vous cliquez sur "Confirmer". L\'utilisateur devra se connecter de nouveau sur cet appareil.'
    const nextBtnText = "Déconnecter l'appareil"
    const nextAction = async () => await deleteSession(sessionId)

    ConfirmDialog.setContent({ title, message, nextBtnText, nextAction })
    ConfirmDialog.handleOpen()
  }

  if (isFetching) return <PleaseWait />

  return (
    <>
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
                <Stack gap={4}>
                  <Grid container spacing={4}>
                    <DataRow>
                      <DeviceIcon type={session.device.type} />
                      <Label>Appareil</Label>
                      <DataValue>
                        {`${session.device.model || ""} ${
                          session.device.os.name
                        } (${session.device.os.version})`}
                      </DataValue>
                    </DataRow>
                    <DataRow>
                      <Language color="#fff" size="medium" />
                      <Label>Navigateur</Label>
                      <DataValue>
                        {session.device.browser || "Navigateur inconnu"}
                      </DataValue>
                    </DataRow>
                    <DataRow>
                      <Wifi color="#fff" size="medium" />
                      <Label>Réseau</Label>
                      <DataValue>
                        {mainLocation?.network || "Réseau inconnu"}
                      </DataValue>
                    </DataRow>
                    <DataRow>
                      <Clock color="#fff" size="medium" />
                      <Label>Dernière connexion</Label>
                      <DataValue>{formattedDate}</DataValue>
                    </DataRow>
                    <DataRow>
                      <Map color="#fff" size="medium" />
                      <Label>Localisation 1</Label>
                      <DataValue>{formattedMainLocation}</DataValue>
                    </DataRow>
                    <DataRow>
                      <Map color="#fff" size="medium" />
                      <Label>Localisation 2</Label>
                      <DataValue>{formattedSecondaryLocation}</DataValue>
                    </DataRow>
                  </Grid>

                  <PillButton
                    background={(theme) => theme.palette.error.main}
                    color="#fff"
                    preventTransitionOut
                    startIcon={<LogoutIcon />}
                    onClick={() => handleDeleteSession(session.id)}
                  >
                    Déconnecter
                  </PillButton>
                </Stack>
              </CustomAccordion>
            )
          })}
      </Stack>

      <CustomModal
        open={ConfirmDialog.open}
        handleClose={ConfirmDialog.handleClose}
      >
        <ConfirmDialog.DialogContent
          btnBackground={(theme) => theme.palette.error.main}
          btnColor="#fff"
        />
      </CustomModal>
    </>
  )
}

function DataRow(props) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Stack
        sx={{
          alignItems: "center",
        }}
        {...props}
      />
    </Grid>
  )
}
function Label(props) {
  return <BodyText preventTransition textAlign="center" {...props} />
}
function DataValue(props) {
  return (
    <BodyText
      color={(theme) => theme.palette.secondary.main}
      fontStyle="italic"
      preventTransitionOut
      textAlign="center"
      {...props}
    />
  )
}
function DeviceIcon({ type }) {
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
