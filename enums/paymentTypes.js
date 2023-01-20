export const PAYMENT_TYPES = {
  STRIPE: { id: "STRIPE", label: "Stripe" },
  PAYPAL: { id: "PAYPAL", label: "Paypal" },
  CASH: { id: "CASH", label: "Espèces" },
  CHECK: { id: "CHECK", label: "Chèque" },
  TRANSFER: { id: "TRANSFER", label: "Virement bancaire manuel" },
}

export const STRIPE_PM = {
  card: "CB",
  sepa_debit: "Virement bancaire",
}
