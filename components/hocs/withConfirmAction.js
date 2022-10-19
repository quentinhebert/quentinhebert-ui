import { Stack } from "@mui/material"
import React, { useState } from "react"
import { ModalTitle } from "../Modals/Modal-Components/modal-title"
import CustomModal from "../ReusableComponents/modals/custom-modal"
import CustomSubmitButton from "../ReusableComponents/forms/custom-submit-button"
import BodyText from "../ReusableComponents/text/body-text"

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
      setNextButtonText("Continuer")
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
          {/**** TITLE ****/}
          <ModalTitle>{confirmTitle}</ModalTitle>

          {/**** SIMPLE TEXT ****/}
          {confirmContent.text ? (
            <BodyText fontSize="1rem">{confirmContent.text}</BodyText>
          ) : null}

          {/**** COMPLEX JS ****/}
          {confirmContent.js ? content.js : null}

          {/**** BOTTOM BUTTONS ****/}
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
