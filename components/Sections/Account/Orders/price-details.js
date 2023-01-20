import { Box, Grid, Stack } from "@mui/material"
import { Fragment } from "react"
import {
  getPaymentFractionsDetails,
  parseOrderPrice,
} from "../../../../services/orders"
import BodyText from "../../../Text/body-text"

const Label = (props) => (
  <Grid
    item
    xs={8}
    sx={{
      "&:first-letter": {
        textTransform: "capitalize",
      },
    }}
  >
    <BodyText
      className="initial-cap"
      preventTransition
      color={(theme) => theme.palette.text.grey}
      fontSize="1rem"
      {...props}
    />
  </Grid>
)

const Price = (props) => (
  <Grid item xs={4} textAlign="right">
    <BodyText preventTransition {...props} fontSize="1rem" />
  </Grid>
)

export default function PriceDetails({ items, order }) {
  const { totalVAT, totalPrice } = parseOrderPrice({
    order,
    items,
  }) // all prices in cents
  const paymentFractions = getPaymentFractionsDetails({ order })

  return (
    <Stack
      sx={{
        alignSelf: "end",
        background: (theme) => theme.palette.background.main,
        borderRadius: "20px",
        padding: 2,
      }}
    >
      <Grid container width="300px">
        <Label color="#fff">Total TTC</Label>
        <Price>{totalPrice / 100} €</Price>
        <Label>Dont TVA</Label>
        <Price color="grey">{totalVAT / 100} €</Price>
        {paymentFractions.length > 1 && (
          <>
            <Stack
              sx={{
                borderBottom: "1px solid rgb(256,256,256, 0.1)",
                width: "100%",
                margin: "1rem 0",
              }}
            />
            {paymentFractions.map((f, key) => (
              <Fragment key={key}>
                <Label>
                  {f.label} TTC ({f.percent})
                </Label>
                <Price>{f.amount / 100} €</Price>
              </Fragment>
            ))}
          </>
        )}
      </Grid>
    </Stack>
  )
}
