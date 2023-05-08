export function parseOrderPrice({ order, items }) {
  // All prices are in cents
  const response = {
    noVatPrice: 0,
    totalPrice: 0,
    totalVAT: 0,
  }

  try {
    // Calculate totals
    items.map((item) => {
      response.noVatPrice += item.no_vat_price * item.quantity
      response.totalVAT += (item.vat / 100) * item.no_vat_price * item.quantity
    })
    response.totalPrice += response.noVatPrice + response.totalVAT

    return response
  } catch (err) {
    console.error(err)
    return response
  }
}

export function getPaymentFractionsDetails({ order }) {
  const totalPrice = order.total_price
  const paymentFractions = order.payment_fractions
  const fractions = []

  // Populate payments' amount
  paymentFractions?.map((fraction, index) => {
    let label
    if (paymentFractions.length === 1) label = "facture" // one elt only
    else {
      if (index === 0) label = "accompte" // first elt
      else if (index === paymentFractions.length - 1)
        label = "solde" // last elt
      else label = "échéance" // middle elts
    }
    fractions.push({
      amount: Math.round((fraction / 100) * totalPrice * 100) / 100,
      percent: `${fraction}%`,
      label,
      paymentStep: `${index + 1}/${paymentFractions.length}`,
      index,
      paid: false,
    })
  })

  // We browse all fractions and remove matching payments + add attribute paid (boolean)
  let ignoredStatuses = ["failed", "canceled", "requires_payment_method"]

  const successfulPayments = order.payments?.filter(
    (p) => p.status === "succeeded"
  )
  const payments = order.payments

  console.debug("payments", payments)

  fractions.map((f, key) => {
    if (!payments) return

    // 1st Step : Handle succeeded payments
    if (key < successfulPayments.length) {
      f.paymentStatus =
        successfulPayments[successfulPayments.length - key - 1]?.status

      if (
        successfulPayments[successfulPayments.length - key - 1].amount ===
        f.amount
      )
        f.paid = true
    }
    // 2nd Step : Handle last payment (= 1st element of payments)
    else {
      if (payments[payments.length - 1]?.status !== "succeeded") {
        f.paymentStatus = payments[0]?.status
      }
    }
  })

  return fractions
}

export function getNextPaymentDetails({ order }) {
  const fractions = getPaymentFractionsDetails({ order })

  const response = fractions.filter((f) => !f.paid)[0]

  return response
}
