import { useState, useContext, useEffect } from "react"
import { Stack, Typography } from "@mui/material"
import apiCall from "../../../services/apiCalls/apiCall"
import AlertInfo from "../../Other/alert-info"
import { ModalTitle } from "../../Modals/Modal-Components/modal-title"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { AppContext } from "../../../contexts/AppContext"
import CustomForm from "../custom-form"
import RectangleButton from "../../Buttons/rectangle-button"
import CustomFilledTextArea from "../../Inputs/custom-filled-text-area"
import CustomFilledInput from "../../Inputs/custom-filled-input"

export default function AdminSiretForm(props) {
  /********** PROPS **********/
  const { handleClose } = props

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  /********** USE-STATES **********/
  const [siret, setSiret] = useState("")
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
  const fetchSiret = async () => {
    const res = await apiCall.application.siret.get()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setSiret(jsonRes)
    }
  }

  useEffect(() => {
    fetchSiret()
  }, [])

  const handleSuccess = () => {
    setSnackSeverity("success")
    setSnackMessage("N° SIRET mis à jour")
    handleClose()
    fetchSiret() // reset form
  }
  const handleError = () => {
    setSnackSeverity("error")
    setSnackMessage("N° SIRET non mis à jour")
  }
  const handleSaveSiret = async () => {
    const res = await apiCall.application.siret.update(siret)
    if (res && res.ok) handleSuccess()
    else handleError()
  }

  const handleCancel = async () => {
    if (handleClose) handleClose()
    // reset form
    await fetchSiret()
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
        <ModalTitle>Modifier le numéro de SIRET</ModalTitle>
      </motion.div>

      <CustomForm gap={4}>
        <motion.div
          initial="hidden"
          variants={variants(2)}
          animate={controls}
          style={{ width: "100%" }}
        >
          <Stack gap={2} width="100%">
            <CustomFilledInput
              label="Modifier le N° SIRET"
              value={siret}
              onChange={(e) => setSiret(e.target.value)}
              error={siret.trim().length !== 14}
              helperText={
                siret.trim().length !== 14 &&
                "Le numéro de SIRET doit contenir 14 chiffres."
              }
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
              onClick={handleSaveSiret}
              disabled={
                !siret || siret.trim() === "" || siret.trim().length !== 14
              }
            >
              Enregistrer
            </RectangleButton>
          </Stack>
        </motion.div>
      </CustomForm>
    </Stack>
  )
}
