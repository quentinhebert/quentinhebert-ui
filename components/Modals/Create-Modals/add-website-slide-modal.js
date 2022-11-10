import { Stack } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import { ModalTitle } from "../Modal-Components/modal-title"
import { AppContext } from "../../../contexts/AppContext"
import dynamic from "next/dynamic"
import {
  formatDescription,
  formatTitle,
  ParseJsx,
} from "../../Sections/Websites/Index/WhyADev/why-a-dev--style"
import CustomModal from "../custom-modal"
import CustomForm from "../../Forms/custom-form"
import RectangleButton from "../../Buttons/rectangle-button"
import SmallTitle from "../../Titles/small-title"
import CustomCircularProgress from "../../Helpers/custom-circular-progress"
import BodyText from "../../Text/body-text"
import SwitchButton from "../../Inputs/switch-button"
import useSWR from "swr"

const TextEditor = dynamic(() => import("../../TextEditor/text-editor"), {
  ssr: false,
})

export default function AddWebsiteSlideModal(props) {
  const { refreshData, open, handleClose } = props

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const initialSlide = {
    description: "",
    title: "",
  }
  const [slide, setSlide] = useState(initialSlide)
  const [isLoading, setIsLoading] = useState(false)
  const [richTextDescription, setRichTextDescription] = useState("")
  const [richTextTitle, setRichTextTitle] = useState("")
  const [edit, setEdit] = useState(true)

  const { mutate } = useSWR("websiteSlides")

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
      mutate()
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
        <Stack className="row flex-center">
          <BodyText marginRight={3}>Prévisualiser</BodyText>
          <SwitchButton checked={edit} handleCheck={toggleEdit} />{" "}
          <BodyText>Modifier</BodyText>
        </Stack>

        <Stack flexGrow={1} gap={3} width="100%">
          {!edit && (
            <>
              <Stack color="#fff" width="100%">
                <ParseJsx jsx={formatTitle(slide.title || "")} />
                <ParseJsx jsx={formatDescription(slide.description || "")} />
              </Stack>
            </>
          )}

          {edit && (
            <>
              <SmallTitle textAlign="center">Titre</SmallTitle>
              <TextEditor
                id="rte1"
                value={richTextTitle}
                setValue={setRichTextTitle}
                controls={[["italic"]]}
              />
              <SmallTitle textAlign="center">Description</SmallTitle>
              <TextEditor
                id="rte2"
                value={richTextDescription}
                setValue={setRichTextDescription}
                controls={[["bold"]]}
              />
            </>
          )}
        </Stack>

        <Stack flexDirection="row" gap={2} justifyContent="end" width="100%">
          <RectangleButton onClick={handleCancel}>Annuler</RectangleButton>
          <RectangleButton secondary="true" onClick={handleCreate}>
            {isLoading ? <CustomCircularProgress /> : "Enregistrer"}
          </RectangleButton>
        </Stack>
      </CustomForm>
    </CustomModal>
  )
}
