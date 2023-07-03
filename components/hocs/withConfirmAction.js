import { Stack } from "@mui/material"
import React, { useState } from "react"
import RectangleButton from "../Buttons/rectangle-button"
import CustomModal from "../Modals/custom-modal"
import { ModalTitle } from "../Modals/Modal-Components/modal-title"
import BodyText from "../Text/body-text"
import PillButton from "../Buttons/pill-button"
import EastIcon from "@mui/icons-material/East"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"

const VARIANTS = ["delete", "add", "next", "default"]

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
    const [variant, setVariant] = useState("default")

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
    const getBtnBgColor = () => {
      switch (variant) {
        case "add":
          return (theme) => theme.palette.secondary.main
        case "delete":
          return (theme) => theme.palette.error.main
        case "next":
          return (theme) => theme.palette.secondary.main
        case "default":
          return (theme) => theme.palette.secondary.main
      }
    }
    const getBtnColor = () => {
      switch (variant) {
        case "add":
          return "#000"
        case "delete":
          return (theme) => theme.palette.text.white
        case "next":
          return "#000"
        case "default":
          return "#000"
      }
    }
    const getBtnIcon = () => {
      switch (variant) {
        case "add":
          return <AddIcon />
        case "delete":
          return <DeleteIcon />
        case "next":
          return <EastIcon />
        case "default":
          return <></>
      }
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
          setConfirmVariant={setVariant}
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
            <PillButton
              onClick={handleNext}
              background={getBtnBgColor()}
              color={getBtnColor()}
              gap={1}
            >
              {nextButtonText} {getBtnIcon()}
            </PillButton>
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
