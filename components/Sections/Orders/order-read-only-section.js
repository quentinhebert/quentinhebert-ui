import { Box, Grid, Stack } from "@mui/material"
import { convertDateToLongString } from "../../../services/date-time"
import BodyText from "../../Text/body-text"
import SmallTitle from "../../Titles/small-title"
import EuroIcon from "@mui/icons-material/Euro"
import HourglassTopIcon from "@mui/icons-material/HourglassTop"
import WorkHistoryIcon from "@mui/icons-material/WorkHistory"
import { QUOTATION_ITEM_TYPES } from "../../../enums/quotationItemTypes"
import PriceDetails from "../Account/Orders/price-details"

const PAYMENT_OPTIONS = [
  { id: "card", label: "Carte bancaire" },
  { id: "transfer", label: "Virement bancaire" },
  { id: "check", label: "Chèque de banque" },
  { id: "cash", label: "Espèces" },
]
const HEAD = [
  { label: "Type" },
  { label: "Description", width: { xs: "200px", md: "20%" } },
  { label: "Qté." },
  { label: "TVA" },
  { label: "Prix unit. HT" },
  { label: "Total" },
]
const HeadCell = ({ width, ...props }) => (
  <Box
    component="th"
    textAlign="left"
    sx={{
      border: (theme) => `1px solid #000`,
      padding: 2,
      minWidth: width || "10%",
    }}
  >
    <BodyText
      preventTransition
      color={(theme) => theme.palette.text.grey}
      fontSize="1rem"
      {...props}
    />
  </Box>
)
const Cell = (props) => (
  <Box
    component="td"
    textAlign="left"
    sx={{
      border: (theme) => `1px solid #000`,
      padding: 2,
    }}
  >
    <BodyText preventTransition color="#fff" {...props} fontSize="1rem" />
  </Box>
)
const Line = (props) => (
  <Box
    component="tr"
    sx={{
      border: (theme) => `1px solid #000`,
      padding: 2,
    }}
    {...props}
  />
)
const DateInfo = ({ label, ...props }) => (
  <BodyText preventTransition fontSize="1rem">
    <Title>{label}</Title>
    <Box component="span" textTransform="capitalize" {...props} />
  </BodyText>
)
const Title = (props) => (
  <Stack>
    <BodyText
      fontSize="1rem"
      preventTransition
      color={(theme) => theme.palette.text.grey}
      {...props}
    />
  </Stack>
)
const Info = ({ title, ...props }) => (
  <BodyText preventTransition fontSize="1rem">
    <Title>{title}</Title>
    <Box component="span" {...props} />
  </BodyText>
)
const Card = ({ title, icon, ...props }) => (
  // <Grid item xs={12} sm={6} md={4} lg={3} display="flex">
  <Grid item xs={12} display="flex">
    <Stack
      width="100%"
      sx={{
        background: (theme) => theme.palette.background.main,
        padding: 4,
        gap: 4,
        borderRadius: "30px",
      }}
    >
      <SmallTitle
        alignItems="center"
        gap={1}
        display="flex"
        color="#fff"
        textTransform="capitalize"
      >
        {icon}
        {title}
      </SmallTitle>
      <Stack {...props} gap={2} />
    </Stack>
  </Grid>
)

export default function OrderReadOnlySection({ items, quotation }) {
  let paymentOptionsArray = []
  Object.keys(quotation.payment_options).map((opt) => {
    if (quotation.payment_options[opt] === true) {
      paymentOptionsArray.push(
        PAYMENT_OPTIONS.filter((elt) => elt.id === opt)[0].label
      )
    }
  })
  const paymentOptionsString = paymentOptionsArray.join(", ")

  // RENDER
  return (
    <Stack gap={2} width="100%">
      <Grid
        container
        spacing={2}
        sx={{
          borderRadius: "20px",
        }}
      >
        <Card title="Prestation" icon={<WorkHistoryIcon />}>
          <DateInfo label="Date">
            {convertDateToLongString(quotation.date)}
          </DateInfo>

          <DateInfo label="Livraison (estimation)">
            {convertDateToLongString(quotation.delivery_date)}
          </DateInfo>

          {/* Optional */}
          {!!quotation.duration && quotation.duration.trim !== "" && (
            <Info title="Durée estimée de la prestation">
              {quotation.duration}
            </Info>
          )}
        </Card>

        <Card title="Règlement" icon={<EuroIcon />}>
          <Info title="Moyen(s) de paiement au choix">
            {paymentOptionsString}
          </Info>

          <Info title="Conditions">{quotation.payment_conditions}</Info>

          {Number(quotation.deposit) !== 0 && (
            <>
              <Info title="Acompte / Solde">
                {quotation.deposit}% / {quotation.balance}%
              </Info>
            </>
          )}

          <Info title="Pénalités de retard">
            {quotation.payment_delay_penalties}
          </Info>
        </Card>

        {/* Optional */}
        {!!quotation.validity_end_date && (
          <Card title="Validité" icon={<HourglassTopIcon />}>
            <DateInfo label="Devis valable jusqu'au">
              {convertDateToLongString(quotation.validity_end_date)}
            </DateInfo>
          </Card>
        )}
      </Grid>

      <Stack overflow="auto">
        <Box
          component="table"
          sx={{
            background: (theme) => theme.palette.background.main,
            width: "99%",
            margin: "0 0.5%",
            borderCollapse: "collapse",
            borderStyle: "hidden",
            borderRadius: "20px",
            boxShadow: "0 0 0 2px #000",
            overflow: "hidden",
          }}
        >
          {HEAD.map((item, key) => (
            <HeadCell key={key} width={item.width}>
              {item.label}
            </HeadCell>
          ))}

          {items.map((item, key) => (
            <Line key={key}>
              <Cell>
                {
                  QUOTATION_ITEM_TYPES.filter((elt) => elt.id === item.type)[0]
                    .label
                }
              </Cell>
              <Cell>
                {item.label}
                <br />
                <Box
                  component="span"
                  color={(theme) => theme.palette.text.grey}
                >
                  {item.description}
                </Box>
              </Cell>
              <Cell>{item.quantity}</Cell>
              <Cell>{item.vat} %</Cell>
              <Cell>{item.no_vat_price / 100} €</Cell>
              <Cell>
                {(item.no_vat_price / 100) *
                  item.quantity *
                  (1 + item.vat / 100)}{" "}
                €
              </Cell>
            </Line>
          ))}
        </Box>
      </Stack>

      <PriceDetails items={items} order={quotation} />
    </Stack>
  )
}
