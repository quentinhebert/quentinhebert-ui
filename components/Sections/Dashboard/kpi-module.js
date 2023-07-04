import { Box, Divider, Grid, Stack, Tab, Tabs, Typography } from "@mui/material"
import CustomCard from "../../Cards/custom-card"
import BodyText from "../../Text/body-text"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../contexts/UserContext"
import apiCall from "../../../services/apiCalls/apiCall"
import { formatPrice } from "../../../services/utils"
import PillButton from "../../Buttons/pill-button"
import { convertDateToShortString } from "../../../services/date-time"
import InTextLink from "../../Links/in-text-link"
import Span from "../../Text/span"
import { defaultConfig } from "../../../config/defaultConfig"

const Label = (props) => (
  <Grid item xs={8}>
    <Stack>
      <BodyText color="grey" {...props} />
    </Stack>
  </Grid>
)
const Value = (props) => (
  <Grid item xs={4}>
    <Stack>
      <BodyText textAlign="right" {...props} />
    </Stack>
  </Grid>
)

const RenderKpi = ({ data }) => (
  <Grid container spacing={2}>
    <Label>Prospects</Label>
    <Value>{data.prospects}</Value>
    <Label>Commandes en cours</Label>
    <Value>{data.orders}</Value>
    <Label>Projets livrés</Label>
    <Value>0</Value>
    <Label>C.A.</Label>
    <Value>{data.turnover / 100}€</Value>
  </Grid>
)

const Card = ({ title, ...props }) => (
  <Stack padding={2}>
    <Stack
      sx={{
        background: "rgb(0,0,0,0.3)",
        borderRadius: "15px",
        padding: 4,
        gap: 4,
        minWidth: "250px",
        scrollSnapAlign: "center",
      }}
    >
      <BodyText textAlign="center">{title}</BodyText>
      <Stack {...props} />
    </Stack>
  </Stack>
)

export default function KpiModule({}) {
  const [kpi, setKpi] = useState({
    this_week: {
      prospects: 0,
      orders: 0,
    },
    this_month: {
      prospects: 0,
      orders: 0,
    },
    this_year: {
      prospects: 0,
      orders: 0,
    },
  })

  const { user } = useContext(UserContext)

  async function fetchKpi() {
    const res = await apiCall.dashboard.kpi.get()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setKpi(jsonRes)
    }
  }

  useEffect(() => {
    fetchKpi()
  }, [])

  return (
    <CustomCard
      backgroundColor={(theme) => theme.palette.background.main}
      background={"transparent"}
    >
      <Stack
        className="flex-center"
        sx={{
          gap: { xs: 2, md: 6 },
          padding: { xs: "0", md: "1.5rem" },
        }}
      >
        <BodyText
          className="inline-flex gap-10"
          alignItems="center"
          fontSize="1.5rem"
          lineHeight="2rem"
          textAlign="center"
        >
          Content de vous revoir {user.firstname} ! 🎉
        </BodyText>

        <Stack
          flexDirection="row"
          overflow="auto"
          width="100%"
          sx={{
            scrollSnapType: "x mandatory",
            overflowX: "auto",
            scrollBehavior: "smooth",
          }}
        >
          <Card title="Cette semaine">
            <RenderKpi data={kpi.this_week} />
          </Card>

          <Card title="Ce mois-ci">
            <RenderKpi data={kpi.this_month} />
          </Card>

          <Card title="Cette année">
            <RenderKpi data={kpi.this_year} />
          </Card>
        </Stack>
      </Stack>
    </CustomCard>
  )
}

const MONTHS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
]

export function TurnoverModule({}) {
  const businessActivityStart = 2015
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()
  // Populate YEARS array
  const YEARS = []
  for (let i = currentYear; i >= businessActivityStart; i -= 1) {
    YEARS.push(i)
  }
  const initialTurnover = { total: 0, real: 0 }
  const initialPayments = []
  const initialFees = 0
  const [turnover, setTurnover] = useState(initialTurnover)
  const [totalFees, setTotalFees] = useState(initialFees)
  const [payments, setPayments] = useState(initialPayments)
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const handleChangeMonth = (e, newValue) => setSelectedMonth(newValue)
  function CustomTabPanel({ children, value, index, ...other }) {
    return (
      <Box
        width="100%"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ width: "100%" }}>{children}</Box>}
      </Box>
    )
  }
  const getTypeInfo = (type, metadata) => {
    switch (type) {
      case "CHECK":
        return <>Chèque</>
      case "CARD":
        return <>CB</>
      case "CASH":
        return <>Espèces</>
      case "TRANSFER":
        return <>Virement bancaire</>
      case "STRIPE":
        switch (metadata.type) {
          case "card":
            return <>Stripe / CB</>
          case "sepa_debit":
            return <>Stripe / Prélèvement SEPA</>
          case "paypal":
            return <>Stripe / PayPal</>
          default:
            return <></>
        }
      default:
        return <></>
    }
  }
  const getFees = (fees) => {
    let localFees = 0
    fees.map((fee) => {
      localFees += fee.amount
    })
    return formatPrice(localFees)
  }

  async function fetchData() {
    const res = await apiCall.dashboard.payments.getPerMonth({
      month: selectedMonth,
      year: selectedYear,
    })
    if (res && res.ok) {
      const jsonRes = await res.json()
      setPayments(jsonRes.payments)
      setTurnover(jsonRes.turnover)
      setTotalFees(jsonRes.total_fees)
    }
  }

  useEffect(() => {
    setTurnover(initialTurnover)
    setPayments(initialPayments)
    fetchData()
  }, [selectedMonth])

  return (
    <CustomCard
      backgroundColor={(theme) => theme.palette.background.main}
      background={"transparent"}
    >
      <Stack
        sx={{
          gap: 0.5,
          padding: { xs: "0", md: "1.5rem" },
        }}
      >
        <Stack
          sx={{
            background: "rgb(0,0,0,0.5)",
            borderRadius: "15px",
            padding: ".5rem 1rem",
          }}
          width="100%"
          overflow="hidden"
        >
          <Box
            display="flex"
            maxWidth="100%"
            margin="auto"
            sx={{
              flexDirection: "row",
              gap: 2,
              overflowX: "scroll",
              padding: "0 0 17px",
              marginBottom: "-34px",
              flexWrap: "no-wrap",
            }}
          >
            {YEARS.map((year, key) => {
              const isSelectedYear = year === selectedYear
              return (
                <PillButton
                  onClick={() => setSelectedYear(year)}
                  padding=".25rem .75rem"
                  background={
                    isSelectedYear
                      ? (theme) => theme.palette.secondary.main
                      : "transparent"
                  }
                  color={
                    isSelectedYear
                      ? (theme) => theme.palette.text.black
                      : (theme) => theme.palette.text.white
                  }
                  key={key}
                >
                  {year}
                </PillButton>
              )
            })}
          </Box>
        </Stack>

        <Box
          display="flex"
          justifyContent="center"
          width="100%"
          sx={{ background: "rgb(0,0,0,0.5)", borderRadius: "15px" }}
        >
          <Tabs
            value={selectedMonth}
            onChange={handleChangeMonth}
            aria-label="Months tab"
            textColor="#fff"
            indicatorColor="secondary"
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
          >
            {MONTHS.map((month, key) => (
              <Tab
                label={month}
                key={key}
                id={`tab-${month}`}
                aria-controls={`tabpanel-${month}`}
                sx={{
                  textTransform: "capitalize",
                  "&.Mui-disabled": {
                    color: "rgb(256,256,256,0.1) !important",
                  },
                }}
                disabled={
                  selectedYear === currentYear && key > new Date().getMonth()
                }
              />
            ))}
          </Tabs>
        </Box>

        <Stack
          sx={{
            background: "rgb(0,0,0,0.3)",
            borderRadius: "15px",
            padding: ".5rem 1rem",
          }}
          width="100%"
          overflow="hidden"
        >
          <Typography variant="h5" color="secondary">
            {MONTHS[selectedMonth]} {selectedYear}
          </Typography>
        </Stack>

        {MONTHS.map((month, index) => (
          <CustomTabPanel value={selectedMonth} index={index}>
            <Stack
              sx={{
                background: "rgb(0,0,0,0.3)",
                padding: 4,
                borderRadius: "15px",
              }}
            >
              <Stack gap={4}>
                <Stack gap={2}>
                  <Typography variant="h5" textAlign="left">
                    Chiffres d'affaire
                  </Typography>

                  <Stack gap={0.2}>
                    <Grid
                      container
                      maxWidth="500px"
                      sx={{
                        background: "rgb(0,0,0,0.5)",
                        borderRadius: "7.5px 7.5px 0 0",
                        padding: 2,
                      }}
                    >
                      <Grid item xs={8} sx={{ textAlign: "left" }}>
                        <BodyText
                          preventTransition
                          color="grey"
                          fontStyle="italic"
                        >
                          Montant total perçu
                        </BodyText>
                      </Grid>
                      <Grid item xs={4} sx={{ textAlign: "right" }}>
                        <BodyText
                          color={(theme) => theme.palette.text.secondary}
                          fontStyle="italic"
                        >
                          + {formatPrice(Number(turnover.total))} €
                        </BodyText>
                      </Grid>
                      <Grid item xs={8} sx={{ textAlign: "left" }}>
                        <BodyText
                          preventTransition
                          color="grey"
                          fontStyle="italic"
                        >
                          Frais de service Stripe
                        </BodyText>
                      </Grid>
                      <Grid item xs={4} sx={{ textAlign: "right" }}>
                        <BodyText
                          color={(theme) => theme.palette.error.main}
                          fontStyle="italic"
                        >
                          - {formatPrice(Number(turnover.total_fees))} €
                        </BodyText>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      maxWidth="500px"
                      sx={{
                        background: "rgb(0,0,0,0.5)",
                        borderRadius: "0 0 7.5px 7.5px",
                        padding: 2,
                      }}
                    >
                      <Grid item xs={8} sx={{ textAlign: "left" }}>
                        <BodyText preventTransition>
                          Chiffre d'affaire réel
                        </BodyText>
                      </Grid>
                      <Grid item xs={4} sx={{ textAlign: "right" }}>
                        <BodyText color="green" fontSize="1.5rem">
                          + {formatPrice(Number(turnover.real))} €
                        </BodyText>
                      </Grid>
                    </Grid>
                  </Stack>
                </Stack>

                <Stack gap={2}>
                  <Typography variant="h5" textAlign="left">
                    Livre de recettes
                  </Typography>

                  <Box overflow="auto" sx={{ borderRadius: "7.5px" }}>
                    <Grid
                      container
                      rowSpacing={2}
                      minWidth="800px"
                      width="100%"
                      sx={{
                        background: "rgb(0,0,0,0.5)",
                        borderRadius: "7.5px",
                        padding: 2,
                      }}
                    >
                      <Grid item xs={1} sx={{ textAlign: "left" }}>
                        <BodyText color="text.grey" preventTransition>
                          Montant
                        </BodyText>
                      </Grid>
                      <Grid item xs={1} sx={{ textAlign: "left" }}>
                        <BodyText color="text.grey" preventTransition>
                          Frais
                        </BodyText>
                      </Grid>
                      <Grid item xs={3} sx={{ textAlign: "left" }}>
                        <BodyText color="text.grey" preventTransition>
                          Commande
                        </BodyText>
                      </Grid>
                      <Grid item xs={2} sx={{ textAlign: "left" }}>
                        <BodyText color="text.grey" preventTransition>
                          Client
                        </BodyText>
                      </Grid>
                      <Grid item xs={2} sx={{ textAlign: "left" }}>
                        <BodyText color="text.grey" preventTransition>
                          Mode de paiement
                        </BodyText>
                      </Grid>
                      <Grid item xs={1.5} sx={{ textAlign: "left" }}>
                        <BodyText color="text.grey" preventTransition>
                          Facture
                        </BodyText>
                      </Grid>
                      <Grid item xs={1.5} sx={{ textAlign: "left" }}>
                        <BodyText color="text.grey" preventTransition>
                          Encaissement
                        </BodyText>
                      </Grid>

                      {payments.map((payment, key) => (
                        <>
                          <Grid item xs={1} sx={{ textAlign: "left" }}>
                            <BodyText>{formatPrice(payment.amount)}€</BodyText>
                          </Grid>
                          <Grid item xs={1} sx={{ textAlign: "left" }}>
                            <BodyText>{getFees(payment.fees)}€</BodyText>
                          </Grid>
                          <Grid item xs={3} sx={{ textAlign: "left" }}>
                            <Box
                              component="a"
                              target="_blank"
                              className="cool-button"
                              href={`/dashboard/orders/${payment.order.id}/edit`}
                            >
                              <BodyText color="secondary">
                                {payment.order.label}
                              </BodyText>
                            </Box>
                          </Grid>
                          <Grid item xs={2} sx={{ textAlign: "left" }}>
                            <BodyText>
                              {payment.order.client_firstname}{" "}
                              {payment.order.client_lastname}
                            </BodyText>
                          </Grid>
                          <Grid item xs={2} sx={{ textAlign: "left" }}>
                            <BodyText textTransform="capitalize">
                              {getTypeInfo(payment.type, payment.metadata)}
                            </BodyText>
                          </Grid>
                          <Grid item xs={1.5} sx={{ textAlign: "left" }}>
                            <Box
                              component="a"
                              target="_blank"
                              className="cool-button"
                              href={`${defaultConfig.ftpPublicBasePath}${payment.path}`}
                            >
                              <BodyText>{payment.invoice_number}</BodyText>
                            </Box>
                          </Grid>
                          <Grid item xs={1.5} sx={{ textAlign: "left" }}>
                            <BodyText>
                              {convertDateToShortString(payment.last_update)}
                            </BodyText>
                          </Grid>
                        </>
                      ))}
                    </Grid>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
          </CustomTabPanel>
        ))}
      </Stack>
    </CustomCard>
  )
}
