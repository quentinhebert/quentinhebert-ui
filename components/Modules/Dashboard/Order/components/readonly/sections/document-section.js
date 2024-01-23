import { useRouter } from "next/router"
import {
  ActionButton,
  Context,
  DocumentHeader,
  DocumentType,
  FormCard,
  GridItem,
  MODALS,
  MODES,
} from "../../../module"
import { Grid, Stack } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import BodyText from "../../../../../../Text/body-text"
import RefreshButton from "../../../../../../Buttons/refresh-button"
import PillButton from "../../../../../../Buttons/pill-button"
import AddIcon from "@mui/icons-material/Add"
import { QUOTATION_STATUS } from "../../../../../../../enums/quotationStatus"
import DownloadIcon from "@mui/icons-material/Download"
import SendIcon from "@mui/icons-material/Send"
import { formatDayDate } from "../../../../../../../services/date-time"
import { AppContext } from "../../../../../../../contexts/AppContext"
import apiCall from "../../../../../../../services/apiCalls/apiCall"
import { checkBeforeGen } from "../../../../../../../services/quotations"
import { INVOICETYPES } from "../../../../../../../enums/invoiceTypes"

export default function DocumentsSection() {
  const { state, setState, fetchOrder, checkMissingFields, handleSend } =
    useContext(Context)
  const { setSnackMessage, setSnackSeverity } = useContext(AppContext)
  const router = useRouter()
  const [isQuotationGenerating, setIsQuotationGenerating] = useState(false)
  const [totalQuotes, setTotalQuotes] = useState(
    state.order.quotations?.length || 0
  )

  useEffect(() => {
    const incomingTotal = state.order.quotations.length
    if (isQuotationGenerating)
      setIsQuotationGenerating(incomingTotal !== totalQuotes)
    const interval = setInterval(() => {
      if (isQuotationGenerating) return fetchOrder()
    }, 1000 * 5) // in milliseconds

    return () => clearInterval(interval)
  }, [state.order.quotations, totalQuotes])

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
              <RefreshButton refresh={fetchOrder} loading={state.isFetching} />
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

            <RefreshButton refresh={fetchOrder} loading={state.isFetching} />
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
      setTotalQuotes(totalQuotes + 1)

      const res = await apiCall.orders.generateQuotation(state.order)
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
      if (err.message === "missing_fields")
        setState({ ...state, mode: MODES.EDIT })
    }
  }
}

function QuotationsListItem({ quotation }) {
  const { state, setState } = useContext(Context)
  const { setSnackMessage, setSnackSeverity } = useContext(AppContext)

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

  function handleMissingFields() {
    setState({ ...state, mode: MODES.EDIT })
    setSnackMessage(`Certains champs obligatoires sont manquants.`)
    setSnackSeverity("error")
  }
  async function handleSend(quotationId) {
    const localErrors = checkBeforeGen(state.order)
    setState({ ...state, errors: localErrors })
    const errorsCount = Object.values(localErrors).filter(
      (elt) => elt === true
    ).length

    // No problem
    if (errorsCount > 0 && !(errorsCount === 1 && localErrors.client))
      return handleMissingFields()

    const res = await apiCall.quotations.get({ id: quotationId })
    if (res && res.ok) {
      const jsonRes = await res.json()
      setState({
        ...state,
        selectedQuotation: jsonRes,
        openModal: true,
        modal: MODALS.SEND,
      })
    }
  }
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
function OrderListHead() {
  return (
    <Grid container marginTop={2} minWidth="700px">
      <GridItem color="grey" fontSize="1rem" xs={2}>
        Numéro
      </GridItem>
      <GridItem color="grey" fontSize="1rem">
        Type
      </GridItem>
      <GridItem color="grey" fontSize="1rem">
        Montant
      </GridItem>
      <GridItem color="grey" fontSize="1rem"></GridItem>
      <GridItem color="grey" fontSize="1rem" textAlign="right">
        Émise le
      </GridItem>
    </Grid>
  )
}
function OrderListItem({ invoice }) {
  const handleDownload = () => {
    if (invoice.path) return window.open(buildPublicURL(invoice.path))
  }
  return (
    <Stack sx={{ justifyContent: "space-between" }} minWidth="700px">
      <Grid container>
        <GridItem xs={2}>{invoice.number}</GridItem>
        <GridItem textTransform="capitalize">
          {INVOICETYPES[invoice.type]}
        </GridItem>
        <GridItem>{invoice.amount_paid / 100}€</GridItem>
        <GridItem>
          <ActionButton
            icon={<DownloadIcon />}
            label="Télécharger"
            onClick={handleDownload}
          />
        </GridItem>

        <GridItem color="grey" textAlign="right">
          {formatDayDate({ timestamp: invoice.created_at })}
        </GridItem>
      </Grid>
    </Stack>
  )
}
