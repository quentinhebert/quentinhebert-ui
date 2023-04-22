import { Stack } from "@mui/material"
import { useState } from "react"
import CustomModal from "../components/Modals/custom-modal"
import BodyText from "../components/Text/body-text"
import { ModalTitle } from "../components/Modals/Modal-Components/modal-title"
import PillButton from "../components/Buttons/pill-button"
import CancelButton from "../components/Buttons/cancel-button"

export default function useConfirm() {
  const [confirmAction, setConfirmAction] = useState(null)
  const [nextBtnText, setNextBtnText] = useState(null)
  const [confirmTitle, setConfirmTitle] = useState(null)
  const [confirmMsg, setConfirmMsg] = useState(null)
  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)
  const handleCancel = handleClose

  const handleNext = () => {
    if (!!confirmAction) confirmAction()
    return handleClose()
  }

  const ConfirmationDialog = ({ bg }) => (
    <CustomModal open={open} handleClose={handleClose} gap={6}>
      {/**** TITLE ****/}
      <ModalTitle>{confirmTitle}</ModalTitle>

      {/**** COMPLEX JS ****/}
      <BodyText preventTransition>{confirmMsg}</BodyText>

      {/**** BOTTOM BUTTONS ****/}
      <Stack gap={2} alignItems="center">
        <PillButton
          background={bg || ((theme) => theme.palette.secondary.main)}
          onClick={handleNext}
        >
          {nextBtnText}
        </PillButton>
        <CancelButton variant="text" handleCancel={handleCancel} />
      </Stack>
    </CustomModal>
  )

  return [
    setConfirmTitle,
    setConfirmMsg,
    setNextBtnText,
    setConfirmAction,
    handleOpen,
    ConfirmationDialog,
  ]
}
