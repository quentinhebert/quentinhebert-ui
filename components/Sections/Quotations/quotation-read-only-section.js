import { Box, Grid, Stack } from "@mui/material"
import { QUOTATION_ITEM_TYPES } from "../../../enums/quotationItemTypes"
import { convertDateToLongString } from "../../../services/date-time"
import BodyText from "../../Text/body-text"

const PAYMENT_OPTIONS = [
  { id: "card", label: "Carte bancaire" },
  { id: "transfer", label: "Virement bancaire" },
  { id: "check", label: "Chèque de banque" },
  { id: "cash", label: "Espèces" },
]

const HEAD = [
  { label: "Type" },
  { label: "Intitulé" },
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
      border: (theme) => `2px solid ${theme.palette.secondary.main}`,
      padding: 2,
      minWidth: width || "10%",
      background: (theme) => theme.palette.background.main,
    }}
  >
    <BodyText
      preventTransition
      color={(theme) => theme.palette.text.secondary}
      {...props}
    />
  </Box>
)
const Cell = (props) => (
  <Box
    component="td"
    textAlign="left"
    sx={{
      border: (theme) => `2px solid ${theme.palette.secondary.main}`,
      padding: 2,
    }}
  >
    <BodyText preventTransition color="#fff" {...props} />
  </Box>
)
const Line = (props) => (
  <Box
    component="tr"
    sx={{
      border: (theme) => `2px solid ${theme.palette.secondary.main}`,
      padding: 2,
    }}
    {...props}
  />
)
const DateInfo = ({ label, ...props }) => (
  <BodyText preventTransition>
    <Title>{label}</Title>
    <Box component="span" textTransform="capitalize" {...props} />
  </BodyText>
)
const Title = (props) => (
  <Stack>
    <BodyText
      preventTransition
      color={(theme) => theme.palette.text.secondary}
      {...props}
    />
  </Stack>
)
const Info = ({ title, ...props }) => (
  <BodyText preventTransition>
    <Title>{title}</Title>
    <Box component="span" {...props} />
  </BodyText>
)

export default function QuotationReadOnlySection({ items, quotation }) {
  // SUB-COMPONENTS
  const TotalPrices = () => {
    let totalPrice = 0
    let totalNoVatPrice = 0
    let totalVat = 0
    items.map((item) => {
      totalPrice += item.quantity * item.no_vat_price * (1 + item.vat / 100)
      totalNoVatPrice += item.quantity * item.no_vat_price
      totalVat += item.quantity * item.vat
    })
    totalPrice = totalPrice / 100
    totalNoVatPrice = totalNoVatPrice / 100

    const Label = (props) => (
      <Grid item xs={6}>
        <BodyText
          preventTransition
          {...props}
          color={(theme) => theme.palette.text.secondary}
        />
      </Grid>
    )

    const Price = (props) => (
      <Grid item xs={6}>
        <BodyText preventTransition {...props} />
      </Grid>
    )

    return (
      <Stack
        sx={{
          alignSelf: "end",
          border: (theme) => `1px solid ${theme.palette.secondary.main}`,
          borderRadius: "20px",
          padding: 2,
        }}
      >
        <Grid container>
          <Label>Total HT</Label>
          <Price>{totalNoVatPrice} €</Price>
          <Label>TVA</Label>
          <Price>{totalVat} €</Price>
          <Label>Total TTC</Label>
          <Price>{totalPrice} €</Price>
        </Grid>
      </Stack>
    )
  }

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
    <Stack gap={4} width="100%">
      <Stack
        sx={{
          border: "1px solid",
          borderColor: (theme) => theme.palette.secondary.main,
          padding: 4,
          borderRadius: "20px",
          gap: 2,
        }}
      >
        <DateInfo label="Date de la prestation">
          {convertDateToLongString(quotation.date)}
        </DateInfo>

        <DateInfo label="Date de livraison estimée">
          {convertDateToLongString(quotation.delivery_date)}
        </DateInfo>

        {/* Optional */}
        {!!quotation.duration && quotation.duration.trim !== "" && (
          <Info title="Durée estimée de la prestation">
            {quotation.duration}
          </Info>
        )}

        {/* Optional */}
        {!!quotation.validity_end_date && (
          <DateInfo label="Date de livraison estimée">
            {convertDateToLongString(quotation.validity_end_date)}
          </DateInfo>
        )}

        <Info title="Moyen(s) de règlement au choix">
          {paymentOptionsString}
        </Info>

        <Info title="Conditions de règlement">
          {quotation.payment_conditions}
        </Info>
      </Stack>

      <Stack overflow="auto">
        <Box
          component="table"
          sx={{
            width: "99%",
            margin: "0.5%",
            borderCollapse: "collapse",
            borderStyle: "hidden",
            borderRadius: "20px",
            boxShadow: (theme) => `0 0 0 2px ${theme.palette.secondary.main}`,
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
                  // QUOTATION_ITEM_TYPES.filter((elt) => elt.id === item.type)[0]
                  //   .label
                  item.type
                }
              </Cell>
              <Cell>{item.label}</Cell>
              <Cell>{item.description}</Cell>
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

      <TotalPrices />
    </Stack>
  )
}
