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

function withAddAvatar(WrappedComponent) {
  function Enhancer(props) {
    const { user, refresh, setMessageSnack, setOpenSnackBar, setSeverity } =
      props
    const [isLoading, setIsLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [uploadSuccess, setUploadSuccess] = useState(false)
    const [files, setFiles] = useState([])

    // Max size limit is set to 20Mo if its an upload to a galery, otherwise the size limit is increased up to 50Mo if it's an upload to an album
    const sizeLimit = 6

    const onDrop = useCallback((acceptedFiles) => {
      // Do something with the file
      const filesArray = acceptedFiles.map((oneFile) => {
        oneFile.URL = URL.createObjectURL(oneFile)
        return oneFile
      })
      setFiles(filesArray)
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
    })

    const handleSuccess = () => {
      setMessageSnack("Votre nouvel avatar est spectaculaire ! 🤩")
      setSeverity("success")
      setOpenSnackBar(true)
      setOpenModal(false)
      setIsLoading(false)
      setUploadSuccess(true) // to notify lower component
    }

    const handleSetPhotos = async (event) => {
      event.stopPropagation()
      setIsLoading(true)
      // Check max size limit whether its an album or a galery
      if (files.some((file) => file.size > sizeLimit * 1000 * 1000)) {
        setMessageSnack(
          "L'image que vous avez sélectionnée est trop volumineuse"
        )
        setSeverity("error")
        setOpenSnackBar(true)
        setIsLoading(false)
        return
      }
      let formData = new FormData()
      formData.append("avatar", files[0]) // We will take the first of the list
      const res = await apiCall.users.updateAvatar({ formData, user })
      if (res && res.ok) handleSuccess()
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

        <CustomModal
          open={openModal}
          handleClose={() => setOpenModal(false)}
          gap={2}
        >
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
                  text: `JPG ou PNG (${sizeLimit}Mo maximum)`,
                  severity: "warning",
                }}
              />
            </>
          )}

          <Stack flexDirection="row" gap={2} justifyContent="end">
            <CustomSubmitButton onClick={() => setOpenModal(false)}>
              Annuler
            </CustomSubmitButton>
            <CustomSubmitButton
              secondary="true"
              onClick={handleSetPhotos}
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

export default withAddAvatar
