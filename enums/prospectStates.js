const PROSPECT_STATES = {
  DRAFT: {
    severity: "disabled",
    label: "Non contacté(e)",
  },
  CONTACTED: {
    severity: "warning",
    label: "Icebreaker envoyé",
  },
  AWAITING: {
    severity: "info",
    label: "Discussion ouverte",
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
  "DRAFT",
  "CONTACTED",
  "AWAITING",
  "CONVERTED",
  "CANCELED",
]

export default PROSPECT_STATES
