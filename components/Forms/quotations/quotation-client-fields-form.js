import { Stack } from "@mui/material"
import { useRouter } from "next/router"
import { useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import { checkEmail, checkPhone } from "../../../services/utils"
import PillButton from "../../Buttons/pill-button"
import CenteredMaxWidthContainer from "../../Containers/centered-max-width-container"
import DualInputLine from "../../Containers/dual-input-line"
import CustomCheckbox from "../../Inputs/custom-checkbox"
import CustomFilledInput from "../../Inputs/custom-filled-input"
import BodyText from "../../Text/body-text"
import CustomForm from "../custom-form"

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

export default function QuotationClientFieldsForm({ defaultClient }) {
  const router = useRouter()
  const id = router.query.id

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
    country: defaultClient?.country || "",
  }

  // Set initial errors on false
  let initialErrors = {}
  Object.keys(initialClient).map((key) => {
    initialErrors[key] = false
  })
  const [errors, setErrors] = useState(initialErrors)
  const [client, setClient] = useState(initialClient)
  const [accept, setAccept] = useState({ policy: false })

  const liveCheck = {
    email:
      errors.email || (client.email.trim() !== "" && !checkEmail(client.email)),
    phone:
      errors.phone || (client.phone.trim() !== "" && !checkPhone(client.phone)),
  }

  const handleChange = (attribute) => (e) =>
    setClient({ ...client, [attribute]: e.target.value })

  const handleCheck = (attribute) => (e) => {
    setAccept({ ...accept, [attribute]: e.target.checked })
  }

  const handleGeneratePDF = async () => {
    const res = await apiCall.quotations.accept(client, { id })
    if (res && res.ok) {
      const jsonRes = await res.json()
      window.open(jsonRes.url)
    }
    // else alert("échec")
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
          <CustomFilledInput
            type="phone"
            id="phone"
            label="Téléphone"
            value={client.phone}
            onChange={handleChange("phone")}
            error={liveCheck.phone || errors.phone}
            helperText={liveCheck.phone && "Ce téléphone n'est pas valide"}
          />
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
            required
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
          label="J'accepte les CGU et CGV du site *"
          onChange={handleCheck("policy")}
          value={accept.policy}
          labelcolor={(theme) => theme.palette.text.white}
          fontSize="1rem"
        />
      </Stack>

      <PillButton onClick={handleGeneratePDF}>Générer le PDF</PillButton>
    </CustomForm>
  )
}
