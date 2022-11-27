import { Box, Grid, Stack } from "@mui/material"
import { QUOTATION_ITEM_TYPES } from "../../../enums/quotationItemTypes"
import BodyText from "../../Text/body-text"

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

export default function QuotationReadOnlySection({ items }) {
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
        <BodyText {...props} color={(theme) => theme.palette.text.secondary} />
      </Grid>
    )

    const Price = (props) => (
      <Grid item xs={6}>
        <BodyText {...props} />
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

  // RENDER
  return (
    <>
      <Box
        component="table"
        sx={{
          width: "99%",
          marginLeft: "0.5%",
          marginBottom: "0.5%",
          marginTop: "0.5%",
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
                QUOTATION_ITEM_TYPES.filter((elt) => elt.id === item.type)[0]
                  .label
              }
            </Cell>
            <Cell>{item.label}</Cell>
            <Cell>{item.description}</Cell>
            <Cell>{item.quantity}</Cell>
            <Cell>{item.vat} %</Cell>
            <Cell>{item.no_vat_price / 100} €</Cell>
            <Cell>
              {(item.no_vat_price / 100) * item.quantity * (1 + item.vat / 100)}{" "}
              €
            </Cell>
          </Line>
        ))}
      </Box>

      <TotalPrices />
    </>
  )
}
