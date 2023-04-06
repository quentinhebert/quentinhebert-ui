import { Box, Grid, Stack, Table, TableCell, TableRow } from "@mui/material"
import {
  convertDateToLongString,
  convertDateToShortString,
} from "../../../services/date-time"
import BodyText from "../../Text/body-text"
import SmallTitle from "../../Titles/small-title"
import HourglassTopIcon from "@mui/icons-material/HourglassTop"
import { QUOTATION_ITEM_TYPES } from "../../../enums/quotationItemTypes"
import PriceDetails from "../Account/Orders/price-details"
import { getPaymentFractionsDetails } from "../../../services/orders"

const PAYMENT_OPTIONS = [
  { id: "CARD", label: "carte bancaire" },
  { id: "TRANSFER", label: "virement" },
  { id: "CHECK", label: "chèque" },
  { id: "CASH", label: "espèces" },
  { id: "STRIPE", label: "paiement en ligne" },
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
    alignItems="center"
    justifyContent="center"
    sx={{
      border: (theme) => `1px solid #000`,
      padding: ".5rem 1rem",
      minWidth: width || "10%",
    }}
  >
    <BodyText
      preventTransition
      color={(theme) => theme.palette.text.grey}
      fontSize={{ xs: "0.8rem", md: "1rem" }}
      display="flex"
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
      padding: ".5rem 1rem",
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
const DateInfo = ({ label, textAlign, ...props }) => (
  <Stack sx={{ textAlign: { xs: "left", sm: textAlign || "left" } }}>
    <Title textAlign={{ xs: "left", sm: textAlign || "left" }}>{label}</Title>
    <BodyText
      preventTransition
      fontSize="1rem"
      textTransform="capitalize"
      {...props}
      textAlign={{ xs: "left", sm: textAlign || "left" }}
    />
  </Stack>
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
  <TableRow>
    <TableCell sx={{ verticalAlign: "top !important" }}>
      <Title>{title}</Title>
    </TableCell>
    <TableCell>
      <BodyText
        preventTransition
        fontSize="1rem"
        className="initial-cap"
        {...props}
      />
    </TableCell>
  </TableRow>
)
const Card = ({ title, icon, fullwidth, ...props }) => (
  // <Grid item xs={12} sm={6} md={4} lg={3} display="flex">
  <Grid item xs={12} display="flex">
    <Stack
      width="100%"
      sx={{
        background: (theme) => theme.palette.background.main,
        padding: 2,
        gap: 4,
        borderRadius: "20px",
      }}
    >
      {!!title && (
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
      )}
      <Stack {...props} gap={2} />
    </Stack>
  </Grid>
)

export default function OrderReadOnlySection({
  items,
  order,
  hideDetails,
  hideModalities,
}) {
  let paymentOptionsArray = []
  Object.keys(order.payment_options).map((opt) => {
    if (order.payment_options[opt] === true) {
      paymentOptionsArray.push(
        PAYMENT_OPTIONS.filter((elt) => elt.id === opt)[0].label
      )
    }
  })
  const paymentOptionsString = paymentOptionsArray.join(" / ")
  let fractionsString = ""
  getPaymentFractionsDetails({ order })

  // RENDER
  return (
    <Stack gap={2} width="100%">
      {(hideDetails || (!hideDetails && !hideModalities)) && (
        <Grid
          container
          spacing={2}
          sx={{
            borderRadius: "20px",
          }}
        >
          <Card>
            <Stack
              gap={2}
              sx={{
                justifyContent: "space-between",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <DateInfo label="Prestation">
                {convertDateToShortString(order.date)}
              </DateInfo>

              {/* Optional */}
              {!!order.duration && order.duration.trim !== "" && (
                <DateInfo label="Durée estimée de la prestation">
                  {order.duration}
                </DateInfo>
              )}

              <DateInfo label="Livraison prévue le" textAlign="right">
                {convertDateToShortString(order.delivery_date)}
              </DateInfo>
            </Stack>
          </Card>

          <Card>
            <Table
              sx={{
                "& .MuiTableCell-root": {
                  verticalAlign: "initial",
                  borderBottom: "none",
                  padding: ".5rem .25rem",
                  paddingRight: "1rem",
                  paddingBottom: "1rem",
                },
              }}
            >
              <Info title="Moyen(s) de paiement acceptés">
                {paymentOptionsString}
              </Info>

              <Info title="Conditions">
                {order.payment_conditions}
                <br />
                <BodyText>{fractionsString}</BodyText>
              </Info>

              <Info title="Pénalités de retard">
                {order.payment_delay_penalties}
              </Info>
            </Table>
          </Card>

          {/* Optional */}
          {!!order.validity_end_date && (
            <Card title="Validité" icon={<HourglassTopIcon />}>
              <DateInfo label="Devis valable jusqu'au">
                {convertDateToLongString(order.validity_end_date)}
              </DateInfo>
            </Card>
          )}
        </Grid>
      )}

      {(hideModalities || (!hideDetails && !hideModalities)) && (
        <>
          <Stack overflow="auto">
            <Box
              component="table"
              sx={{
                background: (theme) => theme.palette.background.main,
                width: "99%",
                margin: "0 0.5%",
                borderCollapse: "collapse",
                borderRadius: "20px",
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
                      QUOTATION_ITEM_TYPES.filter(
                        (elt) => elt.id === item.type
                      )[0].label
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

          <PriceDetails items={items} order={order} />
        </>
      )}
    </Stack>
  )
}
