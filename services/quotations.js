import { notEmptyString } from "./utils"

export const checkBeforeGen = (
  order = {
    label,
    client,
    date,
    delivery_date,
    duration,
    validity_end_date,
    payment_options,
    payment_conditions,
    additional_mentions,
    no_vat,
    payment_delay_penalties,
  }
) => {
  // Errors init
  let errors = {}
  Object.keys(order).map((key) => (errors[key] = false))

  // Check errors
  if (!notEmptyString(order.label)) errors.label = true
  if (!order.client?.id) errors.client = true
  if (!order.date) errors.date = true
  if (!order.delivery_date) errors.delivery_date = true
  if (!notEmptyString(order.payment_conditions))
    errors.payment_conditions = true
  if (!notEmptyString(order.payment_delay_penalties))
    errors.payment_delay_penalties = true
  if (
    !Object.values(order.payment_options).filter((opt) => opt === true).length
  )
    errors.payment_options = true

  return errors
}

export const checkBeforeInvoiceGen = (
  order = {
    label,
    client,
    date,
    delivery_date,
    duration,
    validity_end_date,
    payment_options,
    payment_conditions,
    additional_mentions,
    no_vat,
    payment_delay_penalties,
  }
) => {
  // Errors init
  let errors = {}
  Object.keys(order).map((key) => (errors[key] = false))
  console.log(
    "order.client?.address?.postal_code",
    order.client?.address?.postal_code
  )
  // Check errors
  if (!notEmptyString(order.label)) errors.label = true
  if (!order.client?.id) errors.client = true
  if (
    !order.client?.address?.line1 ||
    order.client?.address?.line1?.trim() === ""
  )
    errors.client = true
  if (
    !order.client?.address?.postal_code ||
    order.client?.address?.postal_code?.trim() === ""
  )
    errors.client = true
  if (
    !order.client?.address?.city ||
    order.client?.address?.city?.trim() === ""
  )
    errors.client = true
  if (!order.date) errors.date = true
  if (!order.delivery_date) errors.delivery_date = true
  if (!notEmptyString(order.payment_conditions))
    errors.payment_conditions = true
  if (!notEmptyString(order.payment_delay_penalties))
    errors.payment_delay_penalties = true
  if (
    !Object.values(order.payment_options).filter((opt) => opt === true).length
  )
    errors.payment_options = true

  return errors
}
