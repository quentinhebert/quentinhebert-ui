import { Grid, Stack } from "@mui/material"
import { parseOrderPrice } from "../../../../services/orders"
import BodyText from "../../../Text/body-text"

const Label = (props) => (
  <Grid item xs={8}>
    <BodyText
      preventTransition
      {...props}
      color={(theme) => theme.palette.text.grey}
      fontSize="1rem"
    />
  </Grid>
)

const Price = (props) => (
  <Grid item xs={4} textAlign="right">
    <BodyText preventTransition {...props} fontSize="1rem" />
  </Grid>
)

export default function PriceDetails({ items, order }) {
  const { totalVAT, totalPrice, deposit, balance } = parseOrderPrice({
    order,
    items,
  }) // all prices in cents

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
        {deposit > 0 && (
          <>
            <Stack
              sx={{
                borderBottom: "1px solid rgb(256,256,256, 0.1)",
                width: "100%",
                margin: "1rem 0",
              }}
            />
            <Label>Acompte TTC ({order.deposit}%)</Label>
            <Price>{deposit / 100} €</Price>
            <Label>Solde TTC ({order.balance}%)</Label>
            <Price>{balance / 100} €</Price>
          </>
        )}
      </Grid>
    </Stack>
  )
}
