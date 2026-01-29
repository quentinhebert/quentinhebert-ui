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
import { Grid, Stack, Tooltip } from "@mui/material"
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
import {
  buildPublicURL,
  formatPrice,
} from "../../../../../../../services/utils"
import { PAYMENT_TYPES } from "../../../../../../../enums/paymentTypes"
import useConfirm from "../../../../../../../hooks/useConfirm"
import CustomModal from "../../../../../../Modals/custom-modal"
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange"
import ModalTagInvoiceAsPaid from "../modals/modal-tag-invoice-as-paid"
import CodeIcon from "@mui/icons-material/Code"
import ModalFacturXjson from "../modals/modal-facturx-json"

export default function DocumentsSection() {
  const {
    state,
    setState,
    fetchOrder,
    checkMissingFields,
    handleSend,
    handleOpenModal,
  } = useContext(Context)
  const { setSnackMessage, setSnackSeverity } = useContext(AppContext)
  const router = useRouter()
  const [isQuotationGenerating, setIsQuotationGenerating] = useState(false)
  const [isInvoiceGenerating, setIsInvoiceGenerating] = useState(false)
  const [totalQuotes, setTotalQuotes] = useState(
    state.order.quotations?.length || 0,
  )
  const [expectedTotalInvoices, setExpectedTotalInvoices] = useState(
    state.order.invoices?.length || 0,
  )
  const Confirm = useConfirm()
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false)
  const [openJsonFacturXModal, setOpenJsonFacturXModal] = useState(false)

  useEffect(() => {
    const incomingTotal = state.order.quotations.length
    if (isQuotationGenerating)
      setIsQuotationGenerating(incomingTotal !== totalQuotes)
    const interval = setInterval(() => {
      if (isQuotationGenerating) return fetchOrder()
    }, 1000 * 5) // in milliseconds

    return () => clearInterval(interval)
  }, [state.order.quotations, totalQuotes])

  useEffect(() => {
    const currentTotal = state.order.invoices.length
    if (isInvoiceGenerating)
      setIsInvoiceGenerating(currentTotal !== expectedTotalInvoices)
    const interval = setInterval(() => {
      if (isInvoiceGenerating) return fetchOrder()
    }, 1000 * 5) // in milliseconds

    return () => clearInterval(interval)
  }, [state.order.invoices, expectedTotalInvoices])

  return (
    <>
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
                <RefreshButton
                  refresh={fetchOrder}
                  loading={state.isFetching}
                />
                <AddButton
                  disabled={
                    state.order.status !== "DRAFT" || isQuotationGenerating
                  }
                  onClick={handleGenerate}
                  isLoading={isQuotationGenerating}
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

              <Stack className="row gap-10 flex-center">
                <RefreshButton
                  refresh={fetchOrder}
                  loading={state.isFetching}
                />
                <AddButton
                  onClick={handleGenerateInvoiceToPay}
                  isLoading={isInvoiceGenerating}
                />
              </Stack>
            </DocumentHeader>

            {(!state.order.invoices || state.order.invoices?.length === 0) && (
              <BodyText fontSize="1rem" color="grey" preventTransition>
                Aucune facture.
              </BodyText>
            )}
            <Stack gap={2} overflow="auto" width="100%">
              {state.order.invoices?.length > 0 && <InvoicesListHead />}
              {!!state.order.invoices &&
                state.order.invoices.map((invoice, key) => (
                  <InvoicesListItem
                    invoice={invoice}
                    payments={state.order.payments}
                    router={router}
                    key={key}
                    handleOpenModal={handleOpenModal}
                    setOpenInvoiceModal={setOpenInvoiceModal}
                    setOpenJsonFacturXModal={setOpenJsonFacturXModal}
                    setSelectedInvoice={setSelectedInvoice}
                  />
                ))}
            </Stack>
          </Stack>
        </FormCard>
      </Stack>

      <CustomModal open={Confirm.open} handleClose={Confirm.handleClose}>
        <Confirm.DialogContent />
      </CustomModal>

      <ModalTagInvoiceAsPaid
        open={openInvoiceModal}
        invoice={selectedInvoice}
        handleClose={() => setOpenInvoiceModal(false)}
        refreshData={fetchOrder}
      />
      {openJsonFacturXModal ? (
        <ModalFacturXjson
          open={openJsonFacturXModal}
          invoice={selectedInvoice}
          handleClose={() => setOpenJsonFacturXModal(false)}
        />
      ) : (
        <></>
      )}
    </>
  )

  async function handleGenerate() {
    let errors = null
    try {
      errors = checkMissingFields()
      if (!!errors) throw Error("missing_fields")

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
          : err.message,
      )

      if (err.message === "missing_fields")
        setState({ ...state, errors, mode: MODES.EDIT })
    }
  }
  async function handleGenerateInvoiceToPay() {
    Confirm.setContent({
      title: "Facture avant paiement",
      message:
        "Vous souhaitez générer une nouvelle facture avant que le règlement n'ait été émis ?",
      nextAction: () => generateInvoiceToPay(),
      nextBtnText: "Générer",
    })
    Confirm.handleOpen()
  }
  async function generateInvoiceToPay() {
    let errors = null
    try {
      // On vérifie que la facture peut se générer sans souci de champs manquants
      errors = checkMissingFields()
      if (!!errors) throw Error("missing_fields")

      // Checks supplémentaire sur le client
      const clientValid =
        !!state.order.client?.id &&
        !!state.order.client?.line1 &&
        !!state.order.client?.postal_code &&
        !!state.order.client?.city &&
        !!state.order.client?.email
      if (!clientValid) throw Error("missing_client_fields")

      // Loading state
      setIsInvoiceGenerating(true)
      // Prepare for refetch listener
      setExpectedTotalInvoices(expectedTotalInvoices + 1)

      const res = await apiCall.orders.generateInvoiceBeforePayment({
        orderId: state.order.id,
      })
      if (!res?.ok) throw Error("La facture n'a pas pu être générée....")

      setSnackMessage("Facture en cours de création...")
      setSnackSeverity("info")
    } catch (err) {
      setSnackSeverity("error")
      setSnackMessage(
        err.message === "missing_fields"
          ? "Certains champs sont manquants dans les conditions et mentions obligatoires."
          : err.message === "missing_client_fields"
            ? "Merci de vérifier les informations du client"
            : err.message,
      )

      if (err.message === "missing_fields")
        setState({ ...state, errors, mode: MODES.EDIT })
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
        <GridItem color={color}></GridItem>
        <GridItem
          sx={{
            display: "flex !important",
            justifyContent: "start !important",
          }}
        >
          <ActionButton
            icon={<SendIcon />}
            label="Envoyer"
            onClick={() => handleSend(quotation.id)}
          />
        </GridItem>
        <GridItem
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
        <GridItem color="grey" textAlign="right">
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
      (elt) => elt === true,
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
function AddButton({ onClick, isLoading, ...props }) {
  return (
    <PillButton
      disabled={isLoading}
      startIcon={<AddIcon />}
      fontSize="0.8rem"
      padding=".25rem 1rem"
      preventTransition
      onClick={onClick}
      {...props}
    >
      {isLoading ? "Veuillez patienter..." : "Ajouter"}
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
      <GridItem color="grey" fontSize="1rem"></GridItem>
      <GridItem color="grey" fontSize="1rem"></GridItem>
      <GridItem color="grey" fontSize="1rem"></GridItem>
      <GridItem color="grey" fontSize="1rem" textAlign="right">
        Créé le
      </GridItem>
    </Grid>
  )
}
function InvoicesListHead() {
  return (
    <Grid container marginTop={2} minWidth="700px">
      <GridItem color="grey" fontSize="1rem" xs={2}>
        Numéro
      </GridItem>
      <GridItem color="grey" fontSize="1rem">
        Type
      </GridItem>
      <GridItem color="grey" fontSize="1rem" xs={2} md={1}>
        Montant
      </GridItem>
      <GridItem color="grey" fontSize="1rem">
        Réglée
      </GridItem>
      <GridItem color="grey" fontSize="1rem"></GridItem>
      <GridItem color="grey" fontSize="1rem" xs={0} md={1}></GridItem>
      <GridItem color="grey" fontSize="1rem" textAlign="right">
        Émise le
      </GridItem>
    </Grid>
  )
}
function InvoicesListItem({
  invoice,
  payments,
  setOpenInvoiceModal,
  setSelectedInvoice,
  setOpenJsonFacturXModal,
}) {
  const handleDownload = () => {
    if (invoice.path) return window.open(buildPublicURL(invoice.path))
  }

  // Check if invoice matches a payment
  const matchingPaymentIndex = Array.isArray(payments)
    ? payments.findIndex(
        (payment) =>
          payment.amount === invoice.amount_paid &&
          payment.status === "succeeded" &&
          payment.invoice_number === invoice.number,
      )
    : -1

  let payment = null
  if (matchingPaymentIndex !== -1) payment = payments[matchingPaymentIndex]

  return (
    <>
      <Stack sx={{ justifyContent: "space-between" }} minWidth="700px">
        <Grid container>
          <GridItem xs={2}>{invoice.number}</GridItem>
          <GridItem textTransform="capitalize">
            {INVOICETYPES[invoice.type]}
          </GridItem>
          <GridItem xs={2} md={1}>
            {formatPrice(invoice.amount_paid)}€
          </GridItem>
          <GridItem>
            {!!payment ? (
              <Tooltip
                title={formatDayDate({ timestamp: payment.created_at })}
                placement="right"
                arrow
              >
                {!!payment?.created_at && PAYMENT_TYPES[payment.type].label}
              </Tooltip>
            ) : (
              <ActionButton
                icon={<CurrencyExchangeIcon />}
                label="Encaisser la facture"
                onClick={() => {
                  setSelectedInvoice(invoice)
                  setOpenInvoiceModal(true)
                }}
              />
            )}
          </GridItem>

          <GridItem>
            <Stack width="100%" alignItems="center">
              <ActionButton
                icon={<DownloadIcon />}
                label="Télécharger"
                onClick={handleDownload}
              />
            </Stack>
          </GridItem>

          <GridItem xs={0} md={1}>
            <Stack width="100%" alignItems="center">
              <ActionButton
                icon={<CodeIcon />}
                label="Facture-X"
                onClick={() => {
                  setSelectedInvoice(invoice)
                  setOpenJsonFacturXModal(true)
                }}
              />
            </Stack>
          </GridItem>

          <GridItem color="grey" textAlign="right">
            {formatDayDate({ timestamp: invoice.created_at })}
          </GridItem>
        </Grid>
      </Stack>
    </>
  )
}
