import { Stack } from "@mui/material"
import React, { useState } from "react"
import RectangleButton from "../Buttons/rectangle-button"
import CustomModal from "../Modals/custom-modal"
import { ModalTitle } from "../Modals/Modal-Components/modal-title"
import BodyText from "../Text/body-text"
import PillButton from "../Buttons/pill-button"

function withConfirmAction(WrappedComponent) {
  function Enhancer(props) {
    const [actionToFire, setActionToFire] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [confirmTitle, setConfirmTitle] = useState("Confirmation")
    const [nextButtonText, setNextButtonText] = useState("Continuer")
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
          gap={4}
        >
          {/**** TITLE ****/}
          <ModalTitle>{confirmTitle}</ModalTitle>

          {/**** SIMPLE TEXT ****/}
          {confirmContent.text ? (
            <BodyText fontSize="1rem">{confirmContent.text}</BodyText>
          ) : null}

          {/**** COMPLEX JS ****/}
          {confirmContent.js ? confirmContent.js : null}

          {/**** BOTTOM BUTTONS ****/}
          <Stack gap={2} justifyContent="end">
            <PillButton onClick={handleNext}>{nextButtonText}</PillButton>
            <PillButton
              onClick={handleCancel}
              background="transparent"
              border={(theme) => `1px solid #fff`}
              color="#fff"
            >
              Annuler
            </PillButton>
          </Stack>
        </CustomModal>
      </>
    )
  }

  return Enhancer
}

export default withConfirmAction
