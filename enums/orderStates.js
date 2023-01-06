export const ORDERSTATES = {
  DRAFT: {
    label: "Brouillon",
    description:
      "Votre commande est encore un brouillon. Un administrateur doit valider la commande.",
    severity: "disabled",
  },
  IN_PROCESS: {
    label: "En cours",
    description: "Votre commande est en cours.",
    severity: "disabled",
  },
  FINISHED: {
    label: "En cours",
    description: "Votre commande est en cours.",
    severity: "disabled",
  },

  WAITING_FOR_PAYMENT: {
    label: "Non finalisée",
    description: "Votre commande est en attente du paiement.",
    severity: "info",
  },
  PAYMENT_PROCESSING: {
    label: "Paiement en cours",
    description: "Votre paiement est en attente d'autorisation.",
    severity: "warning",
  },
  PAYMENT_SUCCEEDED: {
    label: "Payée",
    description: "Votre commande est payée.",
    severity: "success",
  },
  DEPOSIT_PAID: {
    label: "Acompté payé",
    description: "Il vous reste à payer le solde",
    severity: "disabled",
  },
  PAYMENT_FAILED: {
    label: "Bloquée",
    description:
      "Votre commande a été bloquée car le paiement a été refusé. Veuillez procéder au paiement à nouveau.",
    severity: "error",
  },
  CANCELLED: {
    label: "Annulée",
    description: "Vous avez annulé votre commande.",
    severity: "disabled",
  },
  ASK_FOR_REFUND: {
    label: "Remboursement demandé",
    description: "Vous avez demandé le remboursement.",
    severity: "warning",
  },
  REFUND_PROCESSING: {
    label: "En cours de remboursement",
    description: "Le remboursement est en cours.",
    severity: "warning",
  },
  REFUNDED: {
    label: "Remboursée",
    description: "Votre commande vous a été remboursée.",
    severity: "disabled",
  },
  WAITING_FOR_DELIVERY: {
    label: "En attente de livraison",
    description: "Votre commande n'a pas encore été livrée.",
    severity: "warning",
  },
  DELIVERED: {
    label: "Livrée",
    description: "Votre commande a été livrée.",
    severity: "success",
  },
  REVIEWED: {
    label: "Notée",
    description: "La commande est terminée et vous l'avez notée.",
    severity: "success",
  },
}
