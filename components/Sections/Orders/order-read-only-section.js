import {
  Box,
  Grid,
  Stack,
  Table,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material"
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
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import TodayIcon from "@mui/icons-material/Today"
import TimerIcon from "@mui/icons-material/Timer"
import { formatPrice } from "../../../services/utils"

export default function OrderReadOnlySection({
  items,
  order,
  hideDetails,
  hideModalities,
  hidePriceDetails,
  hidePaymentDetails,
  hideDates,
}) {
  let paymentOptionsArray = []
  Object.keys(order.payment_options).map((opt) => {
    if (order.payment_options[opt] === true) {
      paymentOptionsArray.push(
        PAYMENT_OPTIONS.filter((elt) => elt.id === opt)[0].label,
      )
    }
  })
  const paymentOptionsString = paymentOptionsArray.join(" / ")
  const fractionsArray = []
  const fractions = getPaymentFractionsDetails({ order })
  fractions.map((f) => fractionsArray.push(`${f.amount / 100}€ (${f.percent})`))
  const fractionsString = fractionsArray.join(" + ")

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
          {!hideDates && (
            <Card>
              <Stack
                gap={2}
                sx={{
                  justifyContent: "space-between",
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <DateInfo
                  label="Prestation"
                  icon={<TodayIcon sx={{ fontSize: "2rem" }} />}
                  value={convertDateToShortString(order.date)}
                />

                {/* Optional */}
                {!!order.duration && order.duration.trim !== "" && (
                  <DateInfo
                    label="Durée estimée de la prestation"
                    value={order.duration}
                    textAlign="center"
                    icon={<TimerIcon />}
                  />
                )}

                <DateInfo
                  label="Livraison prévue le"
                  textAlign="right"
                  icon={<LocalShippingIcon sx={{ fontSize: "2rem" }} />}
                  value={convertDateToShortString(order.delivery_date)}
                />
              </Stack>
            </Card>
          )}
          {!!order.description && (
            <Card>
              <Info title="Informations complémentaires">
                {order.description}
              </Info>
            </Card>
          )}
          {!hidePaymentDetails && (
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
                <Info title="TVA applicable">
                  {order.no_vat
                    ? "TVA non applicable, article 293B du Code Général des Impôts (CGI)"
                    : "Oui"}
                </Info>

                <Info title="Moyen(s) de paiement acceptés">
                  {paymentOptionsString}
                </Info>

                <Info title="Échéances">
                  {order.payment_conditions}
                  <br />
                  <BodyText
                    preventTransition
                    fontSize=".8rem"
                    color={(theme) => theme.palette.text.grey}
                  >
                    {fractionsString}
                  </BodyText>
                </Info>

                <Info title="Pénalités de retard">
                  {order.payment_delay_penalties}
                </Info>
              </Table>
            </Card>
          )}

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
                width: { xs: "99%", sm: "100%" },
                margin: { xs: "0 0.5%", md: 0 },
                borderCollapse: "collapse",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <TableHead />

              {items &&
                items.map((item, key) => (
                  <Line key={key} index={key}>
                    <Cell>
                      {
                        QUOTATION_ITEM_TYPES.filter(
                          (elt) => elt.id === item.type,
                        )[0].label
                      }
                    </Cell>
                    <Cell>
                      <Box
                        component="span"
                        fontSize=".9rem"
                        color="#fff"
                        fontStyle="italic"
                      >
                        {item.label}
                      </Box>
                      <Box
                        mt={1}
                        component="div"
                        fontSize={{ xs: ".8rem", md: "1rem" }}
                        color={(theme) => theme.palette.text.grey}
                      >
                        {item.description}
                      </Box>
                    </Cell>
                    <Cell textAlign="right">{item.quantity}</Cell>
                    <Cell whiteSpace="nowrap" textAlign="right">
                      {formatPrice(item.no_vat_price)} €
                    </Cell>
                    <Cell whiteSpace="nowrap" textAlign="right">
                      {item.vat} %
                    </Cell>
                    <Cell whiteSpace="nowrap" textAlign="right">
                      {formatPrice(item.no_vat_price * item.quantity)} €
                    </Cell>
                  </Line>
                ))}
            </Box>
          </Stack>

          {!hidePriceDetails && (
            <Stack alignSelf="end" maxWidth="420px">
              <PriceDetails items={items} order={order} />
            </Stack>
          )}
        </>
      )}
    </Stack>
  )
}

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
  { label: "Qté.", textAlign: "right" },
  { label: "Prix unit. HT", textAlign: "right" },
  { label: "TVA", textAlign: "right" },
  { label: "Total HT", textAlign: "right" },
]
function TableHead() {
  return HEAD.map((item, key) => (
    <HeadCell key={key} width={item.width} textAlign={item.textAlign || "left"}>
      {item.label}
    </HeadCell>
  ))

  function HeadCell({ width, textAlign, ...props }) {
    return (
      <Box
        component="th"
        alignItems="center"
        justifyContent="center"
        sx={{
          padding: ".5rem 1rem",
          minWidth: width || "10%",
          background: "rgb(0,0,0,0.6)",
        }}
      >
        <BodyText
          preventTransition
          color={(theme) => theme.palette.text.grey}
          fontSize={{ xs: "0.8rem", md: "1rem" }}
          display="flex"
          justifyContent={textAlign === "right" ? "end" : ""}
          whiteSpace="nowrap"
          {...props}
        />
      </Box>
    )
  }
}
const Cell = (props) => (
  <Box
    component="td"
    textAlign={props.textAlign || "left"}
    sx={{
      padding: ".5rem 1rem",
    }}
  >
    <BodyText
      preventTransition
      color="#fff"
      {...props}
      fontSize="1rem"
      lineHeight="1rem"
    />
  </Box>
)
const Line = ({ index, ...props }) => (
  <Box
    component="tr"
    sx={{
      background: index % 2 === 0 ? "rgb(0,0,0,0.0)" : "rgb(0,0,0,0.1)",
      padding: 2,
    }}
    {...props}
  />
)
const DateInfo = ({ label, textAlign, icon, value, ...props }) => (
  <Tooltip title={label}>
    <Stack
      sx={{ textAlign: { xs: "left", sm: textAlign || "left" } }}
      className="flex-center"
      flexDirection="row"
      gap={1}
    >
      <Typography
        color={(theme) => theme.palette.secondary.main}
        textAlign={{ xs: "left", sm: textAlign || "left" }}
        display="flex"
      >
        {icon}
      </Typography>
      <BodyText
        preventTransition
        fontSize="1rem"
        textTransform="capitalize"
        textAlign={{ xs: "left", sm: textAlign || "left" }}
      >
        {value}
      </BodyText>
    </Stack>
  </Tooltip>
)
const Title = (props) => (
  <Stack>
    <BodyText fontSize="1rem" preventTransition {...props} />
  </Stack>
)
const Info = ({ title, ...props }) => (
  <Stack mb={2}>
    <Title>{title}</Title>
    <BodyText
      preventTransition
      fontSize=".8rem"
      className="initial-cap"
      color={(theme) => theme.palette.text.grey}
      {...props}
    />
  </Stack>
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
