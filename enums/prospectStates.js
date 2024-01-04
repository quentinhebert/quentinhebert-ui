export const PROSPECT_STATES = {
  ALL: {
    severity: "disabled2",
    label: "Tout",
  },
  DRAFT: {
    severity: "disabled",
    label: "Non contacté(e)",
  },
  CONTACTED: {
    severity: "warning",
    label: "Premier contact",
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
  "CONTACTED",
  "AWAITING",
  "CONVERTED",
  "CANCELED",
]

export default PROSPECT_STATES
