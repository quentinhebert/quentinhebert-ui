import { CircularProgress, Stack } from "@mui/material"
import React, { useCallback, useContext, useState } from "react"
import { useDropzone } from "react-dropzone"
import AlertInfo from "../Other/alert-info"
import apiCall from "../../services/apiCalls/apiCall"
import { ModalTitle } from "../Modals/Modal-Components/modal-title"
import compressImage from "../../services/images"
import { UserContext } from "../../contexts/UserContext"
import { AppContext } from "../../contexts/AppContext"
import CustomModal from "../Modals/custom-modal"
import BodyText from "../text/body-text"
import RectangleButton from "../Buttons/rectangle-button"

export default function withAddAvatar(WrappedComponent) {
  return function Enhancer(props) {
    const {} = props

    const { setSnackSeverity, setSnackMessage } = useContext(AppContext)
    const { user } = useContext(UserContext)

    const [isLoading, setIsLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [uploadSuccess, setUploadSuccess] = useState(false)
    const [files, setFiles] = useState([])

    /***** HANDLE DROP IMAGES *****/
    const onDrop = useCallback((droppedFiles) => {
      const filesArray = droppedFiles.map((file) => {
        file.URL = URL.createObjectURL(file)
        return file
      })
      setFiles(filesArray)
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
    })

    /***** HANDLERS *****/
    const handleClose = () => setOpenModal(false)
    const handleCancel = () => {
      setFiles([]) // Remove selection
      setIsLoading(false) // Display initial modal state
      handleClose() // Close modal
    }
    const handleSuccess = () => {
      setSnackMessage("Votre nouvel avatar est spectaculaire ! 🤩")
      setSnackSeverity("success")
      setOpenModal(false)
      setIsLoading(false)
      setUploadSuccess(true) // to notify lower component
    }
    const handleError = () => {
      setSnackMessage("Houston, nos avons recontré un problème... 🤯")
      setSnackSeverity("error")
      setIsLoading(false)
    }
    const handleSendAvatar = async (event) => {
      event.stopPropagation()
      setIsLoading(true)
      // Compress the image before sending it to the API
      const compressedImage = await compressImage(files[0]) // We only take the first image of the selection (if selection is multiple)
      if (!compressedImage) handleError()
      // Prepare the payload
      let formData = new FormData()
      formData.append("avatar", compressedImage)
      // Send the image to the API
      const res = await apiCall.users.updateAvatar({ formData, user })
      if (res && res.ok) handleSuccess()
      else handleError()
    }

    // SUB-COMPONENTS
    const UploadingContent = () => (
      <Stack justifyContent="center" alignItems="center" direction="column">
        <BodyText>Téléchargement en cours...</BodyText>
        <CircularProgress style={{ margin: "4rem 0" }} color="secondary" />
      </Stack>
    )

    return (
      <>
        <WrappedComponent
          {...props}
          setOpenAddNewPhotosModal={setOpenModal}
          uploadSuccess={uploadSuccess}
        />

        <CustomModal open={openModal} handleClose={handleClose} gap={2}>
          <ModalTitle>Modifiez votre avatar</ModalTitle>

          {isLoading ? (
            <UploadingContent />
          ) : (
            <>
              <Stack
                {...getRootProps()}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minHeight="100px"
                borderRadius="5px"
                padding="1rem"
                sx={{
                  border: `solid 1px #fff`,
                  cursor: "pointer",
                }}
              >
                <input {...getInputProps()} />

                {files && files.length ? (
                  <BodyText fontSize="1rem" textAlign="center">
                    Déposez ou cliquez pour sélectionner une autre image...
                    <br />
                    (la nouvelle image écrasera la sélection actuelle)
                    <p />
                    Fichier sélectionné :
                    <br />
                    {files[0].name}
                  </BodyText>
                ) : (
                  <BodyText fontSize="1rem" textAlign="center">
                    Déposez ou cliquez pour sélectionner une image...
                  </BodyText>
                )}
              </Stack>

              <AlertInfo
                content={{
                  text: `JPG ou PNG uniquement`,
                  severity: "warning",
                }}
              />
            </>
          )}

          <Stack flexDirection="row" gap={2} justifyContent="end">
            <RectangleButton onClick={handleCancel}>Annuler</RectangleButton>
            <RectangleButton
              secondary="true"
              onClick={handleSendAvatar}
              disabled={!(files && files.length)}
            >
              Ajouter
            </RectangleButton>
          </Stack>
        </CustomModal>
      </>
    )
  }
}
