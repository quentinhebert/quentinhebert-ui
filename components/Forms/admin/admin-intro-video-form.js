import { useState, useContext, useEffect } from "react"
import { Box, Stack, Typography } from "@mui/material"
import apiCall from "../../../services/apiCalls/apiCall"
import { ModalTitle } from "../../Modals/Modal-Components/modal-title"
import { AppContext } from "../../../contexts/AppContext"
import CustomForm from "../custom-form"
import RectangleButton from "../../Buttons/rectangle-button"
import MotionDivFadeInOnMount from "../../Animation/motion-div-fade-in-on-mount"
import CustomFilledInput from "../../Inputs/custom-filled-input"
import PillButton from "../../Buttons/pill-button"

export default function AdminIntroVideoForm({ handleClose }) {
  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  /********** USE-STATES **********/
  const [url, setUrl] = useState(null)
  const [loading, setLoading] = useState(false)

  /********** FUNCTIONS **********/
  const fetchData = async () => {
    const res = await apiCall.application.introductionVideo.get()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setUrl(jsonRes.url)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSuccess = () => {
    setSnackSeverity("success")
    setSnackMessage("Votre nouvelle vidéo est publiée")
    handleClose()
    fetchData() // reset form
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("Le lien de la vidéo n'a pas pu être mis à jour")
  }
  const handleSave = async () => {
    setLoading(true)
    const res = await apiCall.application.introductionVideo.update({ url })
    if (res && res.ok) handleSuccess()
    else handleError()
    setLoading(false)
  }
  const handleCancel = async () => {
    if (handleClose) handleClose()
    // reset form
    setUrl(null)
    await fetchData()
  }

  /********** RENDER **********/
  return (
    <MotionDivFadeInOnMount>
      <Stack width="100%" gap={4}>
        <ModalTitle>Modifier votre vidéo de présentation</ModalTitle>

        <CustomForm>
          <CustomFilledInput
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            label="URL Vimeo ou YouTube"
            autoFocus
          />

          <Stack gap={2} width="100%">
            <PillButton type="submit" onClick={handleSave} disabled={loading}>
              {loading ? "Patientez..." : "Enregistrer"}
            </PillButton>
            <Box margin="auto">
              <Typography
                color="#fff"
                onClick={handleCancel}
                className="cool-button pointer"
              >
                Annuler
              </Typography>
            </Box>
          </Stack>
        </CustomForm>
      </Stack>
    </MotionDivFadeInOnMount>
  )
}
