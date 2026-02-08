export function parseOrderPrice({ order }) {
  const totals = {
    price: 0,
    noVatPrice: 0,
    vat: 0,
    vat5: 0,
    vat10: 0,
    vat20: 0,
    basisVat5: 0,
    basisVat10: 0,
    basisVat20: 0,
  }
  try {
    console.debug("order.items", order.items)
    // Calcul du total HT et des bases HT par taux de TVA
    order.items.map((item) => {
      totals.noVatPrice += item.quantity * item.no_vat_price
      if (item.vat === 5.5)
        totals.basisVat5 += item.quantity * item.no_vat_price
      else if (item.vat === 10)
        totals.basisVat10 += item.quantity * item.no_vat_price
      else if (item.vat === 20)
        totals.basisVat20 += item.quantity * item.no_vat_price
    })

    // Récupération des fractions
    const fractions = order.payment_fractions // Ex: [40,30,30]
    console.debug("order", order)

    // Calcul des montants de TVA par taux
    fractions.map((f) => {
      const fraction = f / 100 // Ex: 0.4 (real rate)
      totals.vat5 += Math.round(totals.basisVat5 * 0.055 * fraction)
      totals.vat10 += Math.round(totals.basisVat10 * 0.1 * fraction)
      totals.vat20 += Math.round(totals.basisVat20 * 0.2 * fraction)
    })

    totals.vat = totals.vat5 + totals.vat10 + totals.vat20
    totals.price = Math.round(totals.noVatPrice + totals.vat)

    return totals
  } catch (err) {
    console.error(err)
    return totals
  }
}

export function getPaymentFractionsDetails({ order }) {
  const totalPrice = order.total_price
  const paymentFractions = order.payment_fractions
  const payments = order.payments
  const fractions = []

  // Populate payments' amount
  paymentFractions?.map((fraction, index) => {
    let label
    if (paymentFractions.length === 1)
      label = "facture" // one elt only
    else {
      if (index === 0)
        label = "acompte" // first elt
      else if (index === paymentFractions.length - 1)
        label = "solde" // last elt
      else label = "échéance" // middle elts
    }
    fractions.push({
      amount: Math.round((fraction / 100) * totalPrice),
      percent: `${fraction}%`,
      label,
      paymentStep: `${index + 1}/${paymentFractions.length}`,
      index,
      paid: false,
    })
  })

  const successfulPayments = order.payments?.filter(
    (p) => p.status === "succeeded",
  )
  successfulPayments.sort((a, b) => {
    const numA = parseInt(a.invoice_number.split("-")[1], 10)
    const numB = parseInt(b.invoice_number.split("-")[1], 10)
    return numB - numA // ordre décroissant
  })

  let isLastPaymentDone = false
  // We browse all fractions and remove matching payments + add attribute paid (boolean)
  fractions.map((f, key) => {
    if (!payments) return

    // 1st Step : Handle succeeded payments
    if (key < successfulPayments.length) {
      f.paymentStatus =
        successfulPayments[successfulPayments.length - key - 1]?.status

      if (
        Math.round(
          successfulPayments[successfulPayments.length - key - 1].amount,
        ) === Math.round(f.amount)
      )
        f.paid = true
    }
    // 2nd Step : Handle last payment (= 1st element of payments)
    else {
      if (
        payments[0]?.status !== "succeeded" &&
        key < payments.length &&
        !isLastPaymentDone
      ) {
        f.paymentStatus = payments[0]?.status
      }
      isLastPaymentDone = true
    }
  })

  return fractions
}

export function getNextPaymentDetails({ order }) {
  const fractions = getPaymentFractionsDetails({ order })

  const response = fractions.filter((f) => !f.paid)[0]

  return response
}
