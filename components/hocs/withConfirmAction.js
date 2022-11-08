import { Stack } from "@mui/material"
import React, { useState } from "react"
import RectangleButton from "../Buttons/rectangle-button"
import CustomModal from "../Modals/custom-modal"
import { ModalTitle } from "../Modals/Modal-Components/modal-title"
import BodyText from "../Text/body-text"

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
            <RectangleButton onClick={handleCancel}>Annuler</RectangleButton>
            <RectangleButton secondary="true" onClick={handleNext}>
              {nextButtonText}
            </RectangleButton>
          </Stack>
        </CustomModal>
      </>
    )
  }

  return Enhancer
}

export default withConfirmAction
