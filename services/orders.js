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
