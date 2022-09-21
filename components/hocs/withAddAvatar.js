import { CircularProgress, Stack } from "@mui/material"
import React, { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import withSnacks from "./withSnacks"
import AlertInfo from "../Other/alert-info"
import apiCall from "../../services/apiCalls/apiCall"
import CustomModal from "../ReusableComponents/modals/custom-modal"
import { ModalTitle } from "../Modals/Modal-Components/modal-title"
import CustomSubmitButton from "../ReusableComponents/forms/custom-submit-button"
import BodyText from "../ReusableComponents/text/body-text"
import compressImage from "../../services/images"

export default function withAddAvatar(WrappedComponent) {
  function Enhancer(props) {
    const { user, setMessageSnack, setOpenSnackBar, setSeverity } = props
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
      setMessageSnack("Votre nouvel avatar est spectaculaire ! 🤩")
      setSeverity("success")
      setOpenSnackBar(true)
      setOpenModal(false)
      setIsLoading(false)
      setUploadSuccess(true) // to notify lower component
    }
    const handleError = () => {
      setMessageSnack("Houston, nos avons recontré un problème... 🤯")
      setSeverity("error")
      setOpenSnackBar(true)
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
            <CustomSubmitButton onClick={handleCancel}>
              Annuler
            </CustomSubmitButton>
            <CustomSubmitButton
              secondary="true"
              onClick={handleSendAvatar}
              disabled={!(files && files.length)}
            >
              Ajouter
            </CustomSubmitButton>
          </Stack>
        </CustomModal>
      </>
    )
  }
  return withSnacks(Enhancer)
}
