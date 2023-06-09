const PAYOUT_STATUS = {
  paid: {
    label: { en: "Paid", fr: "Payé" },
    severity: "success",
  },
  pending: {
    label: { en: "Pending", fr: "En attente" },
    severity: "warning",
  },
  in_transit: {
    label: { en: "In transit", fr: "En acheminement" },
    severity: "info",
  },
  canceled: {
    label: { en: "Canceled", fr: "Annulé" },
    severity: "default",
  },
  failed: {
    label: { en: "Failed", fr: "Échec" },
    severity: "error",
  },
}

export default PAYOUT_STATUS
