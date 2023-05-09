import { useState, useContext, useEffect } from "react"
import { Box, Stack } from "@mui/material"
import apiCall from "../../../services/apiCalls/apiCall"
import { ModalTitle } from "../../Modals/Modal-Components/modal-title"
import useSWR from "swr"
import { AppContext } from "../../../contexts/AppContext"
import CustomForm from "../custom-form"
import RectangleButton from "../../Buttons/rectangle-button"
import MotionDivFadeInOnMount from "../../Animation/motion-div-fade-in-on-mount"
import DropzoneShowImage from "../../Images/drop-zone-show-image"

export default function AdminLogoForm(props) {
  /********** PROPS **********/
  const { handleClose } = props

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const footer = useSWR("footer")
  const navbar = useSWR("navbar")

  /********** USE-STATES **********/
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  /********** FUNCTIONS **********/
  const fetchLogo = async () => {
    const res = await apiCall.application.logo.getPublic()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setFile(jsonRes)
    }
  }

  useEffect(() => {
    fetchLogo()
  }, [])

  const handleSuccess = () => {
    setSnackSeverity("success")
    setSnackMessage("Logo mis à jour")
    handleClose()
    // Refresh footer and navbar static props (SWR)
    footer.mutate()
    navbar.mutate()
    fetchLogo() // reset form
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("Footer non mis à jour")
  }
  const handleSaveLogo = async () => {
    setLoading(true)
    const res = await apiCall.application.logo.update(file)
    if (res && res.ok) handleSuccess()
    else handleError()
    setLoading(false)
  }
  const handleCancel = async () => {
    if (handleClose) handleClose()
    // reset form
    setFile(null)
    await fetchLogo()
  }

  /********** RENDER **********/
  return (
    <MotionDivFadeInOnMount>
      <Stack width="100%" gap={8}>
        <ModalTitle>Modifier le logo de votre site</ModalTitle>

        <CustomForm gap={8}>
          <Stack gap={4} className="full-width flex-center">
            {file && (
              <Box
                component="img"
                src={file?.URL}
                width="100px"
                sx={{ border: "1px solid #fff", borderRadius: "5px" }}
              />
            )}
            <DropzoneShowImage
              hidden
              bgImage={file?.url || ""}
              file={file}
              setFile={setFile}
            />
          </Stack>

          <Stack flexDirection="row" gap={2} justifyContent="end">
            <RectangleButton onClick={handleCancel}>Annuler</RectangleButton>
            <RectangleButton
              secondary="true"
              onClick={handleSaveLogo}
              disabled={!file?.size || loading}
            >
              {loading ? "Patientez..." : "Enregistrer"}
            </RectangleButton>
          </Stack>
        </CustomForm>
      </Stack>
    </MotionDivFadeInOnMount>
  )
}
