import { useState, useContext, useEffect } from "react"
import { Stack } from "@mui/material"
import apiCall from "../../../services/apiCalls/apiCall"
import AlertInfo from "../../Other/alert-info"
import { ModalTitle } from "../../Modals/Modal-Components/modal-title"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import useSWR from "swr"
import { AppContext } from "../../../contexts/AppContext"
import CustomForm from "../custom-form"
import RectangleButton from "../../Buttons/rectangle-button"
import CustomFilledTextArea from "../../Inputs/custom-filled-text-area"

export default function AdminFooterForm(props) {
  /********** PROPS **********/
  const { handleClose } = props

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const { mutate } = useSWR("footer")

  /********** USE-STATES **********/
  const [credits, setCredits] = useState({ fr: "", en: "" })
  const [showAlert, setShowAlert] = useState({
    show: false,
    severity: null,
    text: null,
    title: null,
  })

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
  const fetchFooter = async () => {
    const res = await apiCall.application.footer.getPublic()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setCredits(jsonRes.credits)
    }
  }

  useEffect(() => {
    fetchFooter()
  }, [])

  const handleSuccess = () => {
    setSnackSeverity("success")
    setSnackMessage("Footer mis à jour")
    handleClose()
    mutate() // Refresh footer static props (SWR)
    fetchFooter() // reset form
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("Footer non mis à jour")
  }
  const handleSaveFooter = async () => {
    const res = await apiCall.application.footer.update(credits)
    if (res && res.ok) handleSuccess()
    else handleError()
  }

  const handleCancel = async () => {
    if (handleClose) handleClose()
    // reset form
    await fetchFooter()
  }

  /********** RENDER **********/
  return (
    <Stack width="100%" gap={4} ref={ref}>
      <motion.div
        initial="hidden"
        variants={variants(0.5)}
        animate={controls}
        style={{ width: "100%" }}
      >
        <ModalTitle>Modifier le footer</ModalTitle>
      </motion.div>

      <CustomForm gap={4}>
        <motion.div
          initial="hidden"
          variants={variants(2)}
          animate={controls}
          style={{ width: "100%" }}
        >
          <Stack gap={2} width="100%">
            <CustomFilledTextArea
              label="Modifier les crédits"
              id="credits"
              value={credits.fr}
              onChange={(e) => setCredits({ ...credits, fr: e.target.value })}
            />
            <CustomFilledTextArea
              label="Traduction (EN)"
              id="credits_en"
              value={credits.en}
              onChange={(e) => setCredits({ ...credits, en: e.target.value })}
            />

            {showAlert.show ? <AlertInfo content={showAlert} /> : null}
          </Stack>
        </motion.div>

        <motion.div
          initial="hidden"
          variants={variants(4)}
          animate={controls}
          style={{ width: "100%" }}
        >
          <Stack flexDirection="row" gap={2} justifyContent="end">
            <RectangleButton onClick={handleCancel}>Annuler</RectangleButton>
            <RectangleButton
              secondary
              onClick={handleSaveFooter}
              disabled={!credits.fr || credits.fr.trim() === ""}
            >
              Enregistrer
            </RectangleButton>
          </Stack>
        </motion.div>
      </CustomForm>
    </Stack>
  )
}
