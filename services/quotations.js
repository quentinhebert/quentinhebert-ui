import { notEmptyString } from "./utils"

export const checkBeforeGen = (
  quotation = {
    label,
    client,
    date,
    delivery_date,
    duration,
    validity_end_date,
    payment_options,
    payment_conditions,
    additional_mentions,
    deposit,
    balance,
    no_vat,
    payment_delay_penalties,
  }
) => {
  // Errors init
  let errors = {}
  Object.keys(quotation).map((key) => (errors[key] = false))

  // Check errors
  if (!notEmptyString(quotation.label)) errors.label = true
  if (!quotation.client?.id) errors.client = true
  if (!quotation.date) errors.date = true
  if (!quotation.delivery_date) errors.delivery_date = true
  if (!notEmptyString(quotation.payment_conditions))
    errors.payment_conditions = true
  if (parseInt(quotation.deposit) + parseInt(quotation.balance) !== 100)
    errors.deposit = true
  if (!notEmptyString(quotation.payment_delay_penalties))
    errors.payment_delay_penalties = true
  if (
    !Object.values(quotation.payment_options).filter((opt) => opt === true)
      .length
  )
    errors.payment_options = true

  return errors
}
