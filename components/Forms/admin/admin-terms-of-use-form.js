import { useState, useContext, useEffect } from "react"
import { Stack } from "@mui/material"
import apiCall from "../../../services/apiCalls/apiCall"
import { ModalTitle } from "../../Modals/Modal-Components/modal-title"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import useSWR from "swr"
import { AppContext } from "../../../contexts/AppContext"
import CustomForm from "../custom-form"
import RectangleButton from "../../Buttons/rectangle-button"
import dynamic from "next/dynamic"

const TextEditor = dynamic(() => import("../../TextEditor/text-editor"), {
  ssr: false,
})

export default function AdminTermsOfUseForm(props) {
  /********** PROPS **********/
  const { handleClose } = props

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const { mutate } = useSWR("termsOfUse")

  /********** USE-STATES **********/
  const [richTextValue, setRichTextValue] = useState("")

  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const variants = (key) => ({
    visible: {
      opacity: 1,
      y: 5,
      transition: { duration: 0.75, delay: key / 10 },
    },
    hidden: { opacity: 0, y: 0 },
  })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  /********** FUNCTIONS **********/
  const fetchData = async () => {
    const res = await apiCall.application.termsOfUse.get()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setRichTextValue(jsonRes)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSuccess = () => {
    setSnackSeverity("success")
    setSnackMessage("CGU mises à jour")
    handleClose()
    mutate() // Refresh terms of use static props (SWR)
    fetchData() // reset form
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("CGU non mises à jour")
  }
  const handleSave = async () => {
    const res = await apiCall.application.termsOfUse.update(richTextValue)
    if (res && res.ok) handleSuccess()
    else handleError()
  }

  const handleCancel = async () => {
    if (handleClose) handleClose()
    // reset form
    await fetchData()
  }

  /********** RENDER **********/
  return (
    <Stack
      width="100%"
      gap={4}
      ref={ref}
      sx={{ height: { xs: "80vh", md: "90vh" } }}
    >
      <motion.div
        initial="hidden"
        variants={variants(0.5)}
        animate={controls}
        style={{ width: "100%" }}
      >
        <ModalTitle>Modifier les CGU</ModalTitle>
      </motion.div>

      <CustomForm gap={4} sx={{ overflowY: "auto" }}>
        <TextEditor
          value={richTextValue}
          setValue={setRichTextValue}
          controls={[["h1"], ["bold", "italic"]]}
        />
      </CustomForm>

      <motion.div
        initial="hidden"
        variants={variants(4)}
        animate={controls}
        style={{ width: "100%" }}
      >
        <Stack flexDirection="row" gap={2} justifyContent="end">
          <RectangleButton onClick={handleCancel}>Annuler</RectangleButton>
          <RectangleButton secondary onClick={handleSave}>
            Enregistrer
          </RectangleButton>
        </Stack>
      </motion.div>
    </Stack>
  )
}
