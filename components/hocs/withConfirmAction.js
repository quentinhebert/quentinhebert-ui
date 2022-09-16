import { Stack, Typography, useMediaQuery } from "@mui/material"
import Dialog from "@mui/material/Dialog"
import React, { useState } from "react"
import { ActionButtons } from "../Modals/Modal-Components/modal-action-buttons"
import { ModalTitle } from "../Modals/Modal-Components/modal-title"
import theme from "../../config/theme"
import CustomModal from "../ReusableComponents/modals/custom-modal"
import CustomSubmitButton from "../ReusableComponents/forms/custom-submit-button"

function withConfirmAction(WrappedComponent) {
  function Enhancer(props) {
    const [actionToFire, setActionToFire] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [confirmTitle, setConfirmTitle] = useState("Confirmation")
    const [nextButtonText, setNextButtonText] = useState("Continue")
    const [confirmContent, setConfirmContent] = useState({
      text: null,
      js: null,
    })

    const closeAndcleanState = () => {
      setActionToFire(null)
      setConfirmTitle("Confirmation")
      setNextButtonText("Continue")
      setConfirmContent({ text: null, js: null })
      setOpenModal(false)
    }

    const handleCancel = (e) => {
      e.preventDefault()
      closeAndcleanState()
    }

    const handleNext = async (e) => {
      e.preventDefault()
      actionToFire()
      closeAndcleanState()
    }

    /********** STYLE **********/
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

    return (
      <>
        <WrappedComponent
          {...props}
          setActionToFire={setActionToFire}
          setOpenConfirmModal={setOpenModal}
          setConfirmTitle={setConfirmTitle}
          setNextButtonText={setNextButtonText}
          setConfirmContent={setConfirmContent}
        />

        <CustomModal
          open={
            !!(
              openModal &&
              nextButtonText &&
              (confirmContent.js || confirmContent.text)
            )
          }
          handleClose={() => setOpenModal(false)}
          gap={2}
        >
          <ModalTitle>{confirmTitle}</ModalTitle>

          {confirmContent.text ? (
            <Typography color="text.white">{confirmContent.text}</Typography>
          ) : null}
          {confirmContent.js ? content.js : null}

          <Stack flexDirection="row" gap={2} justifyContent="end">
            <CustomSubmitButton onClick={handleCancel}>
              Annuler
            </CustomSubmitButton>
            <CustomSubmitButton secondary="true" onClick={handleNext}>
              {nextButtonText}
            </CustomSubmitButton>
          </Stack>
        </CustomModal>
      </>
    )
  }

  return Enhancer
}

export default withConfirmAction
