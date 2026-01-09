import { Box, Stack } from "@mui/material"
import { ModalTitle } from "../../../../../../Modals/Modal-Components/modal-title"
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange"
import CustomDatePicker from "../../../../../../Inputs/custom-date-picker"
import SelectPaymentMethod from "../select-payment-method"
import BodyText from "../../../../../../Text/body-text"
import { formatPrice } from "../../../../../../../services/utils"
import { INVOICETYPES } from "../../../../../../../enums/invoiceTypes"
import { useState } from "react"
import PillButton from "../../../../../../Buttons/pill-button"
import CancelButton from "../../../../../../Buttons/cancel-button"
import apiCall from "../../../../../../../services/apiCalls/apiCall"
const initialDate = new Date().toISOString()
const initialMethod = null

export default function ModalTagInvoiceAsPaid({ invoice, handleClose }) {
  if (!invoice) return <></>

  const [paymentDate, setPaymentDate] = useState(initialDate)
  const [paymentMethod, setPaymentMethod] = useState(initialMethod)

  // FIXME: when close modal, payment method visually doesnt reset but state is reset. Then user doesnt know PM is not selected
  const handleCloseAndReset = () => {
    setPaymentDate(initialDate)
    setPaymentMethod(null)
    handleClose()
  }

  async function tagInvoiceAsPaid() {
    const res = await apiCall.orders.tagInvoiceAsPaid({
      invoice,
      paymentMethod,
      paymentDate,
    })
    if (res && res.ok) {
      alert("Cest good")
    } else alert("error") //TODO: Mettre des snackbars
    handleCloseAndReset()
  }
  return (
    <>
      <ModalTitle alignItems="center" display="flex" gap={1}>
        Solder la facture
      </ModalTitle>
      <Stack gap={4}>
        <BodyText textAlign="center">
          Vous souhaitez solder la facture{" "}
          <Box
            component="span"
            sx={{
              color: (theme) => theme.palette.secondary.main,
              fontWeight: "bold",
            }}
          >
            {invoice.number}
          </Box>{" "}
          :<br />
          {formatPrice(invoice.amount_paid)}€{" "}
          <em>({INVOICETYPES[invoice.type]})</em>
        </BodyText>

        <SelectPaymentMethod setValue={setPaymentMethod} />

        <CustomDatePicker
          label="Paiement reçu le"
          disableFuture
          value={paymentDate}
          handleChange={(newValue) => setPaymentDate(newValue)}
        />

        <Stack gap={1}>
          <PillButton
            startIcon={<CurrencyExchangeIcon />}
            onClick={() => tagInvoiceAsPaid()}
          >
            Oui, la facture est payée
          </PillButton>
          <CancelButton
            variant="text"
            handleCancel={handleCloseAndReset}
            label="Non, la facture n'est pas payée"
          />
        </Stack>
      </Stack>
    </>
  )
}
