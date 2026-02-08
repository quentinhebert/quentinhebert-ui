import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Stack,
  Typography,
} from "@mui/material"
import { Fragment, useEffect, useState } from "react"
import {
  getPaymentFractionsDetails,
  parseOrderPrice,
} from "../../../../services/orders"
import BodyText from "../../../Text/body-text"
import Span from "../../../Text/span"
import { formatPrice } from "../../../../services/utils"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

export default function PriceDetails({ order, items }) {
  const {
    price,
    noVatPrice,
    vat,
    vat5,
    vat10,
    vat20,
    basisVat5,
    basisVat10,
    basisVat20,
  } = parseOrderPrice({
    order: {
      items: items || order.items,
      payment_fractions: order.payment_fractions,
    },
  }) // all prices in cents

  const [paymentFractions, setPaymentFractions] = useState(
    getPaymentFractionsDetails({
      order: { ...order, items: items || order.items },
    }),
  )
  useEffect(() => {
    setPaymentFractions(
      getPaymentFractionsDetails({
        order: {
          ...order,
          total_price: price,
          items: order.items,
        },
      }),
    )
  }, [price, order.payment_fractions])

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
        <Label color="#fff">Sous-total HT</Label>
        <Price color="#fff">{formatPrice(noVatPrice)} €</Price>

        {basisVat20 > 0 && (
          <>
            <Label indent italic>
              20% de {formatPrice(basisVat20)} €
            </Label>
            <Price indent italic color="grey">
              {formatPrice(vat20)} €
            </Price>
          </>
        )}
        {basisVat10 > 0 && (
          <>
            <Label indent italic>
              10% de {formatPrice(basisVat10)} €
            </Label>
            <Price indent italic color="grey">
              {formatPrice(vat10)} €
            </Price>
          </>
        )}
        {basisVat5 > 0 && (
          <>
            <Label indent italic>
              5,5% de {formatPrice(basisVat5)} €
            </Label>
            <Price indent italic color="grey">
              {formatPrice(vat5)} €
            </Price>
          </>
        )}
        {(basisVat20 > 0) + (basisVat10 > 0) + (basisVat5 > 0) >= 2 && (
          <>
            <Label>Total TVA</Label>
            <Price color="grey">{formatPrice(vat)} €</Price>
          </>
        )}

        <Separator />

        <Label big color="#fff">
          Total TTC
        </Label>
        <Price big color="#fff">
          {formatPrice(price)} €
        </Price>

        {paymentFractions.length > 1 && (
          <>
            <Separator />

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
                <Grid container width="100%" color="grey">
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
                          {f.label} TTC (
                          {Number(f.percent.split("%")[0]).toFixed(2)}%){" "}
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

const Separator = () => (
  <Stack
    sx={{
      borderBottom: "1px solid rgb(256,256,256, 0.1)",
      width: "100%",
      margin: "1rem 0",
    }}
  />
)

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
      fontSize={props.big ? "1.8rem" : "1rem"}
      marginLeft={props.indent ? "1rem" : 0}
      fontStyle={props.italic ? "italic" : ""}
      {...props}
    />
  </Grid>
)

const Price = (props) => (
  <Grid item xs={4} textAlign="right">
    <Typography
      {...props}
      minWidth="60px"
      fontSize={props.big ? "1.8rem" : "1rem"}
      lineHeight={props.big ? "1.8rem" : "1rem"}
      marginRight={props.indent ? "1rem" : 0}
      fontStyle={props.italic ? "italic" : ""}
      whiteSpace="nowrap"
      textOverflow="unset"
    />
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
