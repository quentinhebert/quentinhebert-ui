import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Stack,
  Typography,
} from "@mui/material"
import { Fragment } from "react"
import {
  getPaymentFractionsDetails,
  parseOrderPrice,
} from "../../../../services/orders"
import BodyText from "../../../Text/body-text"
import Span from "../../../Text/span"
import { formatPrice } from "../../../../services/utils"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

const Label = (props) => (
  <Grid
    item
    xs={9}
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
  <Grid item xs={3} textAlign="right">
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
const ProcessingChip = ({}) => (
  <Span
    color={(theme) => theme.alert.title.warning.color}
    sx={{
      fontSize: ".8rem",
      padding: "0 .5rem",
      borderRadius: "30px",
      border: (theme) => `1px solid ${theme.alert.title.warning.color}`,
      background: (theme) => theme.alert.title.warning.background,
      ml: 0.5,
    }}
  >
    En cours
  </Span>
)
const FailedChip = ({}) => (
  <Span
    color={(theme) => theme.alert.title.error.color}
    sx={{
      fontSize: ".8rem",
      padding: "0 .5rem",
      borderRadius: "30px",
      border: (theme) => `1px solid ${theme.alert.title.error.color}`,
      background: (theme) => theme.alert.title.error.background,
      ml: 0.5,
    }}
  >
    Échec
  </Span>
)

export default function PriceDetails({ items, order }) {
  let localOrder = order
  const { totalVAT, totalPrice } = parseOrderPrice({
    order,
    items,
  }) // all prices in cents
  if (!localOrder.total_price) localOrder.total_price = totalPrice

  const paymentFractions = getPaymentFractionsDetails({ order: localOrder })

  return (
    <Stack
      width="100%"
      sx={{
        alignSelf: "start",
        background: (theme) => theme.palette.background.main,
        borderRadius: "20px",
        padding: 2,
      }}
    >
      <Grid container minWidth={{ xs: "100%", lg: "200px" }}>
        <Label color="#fff">Total TTC</Label>
        <Price>{formatPrice(totalPrice)} €</Price>
        <Label>Dont TVA</Label>
        <Price color="grey">{formatPrice(totalVAT)} €</Price>
        {paymentFractions.length > 1 && (
          <>
            <Stack
              sx={{
                borderBottom: "1px solid rgb(256,256,256, 0.1)",
                width: "100%",
                margin: "1rem 0",
              }}
            />

            <Accordion
              sx={{
                width: "100%",
                "&.MuiAccordion-root": {
                  margin: 0,
                  boxShadow: "none",
                  backgroundImage: "none",
                  "&:before": { backgroundColor: "transparent" },
                },
                "& .MuiAccordionSummary-root": {
                  padding: 0,
                  minHeight: "0 !important",
                },
                "& .MuiAccordionSummary-content": {
                  margin: "0 !important",
                },
                "& .MuiAccordionDetails-root": {
                  padding: "1rem 0 0",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "text.grey" }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                  color: (theme) => theme.palette.text.grey,
                }}
              >
                <Typography color="inherit">
                  Détails des échéances
                  {paymentFractions?.length
                    ? ` (${paymentFractions.length})`
                    : ""}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container width="100%">
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
                          {f.label} TTC ({f.percent}){" "}
                          {f.paid ? (
                            <PaidChip />
                          ) : f.paymentStatus === "processing" ? (
                            <ProcessingChip />
                          ) : f.paymentStatus === "failed" ? (
                            <FailedChip />
                          ) : null}
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
                          {formatPrice(f.amount)} €
                        </Price>
                      </Fragment>
                    )
                  })}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </>
        )}
      </Grid>
    </Stack>
  )
}
