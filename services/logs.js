import { Stack, Typography } from "@mui/material"

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
  "order.client_assigned": {
    label: "Nouveau client associé",
    description: ({ order }) => (
      <>
        <Hightlight>
          {order?.client[0]?.firstname} {order?.client[0]?.lastname}
        </Hightlight>{" "}
        a été associé à la commande.
      </>
    ),
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
