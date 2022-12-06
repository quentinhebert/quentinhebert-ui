import { Stack } from "@mui/system"
import PillButton from "../../Buttons/pill-button"
import BodyText from "../../Text/body-text"
import { Icon } from "react-icons-kit"
import { ic_insert_drive_file_outline, ic_file_copy } from "react-icons-kit/md"
import apiCall from "../../../services/apiCalls/apiCall"
import { useContext, useEffect, useState } from "react"
import WestIcon from "@mui/icons-material/West"
import PleaseWait from "../../Helpers/please-wait"
import { Grid } from "@mui/material"
import { UserContext } from "../../../contexts/UserContext"
import QuotationCard from "../../Cards/quotations/quotation-card"
import { MODES_ENUM } from "../../../enums/modesEnum"
import ModesToggle from "../../Navigation/modes-toggle"
import { useRouter } from "next/router"
import AlertInfo from "../../Other/alert-info"

const Root = (props) => (
  <Stack gap={4} className="flex-center" minHeight="300px" {...props} />
)

export default function NewInvoice_Main({}) {
  const router = useRouter()

  const [quotations, setQuotations] = useState([])
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState(MODES_ENUM.LIST)

  const fetchQuotations = async () => {
    if (step !== 1) return
    setLoading(true)
    const res = await apiCall.quotations.getAllAccepted()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setQuotations(jsonRes)
    }
    setLoading(false)
  }

  const handleNext = () => setStep(step + 1)
  const handlePrevious = () => setStep(step - 1)

  useEffect(() => {
    fetchQuotations()
  }, [step])

  if (step === 0)
    return (
      <Root>
        <BodyText
          className="inline-flex gap-10"
          alignItems="center"
          fontSize="1.5rem"
        >
          Créer une facture...
        </BodyText>
        <Stack
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 4 },
          }}
        >
          <PillButton onClick={() => router.push("/dashboard/invoices/create")}>
            <Icon
              icon={ic_insert_drive_file_outline}
              size={25}
              style={{ marginRight: ".5rem" }}
            />
            Depuis zéro
          </PillButton>
          <PillButton onClick={handleNext}>
            <Icon
              icon={ic_file_copy}
              size={25}
              style={{ marginRight: ".5rem" }}
            />
            À partir d'un devis
          </PillButton>
        </Stack>
      </Root>
    )

  if (step === 1)
    return (
      <Root>
        <BodyText
          className="inline-flex gap-10"
          alignItems="center"
          fontSize="1.5rem"
          lineHeight="1.75rem"
          textAlign="center"
        >
          Sélectionnez le devis sur lequel se basera la nouvelle facture...
        </BodyText>

        <AlertInfo
          content={{
            severity: "info",
            text: "La liste ci-dessous n'affiche que les devis qui ont été acceptés par le client. Vous pouvez accepter un devis manuellement si vous avez des droits administrateurs.",
          }}
        />

        <Stack width="100%">
          <ModesToggle mode={mode} setMode={setMode} />
        </Stack>

        {loading && (
          <Stack className="full-width flex-center">
            <PleaseWait />
          </Stack>
        )}

        <Grid container spacing={2}>
          {quotations.map((quotation, key) => (
            <Grid
              key={key}
              item
              xs={12}
              sm={mode === MODES_ENUM.LIST ? 12 : 6}
              md={mode === MODES_ENUM.LIST ? 12 : 4}
            >
              <QuotationCard
                key={key}
                quotation={quotation}
                mode={mode}
                optionsList={["open"]}
                refreshData={fetchQuotations}
                onClick={() =>
                  router.push(
                    `/dashboard/invoices/create?from_quotation=${quotation.id}`
                  )
                }
              />
            </Grid>
          ))}
        </Grid>

        <PillButton startIcon={<WestIcon />} onClick={handlePrevious}>
          Retour
        </PillButton>
      </Root>
    )
  else return <></>
}
