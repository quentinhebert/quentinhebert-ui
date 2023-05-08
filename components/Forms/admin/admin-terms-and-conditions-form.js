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
import CustomFilledInput from "../../Inputs/custom-filled-input"
import DualInputLine from "../../Containers/dual-input-line"
import AlertInfo from "../../Other/alert-info"

const TextEditor = dynamic(() => import("../../TextEditor/text-editor"), {
  ssr: false,
})

export default function AdminTermsAndConditionsForm(props) {
  /********** PROPS **********/
  const { handleClose } = props

  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  const { mutate } = useSWR("termsAndConditions")

  const initialTerms = {
    terms_fullname: "",
    terms_phone: "",
    terms_email: "",
    terms_line1: "",
    terms_line2: "",
    terms_postal_code: "",
    terms_city: "",
    terms_country: "",
    rcs: "",
    siret: "",
  }

  /********** USE-STATES **********/
  const [terms, setTerms] = useState(initialTerms)
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
      setTerms({
        terms_fullname: jsonRes.terms.terms_fullname,
        terms_phone: jsonRes.terms.terms_phone,
        terms_email: jsonRes.terms.terms_email,
        terms_line1: jsonRes.terms.terms_line1,
        terms_line2: jsonRes.terms.terms_line2,
        terms_postal_code: jsonRes.terms.terms_postal_code,
        terms_city: jsonRes.terms.terms_city,
        terms_country: jsonRes.terms.terms_country,
        rcs: jsonRes.terms.rcs,
        siret: jsonRes.terms.siret,
      })
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
      terms,
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

  const handleChange = (attribute) => (e) => {
    setTerms({ ...terms, [attribute]: e.target.value })
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
            <AlertInfo
              content={{
                show: true,
                severity: "info",
                title: "Important",
                text: "Veillez à ce que les informations que vous avez saisies sont correctes. Elles apparaîtront dans vos mentions légales en ligne et sur vos devis/factures.",
              }}
            />
            <Stack gap={{ xs: 1, md: 2 }} mt={4}>
              <CustomFilledInput
                label="Nom complet"
                value={terms.terms_fullname}
                onChange={handleChange("terms_fullname")}
              />
              <DualInputLine>
                <CustomFilledInput
                  label="Adresse e-mail"
                  value={terms.terms_email}
                  onChange={handleChange("terms_email")}
                />
                <CustomFilledInput
                  label="Téléphone"
                  value={terms.terms_phone}
                  onChange={handleChange("terms_phone")}
                />
              </DualInputLine>

              <DualInputLine>
                <CustomFilledInput
                  label="Adresse (ligne 1)"
                  value={terms.terms_line1}
                  onChange={handleChange("terms_line1")}
                />
                <CustomFilledInput
                  label="Ligne 2"
                  value={terms.terms_line2}
                  onChange={handleChange("terms_line2")}
                />
              </DualInputLine>

              <DualInputLine>
                <CustomFilledInput
                  label="Ville"
                  value={terms.terms_city}
                  onChange={handleChange("terms_city")}
                />
                <CustomFilledInput
                  label="Code postal"
                  value={terms.terms_postal_code}
                  onChange={handleChange("terms_postal_code")}
                />
              </DualInputLine>

              <CustomFilledInput
                label="Pays"
                value={terms.terms_country}
                onChange={handleChange("terms_country")}
              />

              <DualInputLine>
                <CustomFilledInput
                  label="SIRET"
                  value={terms.siret}
                  onChange={handleChange("siret")}
                  error={terms.siret.trim().length !== 14}
                  helperText={
                    terms.siret.trim().length !== 14 &&
                    "Le n° SIRET est composé de 14 chiffres."
                  }
                />
                <CustomFilledInput
                  label="RCS"
                  value={terms.rcs}
                  onChange={handleChange("rcs")}
                />
              </DualInputLine>
            </Stack>
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
