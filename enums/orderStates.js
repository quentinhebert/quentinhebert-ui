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
  REQUIRES_ACTION: {
    label: "Action requise",
    description: "Une action de votre part est requise.",
    severity: "warning",
  },
  FINISHED: {
    label: "En cours",
    description: "Votre commande terminée.",
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
    label: "Acompte payé",
    description: "Passez au paiement suivant.",
    severity: "info",
  },
  PARTIALLY_PAID: {
    label: "Partiellement payée",
    description: "La commande n'est pas entièrement payée.",
    severity: "info",
  },
  PAYMENT_FAILED: {
    label: "Échec de paiement",
    description: "Veuillez procéder au paiement à nouveau.",
    severity: "error",
  },
  CANCELED: {
    label: "Annulée",
    description: "Vous avez annulé votre commande.",
    severity: "error",
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
  ARCHIVED: {
    label: "Archivée",
    description: "La commande est archivée.",
    severity: "success",
  },
}
