import { Typography } from "@mui/material"
import { formatPrice } from "./utils"
import { PAYMENT_TYPES } from "../enums/paymentTypes"

export const LOG_CONTENT = {
  "order.created": {
    label: "Commande créée",
    description: ({ order }) => (
      <>
        La commande <Hightlight>{order.label}</Hightlight> a été créée.
      </>
    ),
  },
  "order.updated": {
    label: "Commande modifiée",
    description: ({ order }) => <>La commande a été modifiée.</>,
  },
  "order.ready": {
    label: "Commande prête",
    description: ({ order }) => (
      <>La commande a été marquée comme prête. Le règlement est en attente.</>
    ),
  },
  "order.client_assigned": {
    label: "Client modifié",
    description: ({ order }) => {
      if (!order?.client)
        return <>L'ancien client associé à la commande a été dissocié.</>
      return (
        <>
          <Hightlight>
            {order?.client[0]?.firstname} {order?.client[0]?.lastname}
          </Hightlight>{" "}
          a été associé à la commande.
        </>
      )
    },
  },
  "order.payment_link_sent": {
    label: "Lien de paiement envoyé",
    description: ({ order }) => (
      <>
        Un lien de paiement de <Hightlight>{order?.amount}</Hightlight> a été
        envoyé à <Hightlight>{order?.email}</Hightlight>.
        <br />
        <Link url={order?.link} label="" />
      </>
    ),
  },
  "order.tag_as_paid": {
    label: "Un paiement a été réglé manuellement",
    description: ({ payment }) => (
      <>
        Un paiement de <Hightlight>{formatPrice(payment?.amount)} €</Hightlight>{" "}
        a été réglé manuellement avec le moyen{" "}
        <Hightlight>{PAYMENT_TYPES[payment?.type].label}</Hightlight>.
      </>
    ),
  },
  "order.invoice_generated": {
    label: "Nouvelle facture",
    description: ({ order }) => (
      <>
        Une nouvelle facture a été générée. Facture N°{" "}
        <Hightlight>{order.invoice.number}</Hightlight>.
        <br />
        <Link url={order?.invoice?.url} label="Télécharger la facture" />
      </>
    ),
  },
  "order.quotation_generated": {
    label: "Nouveau devis",
    description: ({ order }) => (
      <>
        Une nouvelle facture a été générée. Facture N°{" "}
        <Hightlight>{order.quotation.number}</Hightlight>.
        <br />
        <Link url={order?.quotation?.url} label="Télécharger le devis" />
      </>
    ),
  },
  "order.quotation_sent": {
    label: "Devis envoyé",
    description: ({ order }) => (
      <>
        Un devis a été envoyé à l'adresse
        <Hightlight>{order.quotation.destination_email}</Hightlight>.
        <br />
        <Link url={order?.quotation?.url} label="Télécharger le devis" />
      </>
    ),
  },
}

function Hightlight(props) {
  return (
    <Typography
      color="text.white"
      fontStyle="italic"
      variant="span"
      mx={0.3}
      {...props}
    />
  )
}
function Link({ url, label }) {
  return (
    <a target="_blank" href={url}>
      <Typography
        color="secondary"
        component="span"
        sx={{
          textDecoration: "underline",
          "&:hover": { opacity: 0.7 },
        }}
      >
        {label || url}
      </Typography>
    </a>
  )
}
