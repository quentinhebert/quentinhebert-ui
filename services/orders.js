export function parseOrderPrice({ order, items }) {
  // All prices are in cents
  const response = {
    noVatPrice: 0,
    totalPrice: 0,
    totalVAT: 0,
    deposit: 0,
    balance: 0,
  }

  try {
    // Calculate totals
    items.map((item) => {
      response.noVatPrice += item.no_vat_price * item.quantity
      response.totalVAT += (item.vat / 100) * item.no_vat_price * item.quantity
    })
    response.totalPrice += response.noVatPrice + response.totalVAT

    // Calculate ratio deposit / balance
    const deposit = Number(order.deposit) / 100
    const balance = Number(order.balance) / 100
    if (deposit > 0) {
      response.deposit = Math.round(deposit * response.totalPrice)
      response.balance = Math.round(balance * response.totalPrice)
    } else {
      response.balance = response.totalPrice
    }

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
  paymentFractions.map((fraction, index) => {
    let label
    if (paymentFractions.length === 1) label = "facture" // one elt only
    if (index === 0) label = "accompte" // first elt
    else if (index === paymentFractions.length - 1) label = "solde" // last elt
    else label = "échéance" // middle elts
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
  const payments = order.payments.filter((p) => p.status !== "failed")
  fractions.map((f) => {
    if (f.amount === payments[payments.length - 1]?.amount) {
      f.paid = true
      payments.pop()
    }
  })

  return fractions
}

export function getNextPaymentDetails({ order }) {
  const payments = order.payments.filter((p) => p.status !== "failed")
  const fractions = getPaymentFractionsDetails({ order })

  const response = fractions.filter((f) => !f.paid)[0]

  return response
}
