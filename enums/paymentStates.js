export const PAYMENTSTATES = {
  requires_action: { label: "Action requise", severity: "warning" },
  requires_payment_method: { label: "en attente", severity: "warning" },
  succeeded: { label: "réussi", severity: "success" },
  failed: { label: "échec", severity: "error" },
  canceled: { label: "abandon", severity: "disabled" },
  processing: { label: "Paiement en cours", severity: "warning" },
}
