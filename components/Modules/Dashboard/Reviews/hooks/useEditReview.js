import { Box, Divider, Stack, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import CustomModal from "../../../../Modals/custom-modal"
import PillButton from "../../../../Buttons/pill-button"
import apiCall from "../../../../../services/apiCalls/apiCall"
import CustomIconButton from "../../../../Buttons/custom-icon-button"
import CloseIcon from "@mui/icons-material/Close"
import DeleteIcon from "@mui/icons-material/Delete"
import LaunchIcon from "@mui/icons-material/Launch"
import useConfirm from "../../../../../hooks/useConfirm"
import CustomFilledInput from "../../../../Inputs/custom-filled-input"
import { defaultConfig } from "../../../../../config/defaultConfig"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import { AppContext } from "../../../../../contexts/AppContext"
import SwitchButton from "../../../../Inputs/switch-button"
import { Context } from "../module"

export default function useEditReview({ refreshData }) {
  const { setSnackMessage, setSnackSeverity } = useContext(AppContext)
  const { state, setState, fetchReviews } = useContext(Context)
  const Confirm = useConfirm()

  const [open, setOpen] = useState(false)
  const [toggleValues, setToggleValues] = useState({
    editable: state.selectedReview.editable,
    visible: state.selectedReview.visible,
  })

  useEffect(() => {
    setToggleValues({
      editable: state.selectedReview.editable,
      visible: state.selectedReview.visible,
    })
  }, [state.selectedReview.editable, state.selectedReview.visible])

  const handleClose = () => setOpen(false)
  const handleOpenEditReviewModal = () => setOpen(true)
  const handleCancel = handleClose

  function toggleVisible() {
    setState({
      ...state,
      selectedReview: {
        ...state.selectedReview,
        visible: !state.selectedReview.visible,
      },
    })
    setToggleValues({
      ...toggleValues,
      visible: !toggleValues.visible,
    })
  }
  function toggleEditable() {
    setState({
      ...state,
      selectedReview: {
        ...state.selectedReview,
        editable: !state.selectedReview.editable,
      },
    })
    setToggleValues({
      ...toggleValues,
      editable: !toggleValues.editable,
    })
  }

  useEffect(() => {
    if (!!state.selectedReview.id) saveToggle()
  }, [toggleValues])

  async function saveToggle() {
    const res = await apiCall.reviews.update({
      id: state.selectedReview.id,
      visible: toggleValues.visible,
      editable: toggleValues.editable,
    })
    if (!res?.ok) {
      setSnackMessage("Une erreur est survenue...")
      setSnackSeverity("error")
    }
    await fetchReviews()
  }
  async function deleteReview() {
    Confirm.setLoading(true)
    const res = await apiCall.reviews.delete({ id: state.selectedReview.id })
    if (!res?.ok) {
      setSnackMessage("Une erreur est survenue...")
      setSnackSeverity("error")
    }
    Confirm.setLoading(false)
    Confirm.setOpen(false) // Close confirm modal
    handleClose() // Close edit modal
    refreshData()
  }
  async function handleDelete() {
    Confirm.setContent({
      title: "Supprimer l'avis",
      nextAction: async () => await deleteReview(),
      nextBtnText: "Oui, supprimer l'avis",
    })
    Confirm.setOpen(true)
  }

  const EditReviewDialog = ({}) => {
    return (
      <>
        <CustomModal open={open} handleClose={handleClose} gap={6}>
          {/**** TITLE ****/}

          <SwitchButton
            label="Modifiable"
            handleCheck={toggleEditable}
            checked={toggleValues.editable}
          />

          <Stack
            className="row flex-center gap-10"
            sx={{
              display: toggleValues.editable ? "flex" : "none !important",
            }}
          >
            <CustomFilledInput
              disabled
              label="URL pour modifier l'avis"
              value={`${defaultConfig.webclientUrl}/reviews/${state.selectedReview.id}`}
            />
            <CustomIconButton
              icon={<ContentCopyIcon />}
              onClick={() => {
                navigator.clipboard.writeText(
                  `${defaultConfig.webclientUrl}/reviews/${state.selectedReview.id}`
                )
                setSnackMessage("URL copiée")
                setSnackSeverity("success")
              }}
            />
            <CustomIconButton
              icon={<LaunchIcon />}
              onClick={() =>
                window.open(
                  `${defaultConfig.webclientUrl}/reviews/${state.selectedReview.id}`
                )
              }
            />
          </Stack>

          <Divider />

          <SwitchButton
            label="Afficher sur le site"
            handleCheck={toggleVisible}
            checked={toggleValues.visible}
          />

          <Divider />

          <PillButton
            startIcon={<DeleteIcon />}
            color="error.main"
            background="transparent"
            border={(theme) => `1px solid ${theme.palette.error.main}`}
            onClick={handleDelete}
          >
            Supprimer l'avis
          </PillButton>

          <Divider />

          {/**** BOTTOM BUTTONS ****/}
          <Stack flexDirection="row" gap={2} margin="auto">
            <CustomIconButton
              onClick={handleCancel}
              icon={<CloseIcon />}
              tooltip="Fermer"
            />
          </Stack>
        </CustomModal>

        <CustomModal open={Confirm.open} handleClose={Confirm.handleClose}>
          <Confirm.DialogContent />
        </CustomModal>
      </>
    )
  }

  return { handleOpenEditReviewModal, EditReviewDialog }
}
