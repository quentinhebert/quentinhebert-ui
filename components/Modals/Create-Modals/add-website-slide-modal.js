import { Stack } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import { ModalTitle } from "../Modal-Components/modal-title"
import withConfirmAction from "../../hocs/withConfirmAction"
import CustomModal from "../../ReusableComponents/modals/custom-modal"
import CustomForm from "../../ReusableComponents/forms/custom-form"
import CustomSubmitButton from "../../ReusableComponents/forms/custom-submit-button"
import CustomCircularProgress from "../../ReusableComponents/custom-circular-progress"
import { AppContext } from "../../../contexts/AppContext"
import dynamic from "next/dynamic"
import SmallTitle from "../../ReusableComponents/titles/small-title"
import ModeEditIcon from "@mui/icons-material/ModeEdit"
import {
  formatDescription,
  formatTitle,
  ParseJsx,
} from "../../Layouts/websites/WebsiteWhyADev--style"

const TextEditor = dynamic(
  () => import("../../ReusableComponents/text-editor/text-editor"),
  { ssr: false }
)

const SectionTitle = (props) => (
  <Stack width="100%" alignItems="center">
    <SmallTitle textTransform="Initial" className="flex gap-10" {...props} />
  </Stack>
)

const currentYear = new Date().getFullYear()

function AddWebsiteSlideModal(props) {
  const {
    refreshData,
    open,
    handleClose,
    setActionToFire,
    setOpenConfirmModal,
    setConfirmTitle,
    setConfirmContent,
  } = props

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const initialSlide = {
    description: "",
    title: "",
  }
  const [slide, setSlide] = useState(initialSlide)
  const [isLoading, setIsLoading] = useState(false)
  const [richTextDescription, setRichTextDescription] = useState("")
  const [richTextTitle, setRichTextTitle] = useState("")
  const EDITS = { TITLE: "title", DESCRIPTION: "description" }
  const [edit, setEdit] = useState(null)

  // HANDLERS
  const handleCancel = () => {
    setSlide(initialSlide)
    setRichTextDescription("")
    setRichTextTitle("")
    handleClose()
  }
  const handleSuccess = () => {
    setSnackSeverity("success")
    setSnackMessage("La slide a été enregistrée !")
    handleClose()
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("La slide n'a pas pu être enregistrée...")
  }
  const handleCreate = async () => {
    setIsLoading(true)
    const res = await apiCall.websites.slides.add(slide)
    if (res && res.ok) {
      handleSuccess()
      refreshData() // Refresh all rows of custom table
    } else {
      // TODO: if new thumbnail uploaded but slide update fails, need to remove file just uploaded (DB and FTP)
      handleError()
    }
    setIsLoading(false)
  }

  const toggleEdit = (mode) => {
    if (mode === edit) return setEdit(null)
    return setEdit(mode)
  }

  // Handle change
  useEffect(() => {
    setSlide({ ...slide, title: richTextTitle })
  }, [richTextTitle])
  useEffect(() => {
    setSlide({ ...slide, description: richTextDescription })
  }, [richTextDescription])

  return (
    <CustomModal open={open} handleClose={handleClose} gap={4} fullscreen>
      <ModalTitle>Ajouter une slide</ModalTitle>

      <CustomForm gap={3} height="100%">
        <Stack flexGrow={1} gap={3} width="100%">
          <SectionTitle>
            Titre{" "}
            <ModeEditIcon
              className="pointer"
              onClick={() => toggleEdit(EDITS.TITLE)}
            />
          </SectionTitle>
          {edit === EDITS.TITLE ? (
            <TextEditor
              value={richTextTitle}
              setValue={setRichTextTitle}
              controls={[["italic"]]}
            />
          ) : (
            // See a demo of the expected result
            <Stack color="#fff" width="100%">
              <ParseJsx jsx={formatTitle(slide.title)} />
            </Stack>
          )}

          <SectionTitle>
            Description{" "}
            <ModeEditIcon
              className="pointer"
              onClick={() => toggleEdit(EDITS.DESCRIPTION)}
            />
          </SectionTitle>
          {edit === EDITS.DESCRIPTION ? (
            <TextEditor
              value={richTextDescription}
              setValue={setRichTextDescription}
              controls={[["bold"]]}
            />
          ) : (
            // See a demo of the expected result
            <Stack color="#fff" width="100%">
              <ParseJsx jsx={formatDescription(slide.description)} />
            </Stack>
          )}
        </Stack>

        <Stack flexDirection="row" gap={2} justifyContent="end" width="100%">
          <CustomSubmitButton onClick={handleCancel}>
            Annuler
          </CustomSubmitButton>
          <CustomSubmitButton secondary="true" onClick={handleCreate}>
            {isLoading ? <CustomCircularProgress /> : "Enregistrer"}
          </CustomSubmitButton>
        </Stack>
      </CustomForm>
    </CustomModal>
  )
}

export default withConfirmAction(AddWebsiteSlideModal)
