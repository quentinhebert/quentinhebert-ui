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
import CustomAccordion from "../../Containers/custom-accordion"

const TextEditor = dynamic(() => import("../../TextEditor/text-editor"), {
  ssr: false,
})

export default function AdminTermsAndConditionsForm(props) {
  /********** PROPS **********/
  const { handleClose } = props

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const { mutate } = useSWR("termsAndConditions")

  /********** USE-STATES **********/
  const [richTextTerms, setRichTextTerms] = useState("")
  const [richTextConditions, setRichTextConditions] = useState("")

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
    const res = await apiCall.application.termsAndConditions.get()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setRichTextTerms(jsonRes.terms)
      setRichTextConditions(jsonRes.conditions)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSuccess = () => {
    setSnackSeverity("success")
    setSnackMessage("Mentions légales et CGV mises à jour")
    handleClose()
    mutate() // Refresh terms of use static props (SWR)
    fetchData() // reset form
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("Mentions légales et CGV non mises à jour")
  }
  const handleSave = async () => {
    const res = await apiCall.application.termsAndConditions.update({
      terms: richTextTerms,
      conditions: richTextConditions,
    })
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
    <Stack width="100%" gap={4} ref={ref} height="100%">
      <motion.div
        initial="hidden"
        variants={variants(0.5)}
        animate={controls}
        style={{ width: "100%" }}
      >
        <ModalTitle>Modifier les mentions légales et CGV</ModalTitle>
      </motion.div>

      <CustomForm gap={4} flexGrow={1} justifyContent="flex-start">
        <Stack width="100%" flexGrow={1}>
          <CustomAccordion title="Mentions légales">
            <TextEditor
              id="rte1"
              value={richTextTerms}
              setValue={setRichTextTerms}
              controls={[["h1"], ["bold", "italic"]]}
            />
          </CustomAccordion>

          <CustomAccordion title="Conditions Générales de Vente" flexGrow={1}>
            <TextEditor
              id="rte2"
              value={richTextConditions}
              setValue={setRichTextConditions}
              controls={[["h1"], ["bold", "italic"]]}
            />
          </CustomAccordion>
        </Stack>

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
      </CustomForm>
    </Stack>
  )
}
