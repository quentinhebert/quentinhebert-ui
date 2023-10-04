export const PAYMENT_TYPES = {
  STRIPE: { id: "STRIPE", label: "Stripe" },
  PAYPAL: { id: "PAYPAL", label: "Paypal" },
  CASH: { id: "CASH", label: "Espèces" },
  CHECK: { id: "CHECK", label: "Chèque" },
  TRANSFER: { id: "TRANSFER", label: "Virement bancaire manuel" },
  CARD: { id: "CARD", label: "CB" },
}

export const STRIPE_PM = {
  card: "CB en ligne",
  sepa_debit: "Virement bancaire",
}
