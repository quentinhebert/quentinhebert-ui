import { useRouter } from "next/router"
import {
  ActionButton,
  Context,
  DocumentHeader,
  DocumentType,
  FormCard,
  GridItem,
} from "../../../module"
import { Grid, Stack } from "@mui/material"
import { useContext, useState } from "react"
import BodyText from "../../../../../Text/body-text"
import RefreshButton from "../../../../../Buttons/refresh-button"
import PillButton from "../../../../../Buttons/pill-button"
import AddIcon from "@mui/icons-material/Add"
import { QUOTATION_STATUS } from "../../../../../../enums/quotationStatus"
import DownloadIcon from "@mui/icons-material/Download"
import SendIcon from "@mui/icons-material/Send"
import { formatDayDate } from "../../../../../../services/date-time"
import { AppContext } from "../../../../../../contexts/AppContext"

export default function DocumentsSection() {
  const { state, fetchOrder, checkMissingFields, handleSend } =
    useContext(Context)
  const { setSnackMessage, setSnackSeverity } = useContext(AppContext)
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [isQuotationGenerating, setIsQuotationGenerating] = useState(false)

  return (
    <Stack width="100%" gap={2}>
      <FormCard>
        <Stack gap={2}>
          <DocumentHeader>
            <DocumentType>
              Devis
              {!!state.order.quotations?.length
                ? ` (${state.order.quotations.length})`
                : ""}
            </DocumentType>

            <Stack className="row gap-10 flex-center">
              <RefreshButton refresh={fetchOrder} loading={loading} />
              <AddButton
                disabled={
                  state.order.status !== "DRAFT" || isQuotationGenerating
                }
                onClick={handleGenerate}
                isQuotationGenerating={isQuotationGenerating}
              />
            </Stack>
          </DocumentHeader>

          <BodyText preventTransition fontSize="1rem">
            Rappel : devis obligatoire pour les commandes dont le montant est
            supérieur à 1500€.
          </BodyText>

          {state.order.quotations.length === 0 && (
            <BodyText fontSize="1rem" color="grey" preventTransition>
              Aucun devis.
            </BodyText>
          )}

          <Stack gap={2} padding="0" overflow="auto">
            {state.order.quotations?.length > 0 && <QuotationsListHead />}
            {state.order.quotations.map((quotation, key) => (
              <QuotationsListItem
                quotation={quotation}
                router={router}
                handleSend={handleSend}
                key={key}
              />
            ))}
          </Stack>
        </Stack>
      </FormCard>

      <FormCard>
        <Stack gap={2}>
          <DocumentHeader>
            <DocumentType>
              Factures
              {!!state.order.invoices?.length
                ? ` (${state.order.invoices.length})`
                : ""}
            </DocumentType>

            <RefreshButton refresh={fetchOrder} loading={loading} />
          </DocumentHeader>

          {(!state.order.invoices || state.order.invoices?.length === 0) && (
            <BodyText fontSize="1rem" color="grey" preventTransition>
              Aucune facture.
            </BodyText>
          )}
          <Stack gap={2} overflow="auto" width="100%">
            {state.order.invoices?.length > 0 && <OrderListHead />}
            {!!state.order.invoices &&
              state.order.invoices.map((invoice, key) => (
                <OrderListItem invoice={invoice} router={router} key={key} />
              ))}
          </Stack>
        </Stack>
      </FormCard>
    </Stack>
  )

  async function handleGenerate() {
    try {
      checkMissingFields()

      setIsQuotationGenerating(true)

      const res = await apiCall.orders.generateQuotation(order)
      if (!res?.ok) throw Error("Le devis n'a pas pu être généré....")

      setSnackMessage("Devis en cours de création...")
      setSnackSeverity("info")
    } catch (err) {
      setSnackSeverity("error")
      setSnackMessage(
        err.message === "missing_fields"
          ? "Certains champs sont manquants dans les conditions et mentions obligatoires."
          : err.message
      )
      if (err.message === "missing_fields") setReadOnly(false)
    }
  }
}

function QuotationsListItem({ quotation }) {
  const { state, handleSend } = useContext(Context)

  const router = useRouter()
  const color = (theme) =>
    theme.alert.title[QUOTATION_STATUS[quotation.status].severity].color
  const label = QUOTATION_STATUS[quotation.status].label
  const version = `V${quotation.version}`
  const handleDownload = () => {
    if (quotation.path) return window.open(buildPublicURL(quotation.path))
    router.push(`/quotation-view/${quotation.id}`)
  }
  return (
    <Stack sx={{ justifyContent: "space-between" }} minWidth="400px">
      <Grid container>
        <GridItem xs={2}>{version}</GridItem>
        <GridItem color={color}>{label}</GridItem>
        <GridItem
          xs={2}
          md={2.5}
          sx={{
            display: "flex !important",
            justifyContent: "center !important",
          }}
        >
          {!!quotation?.path ? (
            <ActionButton
              icon={<DownloadIcon />}
              label="Télécharger"
              onClick={handleDownload}
            />
          ) : (
            "Patientez..."
          )}
        </GridItem>
        <GridItem
          xs={2}
          md={2.5}
          sx={{
            display: "flex !important",
            justifyContent: "center !important",
          }}
        >
          <ActionButton
            icon={<SendIcon />}
            label="Envoyer"
            onClick={() => handleSend(quotation.id)}
          />
        </GridItem>
        <GridItem color="grey" xs={3.5} md={2.5} textAlign="right">
          {formatDayDate({ timestamp: quotation.last_update })}
        </GridItem>
      </Grid>
    </Stack>
  )
}
function AddButton({ onClick, isQuotationGenerating, ...props }) {
  return (
    <PillButton
      disabled={isQuotationGenerating}
      startIcon={<AddIcon />}
      fontSize="0.8rem"
      padding=".25rem 1rem"
      preventTransition
      onClick={onClick}
      {...props}
    >
      {isQuotationGenerating ? "Veuillez patienter..." : "Ajouter"}
    </PillButton>
  )
}
function QuotationsListHead({}) {
  return (
    <Grid container marginTop={2} minWidth="400px">
      <GridItem color="grey" fontSize="1rem" xs={2}>
        Version
      </GridItem>
      <GridItem color="grey" fontSize="1rem">
        Status
      </GridItem>
      <GridItem color="grey" fontSize="1rem" xs={2} md={2.5}></GridItem>
      <GridItem color="grey" fontSize="1rem" xs={2} md={2.5}></GridItem>
      <GridItem
        color="grey"
        fontSize="1rem"
        xs={3.5}
        md={2.5}
        textAlign="right"
      >
        Créé le
      </GridItem>
    </Grid>
  )
}
