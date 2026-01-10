import { Box, Stack } from "@mui/material"
import { ModalTitle } from "../../../../../../Modals/Modal-Components/modal-title"
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange"
import CustomDatePicker from "../../../../../../Inputs/custom-date-picker"
import SelectPaymentMethod from "../select-payment-method"
import BodyText from "../../../../../../Text/body-text"
import { formatPrice } from "../../../../../../../services/utils"
import { INVOICETYPES } from "../../../../../../../enums/invoiceTypes"
import { useContext, useEffect, useState } from "react"
import PillButton from "../../../../../../Buttons/pill-button"
import CancelButton from "../../../../../../Buttons/cancel-button"
import apiCall from "../../../../../../../services/apiCalls/apiCall"
import { AppContext } from "../../../../../../../contexts/AppContext"
import { useSnack } from "../../../../../../../hooks/useSnack"
import CustomModal from "../../../../../../Modals/custom-modal"
const initialDate = new Date().toISOString()
const initialMethod = null

export default function ModalTagInvoiceAsPaid({
  open,
  handleClose,
  invoice,
  refreshData,
}) {
  const { notifySuccessError } = useSnack()

  const [paymentDate, setPaymentDate] = useState(initialDate)
  const [paymentMethod, setPaymentMethod] = useState(initialMethod)

  useEffect(() => {
    setPaymentDate(initialDate)
    setPaymentMethod(null)
  }, [open])

  async function tagInvoiceAsPaid() {
    const res = await apiCall.orders.tagInvoiceAsPaid({
      invoice,
      paymentMethod,
      paymentDate,
    })
    notifySuccessError({
      condition: res?.ok,
      successMsg: "La facture a été marquée comme soldée ✅",
      errorMsg: "Une erreur est survenue ❌",
      handleSuccess,
    })
  }

  function handleSuccess() {
    refreshData()
    handleClose()
  }

  return (
    <CustomModal open={open} handleClose={handleClose} gap={4}>
      {!invoice ? (
        <></>
      ) : (
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

            <SelectPaymentMethod
              method={paymentMethod}
              setMethod={setPaymentMethod}
            />

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
                handleCancel={handleClose}
                label="Non, la facture n'est pas payée"
              />
            </Stack>
          </Stack>
        </>
      )}
    </CustomModal>
  )
}
