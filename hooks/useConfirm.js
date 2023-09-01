import { Stack } from "@mui/material"
import { useState } from "react"
import BodyText from "../components/Text/body-text"
import { ModalTitle } from "../components/Modals/Modal-Components/modal-title"
import PillButton from "../components/Buttons/pill-button"
import CancelButton from "../components/Buttons/cancel-button"

export default function useConfirm() {
  const [confirmContent, setConfirmContent] = useState({})
  const [open, setOpen] = useState(false)

  function setContent({ title, message, nextAction, nextBtnText }) {
    setConfirmContent({ title, message, nextAction, nextBtnText })
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleNext = () => {
    if (!!confirmContent.nextAction) confirmContent.nextAction()
    return handleClose()
  }

  // New system that replaces the deprecated dialog
  const DialogContent = ({ btnBackground, btnColor }) => {
    if (!confirmContent.title || !confirmContent.nextAction) return <></>

    return (
      <>
        {/**** TITLE ****/}
        <ModalTitle>{confirmContent?.title || ""}</ModalTitle>
        {/**** DESCRIPTION ****/}
        <BodyText preventTransition>{confirmContent?.message || ""}</BodyText>
        {/**** BOTTOM BUTTONS ****/}
        <Stack gap={2} alignItems="center">
          <PillButton
            width="100%"
            color={btnColor || "#000"}
            background={
              btnBackground || ((theme) => theme.palette.secondary.main)
            }
            onClick={handleNext || (() => {})}
          >
            {confirmContent.nextBtnText || "Confirmer"}
          </PillButton>
          <CancelButton variant="text" handleCancel={handleClose} />
        </Stack>
      </>
    )
  }

  return {
    open,
    setOpen,
    DialogContent,
    setContent,
    handleOpen,
    handleClose,
  }
}
