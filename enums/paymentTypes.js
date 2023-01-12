export const PAYMENT_TYPES = {
  STRIPE: { id: "STRIPE", label: "Stripe" },
  PAYPAL: { id: "PAYPAL", label: "Paypal" },
  CASH: { id: "CASH", label: "Espèces" },
  BANK_CHECK: { id: "BANK_CHECK", label: "Chèque" },
  BANK_TRANSFER: { id: "BANK_TRANSFER", label: "Virement bancaire manuel" },
}

export const STRIPE_PM = {
  card: "CB",
  sepa_debit: "Virement bancaire",
}
