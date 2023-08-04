import { Stack } from "@mui/material"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import { checkEmail, checkPhone, checkVATnumber } from "../../../services/utils"
import PillButton from "../../Buttons/pill-button"
import CenteredMaxWidthContainer from "../../Containers/centered-max-width-container"
import DualInputLine from "../../Containers/dual-input-line"
import CustomCheckbox from "../../Inputs/custom-checkbox"
import CustomFilledInput from "../../Inputs/custom-filled-input"
import BodyText from "../../Text/body-text"
import CustomForm from "../custom-form"
import Span from "../../Text/span"
import InTextLink from "../../Links/in-text-link"
import { defaultConfig } from "../../../config/defaultConfig"
import { AppContext } from "../../../contexts/AppContext"
import CustomFilledPhoneInput from "../../Inputs/custom-filled-phone-input"

const SectionTitle = (props) => (
  <Stack className="full-width">
    <BodyText fontSize="1.5rem" {...props} />
  </Stack>
)
const Card = ({ title, ...props }) => (
  <Stack
    width="100%"
    sx={{
      background: (theme) => theme.palette.background.main,
      padding: 4,
      gap: 4,
      borderRadius: "30px",
    }}
  >
    <SectionTitle>{title}</SectionTitle>
    <Stack {...props} gap={2} />
  </Stack>
)

export default function QuotationClientFieldsForm({
  defaultClient,
  handleFinish,
  isAdmin,
  orderId,
}) {
  const router = useRouter()
  const id = router.query.id

  const { setSnackMessage, setSnackSeverity } = useContext(AppContext)

  const initialClient = {
    firstname: defaultClient?.firstname || "",
    lastname: defaultClient?.lastname || "",
    email: defaultClient?.email || "",
    phone: defaultClient?.phone || "",
    line1: defaultClient?.line1 || "",
    line2: defaultClient?.line2 || "",
    postal_code: defaultClient?.postal_code || "",
    city: defaultClient?.city || "",
    region: defaultClient?.region || "",
    country: defaultClient?.country || "FRANCE",
    vat_number: defaultClient?.vat_number || "",
    company: defaultClient?.company || "",
  }

  // Set initial errors on false
  let initialErrors = {}
  Object.keys(initialClient).map((key) => {
    initialErrors[key] = false
  })
  const [errors, setErrors] = useState(initialErrors)
  const [client, setClient] = useState(initialClient)
  const [isProcessing, setIsProcessing] = useState(false)
  const [accept, setAccept] = useState({ policy: false })
  const [isCompany, setIsCompany] = useState(false)

  const liveCheck = {
    email:
      errors.email || (client.email.trim() !== "" && !checkEmail(client.email)),
    phone:
      errors.phone || (client.phone.trim() !== "" && !checkPhone(client.phone)),
    vat_number:
      errors.vat_number ||
      (client.vat_number.trim() !== "" && !checkVATnumber(client.vat_number)),
  }

  const handleChange = (attribute) => (e) =>
    setClient({ ...client, [attribute]: e.target.value })

  const handleCheck = (attribute) => (e) => {
    setAccept({ ...accept, [attribute]: e.target.checked })
  }

  const toggleShowCompany = (e) => setIsCompany(e.target.checked)

  const handleGeneratePDF = async () => {
    setIsProcessing(true)
    const res = await apiCall.quotations.accept(client, { id })
    if (res && res.ok) {
      const jsonRes = await res.json()
      window.open(jsonRes.url)
      await apiCall.quotations.sendAutomaticEmails({ id })
      if (!!handleFinish) handleFinish()
    } else alert("échec")
    setIsProcessing(false)
  }
  const handleAssign = async ({ clientId }) => {
    const res = await apiCall.orders.assignClient({
      id: orderId,
      clientId,
    })
    if (res && res.ok) {
      setSnackMessage("Client associé au devis avec succès")
      setSnackSeverity("success")
      if (!!handleFinish) handleFinish()
    } else {
      setSnackMessage("Une erreur est survenue")
      setSnackSeverity("error")
    }
    setIsProcessing(false)
  }
  const handleAdminCreateClient = async () => {
    setIsProcessing(true)
    const res = await apiCall.clients.create(client)
    if (res && res.ok) {
      const jsonRes = await res.json()
      await handleAssign({ clientId: jsonRes.id })
    } else {
      setSnackMessage("Une erreur est survenue")
      setSnackSeverity("error")
      setIsProcessing(false)
    }
  }

  return (
    <CustomForm>
      <Card title="Identité">
        <DualInputLine>
          <CustomFilledInput
            type="input"
            id="firstname"
            label="Prénom"
            value={client.firstname}
            onChange={handleChange("firstname")}
            error={errors.firstname}
            helperText={errors.firstname && "Vérifiez ce champ"}
          />
          <CustomFilledInput
            type="input"
            id="lastname"
            label="Nom"
            value={client.lastname}
            onChange={handleChange("lastname")}
            error={errors.lastname}
            helperText={errors.lastname && "Vérifiez ce champ"}
          />
        </DualInputLine>
      </Card>

      <Card title="Contact">
        <DualInputLine>
          <CustomFilledInput
            type="email"
            id="email"
            label="E-mail"
            value={client.email}
            onChange={handleChange("email")}
            error={liveCheck.email || errors.email}
            helperText={liveCheck.email && "Cet e-mail n'est pas valide"}
          />
          {/* <CustomFilledInput
            type="phone"
            id="phone"
            label="Téléphone"
            value={client.phone}
            onChange={handleChange("phone")}
            error={liveCheck.phone || errors.phone}
            helperText={liveCheck.phone && "Ce téléphone n'est pas valide"}
          /> */}
          <CustomFilledPhoneInput
            required
            value={client.phone}
            handleChange={(newValue) =>
              setClient({ ...client, phone: newValue })
            }
            error={errors.phone}
            helperText="Ce téléphone n'est pas valide"
          />
        </DualInputLine>
      </Card>

      <Card title="Entreprise">
        <CustomFilledInput
          label="Nom de l'entreprise (optionnel)"
          value={client.company}
          onChange={handleChange("company")}
          error={errors.company}
        />
        <DualInputLine>
          <CustomCheckbox
            label="Je suis une entreprise assujettie à la TVA"
            onChange={toggleShowCompany}
            value={isCompany}
            labelcolor={(theme) => theme.palette.text.white}
            fontSize="1rem"
          />
          {isCompany && (
            <CustomFilledInput
              label="N° TVA intracommunautaire"
              placeholder="FRXXXXXXXXXXX"
              value={client.vat_number}
              onChange={handleChange("vat_number")}
              error={liveCheck.vat_number || errors.vat_number}
              helperText={
                liveCheck.phone && "Ce numéro de TVA n'est pas valide"
              }
            />
          )}
        </DualInputLine>
      </Card>

      <Card title="Adresse postale">
        <DualInputLine>
          <CustomFilledInput
            className="full-width"
            label="Ligne 1"
            value={client.line1}
            onChange={handleChange("line1")}
            error={errors.line1}
            helperText={errors.line1 && "Veuillez remplir ce champ"}
          />
          <CustomFilledInput
            className="full-width"
            label="Ligne 2 (optionnel)"
            value={client.line2}
            onChange={handleChange("line2")}
          />
        </DualInputLine>

        <DualInputLine>
          <CustomFilledInput
            className="full-width"
            label="Ville"
            value={client.city}
            onChange={handleChange("city")}
            error={errors.city}
            helperText={errors.city && "Veuillez remplir ce champ"}
          />
          <CustomFilledInput
            className="full-width"
            label="Code postal"
            value={client.postal_code}
            onChange={handleChange("postal_code")}
            error={errors.postal_code}
            helperText={errors.postal_code && "Veuillez remplir ce champ"}
          />
        </DualInputLine>

        <DualInputLine>
          <CustomFilledInput
            className="full-width"
            label="Région (optionnel)"
            value={client.region}
            onChange={handleChange("region")}
          />
          <CustomFilledInput
            className="full-width"
            label="Pays"
            value={client.country}
            onChange={handleChange("country")}
            error={errors.country}
            helperText={errors.country && "Veuillez remplir ce champ"}
          />
        </DualInputLine>
      </Card>

      <Stack width="100%">
        <CustomCheckbox
          label={
            <Span>
              J'accepte les{" "}
              <Span className="cool-button">
                <InTextLink
                  text="CGU"
                  href={`${defaultConfig.webclientUrl}/terms-of-use`}
                  target="_blank"
                />
              </Span>{" "}
              et{" "}
              <Span className="cool-button">
                <InTextLink
                  text="CGV"
                  href={`${defaultConfig.webclientUrl}/terms-and-conditions`}
                  target="_blank"
                />
              </Span>{" "}
              du site *
            </Span>
          }
          onChange={handleCheck("policy")}
          value={accept.policy}
          labelcolor={(theme) => theme.palette.text.white}
          fontSize="1rem"
        />
      </Stack>

      <PillButton
        disabled={!accept.policy || isProcessing}
        onClick={!isAdmin ? handleGeneratePDF : handleAdminCreateClient}
      >
        {!isAdmin ? "Télécharger le PDF" : "Créer et assigner le client"}
      </PillButton>
    </CustomForm>
  )
}
