import { Box, Stack } from "@mui/material"
import { useState, useEffect } from "react"
import apiCall from "../../services/apiCalls/apiCall"
import AlertInfo from "../Other/alert-info"
import { ModalTitle } from "../Modals/Modal-Components/modal-title"
import CustomSubmitButton from "../ReusableComponents/forms/custom-submit-button"
import CustomForm from "../ReusableComponents/forms/custom-form"
import CustomFilledInput from "../ReusableComponents/forms/custom-filled-input"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function PasswordForgottenForm(props) {
  /********** PROPS **********/
  const { handleCancel, defaultEmail } = props

  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const variants = (key) => ({
    visible: {
      opacity: 1,
      y: 5,
      transition: { duration: 0.75, delay: key / 5 },
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

  /********** USE-STATES **********/
  const [emailInput, setEmailInput] = useState(defaultEmail || "")
  const [showAlert, setShowAlert] = useState({
    show: false,
    severity: null,
    text: null,
    title: null,
  })

  const handleSendPasswordForgotten = async () => {
    const userData = { email: emailInput }
    const res = await apiCall.users.auth.password.forgotten({
      email: userData.email,
    })
    if (res && res.ok) {
      setShowAlert({
        show: true,
        severity: "info",
        text: "Un e-mail automatique de réinitialisation de mot de passe vient d'être envoyé à votre adresse e-mail.",
        title: "Bien envoyé !",
      })
    } else {
      setShowAlert({
        show: true,
        severity: "warning",
        text: "Un erreur est survenue lors de l'envoi de l'e-mail automatique à votre adress e-mail.",
        title: "Oups...",
      })
    }
  }

  /********** RENDER **********/
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0, duration: 2 }}
      style={{
        width: "100%",
        padding: "2rem",
        border: `1px solid #fff`,
        borderRadius: "10px",
      }}
    >
      <Stack width="100%" gap={4} ref={ref}>
        <motion.div
          initial="hidden"
          variants={variants(0.5)}
          animate={controls}
          style={{ width: "100%" }}
        >
          <ModalTitle>Mot de passe oublié</ModalTitle>
        </motion.div>

        <CustomForm gap={4}>
          <motion.div
            initial="hidden"
            variants={variants(2)}
            animate={controls}
            style={{ width: "100%" }}
          >
            <Stack>
              <CustomFilledInput
                label="E-mail"
                type="email"
                id="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <Box width="100%">
                {showAlert.show ? <AlertInfo content={showAlert} /> : null}
              </Box>
            </Stack>
          </motion.div>

          <motion.div
            initial="hidden"
            variants={variants(3)}
            animate={controls}
            style={{ width: "100%", display: "flex", justifyContent: "end" }}
          >
            <Stack flexDirection="row" gap={2}>
              <CustomSubmitButton onClick={handleCancel}>
                Annuler
              </CustomSubmitButton>
              <CustomSubmitButton
                secondary="true"
                onClick={handleSendPasswordForgotten}
                disabled={!emailInput || emailInput.trim() === ""}
              >
                Envoyer
              </CustomSubmitButton>
            </Stack>
          </motion.div>
        </CustomForm>
      </Stack>
    </motion.div>
  )
}
