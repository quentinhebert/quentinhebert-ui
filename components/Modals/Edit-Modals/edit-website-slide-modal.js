import { Stack } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import { ModalTitle } from "../Modal-Components/modal-title"
import withConfirmAction from "../../hocs/withConfirmAction"
import CustomModal from "../../ReusableComponents/modals/custom-modal"
import CustomForm from "../../ReusableComponents/forms/custom-form"
import CustomOutlinedInput from "../../ReusableComponents/forms/custom-outlined-input"
import CustomSubmitButton from "../../ReusableComponents/forms/custom-submit-button"
import CustomCircularProgress from "../../ReusableComponents/custom-circular-progress"
import { AppContext } from "../../../contexts/AppContext"
import SmallTitle from "../../ReusableComponents/titles/small-title"
import ModeEditIcon from "@mui/icons-material/ModeEdit"
import {
  formatDescription,
  formatTitle,
  ParseJsx,
} from "../../Layouts/websites/WebsiteWhyADev--style"
import dynamic from "next/dynamic"

const TextEditor = dynamic(
  () => import("../../ReusableComponents/text-editor/text-editor"),
  { ssr: false }
)

const SectionTitle = (props) => (
  <Stack width="100%" alignItems="center">
    <SmallTitle textTransform="Initial" className="flex gap-10" {...props} />
  </Stack>
)

export default function EditWebsiteSlideModal(props) {
  const { slideId, openEditModal, handleCloseEditModal } = props

  // APP CONTEXT
  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const initialSlide = {
    id: null,
    description: "",
    title: "",
  }
  const [slide, setSlide] = useState(initialSlide)
  const [isLoading, setIsLoading] = useState(false)
  const [richTextDescription, setRichTextDescription] = useState("")
  const [richTextTitle, setRichTextTitle] = useState("")
  const [edit, setEdit] = useState(null)
  const EDITS = { TITLE: "title", DESCRIPTION: "description" }

  // Fetch data
  const fetchData = async () => {
    const res = await apiCall.admin.getWebsiteSlide(slideId)
    const jsonRes = await res.json()
    setSlide(jsonRes)
    setRichTextDescription(jsonRes.description)
    setRichTextTitle(jsonRes.title)
  }

  // We immediately fetch up-to-date data
  useEffect(() => {
    if (slideId) {
      fetchData()
    }
    setEdit(null)
  }, [slideId, openEditModal])

  // HANDLERS
  const handleCancel = () => {
    handleCloseEditModal()
  }
  const handleSuccess = () => {
    setSnackSeverity("success")
    setSnackMessage("La slide a été mise à jour !")
    handleCloseEditModal()
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("Une erreur est survenue")
  }
  const handleUpdate = async () => {
    setIsLoading(true)
    const res = await apiCall.admin.updateWebsiteSlide(slide)
    if (res && res.ok) handleSuccess()
    else handleError()
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

  // SUB-COMPONENTS
  const IdInput = () => (
    <CustomOutlinedInput
      disabled
      type="input"
      id="id"
      label="ID"
      value={slide.id || ""}
    />
  )

  return (
    <CustomModal
      fullscreen
      open={openEditModal}
      handleClose={handleCloseEditModal}
      gap={4}
    >
      <ModalTitle>Modifier la diapositive textuelle</ModalTitle>

      <CustomForm gap={3} flexGrow={1}>
        <IdInput />

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
              <ParseJsx jsx={formatTitle(slide.title || "")} />
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
              <ParseJsx jsx={formatDescription(slide.description || "")} />
            </Stack>
          )}
        </Stack>

        <Stack flexDirection="row" gap={2} justifyContent="end" width="100%">
          <CustomSubmitButton onClick={handleCancel}>
            Annuler
          </CustomSubmitButton>
          <CustomSubmitButton
            secondary="true"
            onClick={handleUpdate}
            disabled={isLoading}
          >
            {isLoading ? <CustomCircularProgress /> : "Enregistrer"}
          </CustomSubmitButton>
        </Stack>
      </CustomForm>
    </CustomModal>
  )
}
