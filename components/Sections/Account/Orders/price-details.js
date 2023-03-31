import { Box, Grid, Stack } from "@mui/material"
import { Fragment } from "react"
import {
  getPaymentFractionsDetails,
  parseOrderPrice,
} from "../../../../services/orders"
import BodyText from "../../../Text/body-text"
import Span from "../../../Text/span"

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

const PaidChip = ({}) => (
  <Span
    color={(theme) => theme.alert.title.success.color}
    sx={{
      fontSize: ".8rem",
      padding: "0 .5rem",
      borderRadius: "30px",
      border: (theme) => `1px solid ${theme.alert.title.success.color}`,
      background: (theme) => theme.alert.title.success.background,
      ml: 0.5,
    }}
  >
    payé
  </Span>
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
            {paymentFractions.map((f, key) => {
              return (
                <Fragment key={key}>
                  <Label
                    color={
                      (!paymentFractions[key].paid &&
                        paymentFractions[key - 1]?.paid) ||
                      (key === 0 && !f.paid)
                        ? (theme) => theme.palette.secondary.main
                        : null
                    }
                  >
                    {f.label} TTC ({f.percent}) {f.paid ? <PaidChip /> : null}
                  </Label>
                  <Price
                    color={
                      (!paymentFractions[key].paid &&
                        paymentFractions[key - 1]?.paid) ||
                      (key === 0 && !f.paid)
                        ? (theme) => theme.palette.secondary.main
                        : null
                    }
                  >
                    {f.amount / 100} €
                  </Price>
                </Fragment>
              )
            })}
          </>
        )}
      </Grid>
    </Stack>
  )
}
