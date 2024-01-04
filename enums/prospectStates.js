export const PROSPECT_STATES = {
  ALL: {
    severity: "disabled2",
    label: "Tout",
  },
  REQUEST: {
    severity: "warning",
    label: "Demande de contact (reçue)",
  },
  DRAFT: {
    severity: "disabled",
    label: "Non contacté(e)",
  },
  CONTACTED: {
    severity: "warning",
    label: "Demande de contact (émise)",
  },
  AWAITING: {
    severity: "info",
    label: "Discussion en cours",
  },
  CONVERTED: {
    severity: "success",
    label: "Converti(e)",
  },
  CANCELED: {
    severity: "error",
    label: "Abandonné(e)",
  },
}

export const PROSPECT_STATES_ENUM = [
  "ALL",
  "DRAFT",
  "REQUEST",
  "CONTACTED",
  "AWAITING",
  "CONVERTED",
  "CANCELED",
]

export default PROSPECT_STATES
