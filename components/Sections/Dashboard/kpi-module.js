import { Box, Grid, Stack, Typography } from "@mui/material"
import CustomCard from "../../Cards/custom-card"
import BodyText from "../../Text/body-text"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../contexts/UserContext"
import apiCall from "../../../services/apiCalls/apiCall"
import { buildPublicURL, formatPrice } from "../../../services/utils"
import { convertDateToShortString } from "../../../services/date-time"
import { defaultConfig } from "../../../config/defaultConfig"
import CustomAccordion from "../../Containers/custom-accordion"
import CustomTabs, { CustomTab } from "../../Navigation/Tabs/cutom-tabs"
import PillButton from "../../Buttons/pill-button"
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"
import DownloadIcon from "@mui/icons-material/Download"
import { AppContext } from "../../../contexts/AppContext"

const MONTHS = [
  "Année entière",
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

export default function StatsModule({}) {
  return (
    <Stack gap={1}>
      <WelcomeCard />
      <KpiModule />
      <TurnoverModule />
    </Stack>
  )
}

function KpiModule({}) {
  const initialKpi = {
    this_week: {
      prospects: 0,
      orders: 0,
      delivered: 0,
    },
    this_month: {
      prospects: 0,
      orders: 0,
      delivered: 0,
    },
    this_year: {
      prospects: 0,
      orders: 0,
      delivered: 0,
    },
  }
  const [kpi, setKpi] = useState(initialKpi)
  useEffect(() => {
    fetchKpi()
  }, [])

  return (
    <CustomCard
      backgroundColor={(theme) => theme.palette.background.main}
      padding="1rem"
      marginBottom="0"
      borderRadius="15px"
    >
      <Stack
        flexDirection="row"
        gap={2}
        sx={{
          scrollSnapType: "x mandatory",
          overflowX: "auto",
          scrollBehavior: "smooth",
        }}
      >
        <RenderKpi title="Cette semaine" data={kpi.this_week} />
        <RenderKpi title="Ce mois-ci" data={kpi.this_month} />
        <RenderKpi title="Cette année" data={kpi.this_year} />
      </Stack>
    </CustomCard>
  )

  async function fetchKpi() {
    const res = await apiCall.dashboard.kpi.get()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setKpi(jsonRes)
    }
  }
}
function TurnoverModule({}) {
  const { setSnackMessage, setSnackSeverity } = useContext(AppContext)
  const businessActivityStart = 2023
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()
  // Populate YEARS array
  const YEARS = []
  for (let i = currentYear; i >= businessActivityStart; i -= 1) {
    YEARS.push(i)
  }
  const initialTurnover = { total: 0, real: 0, total_fees: 0 }
  const initialPayments = []
  const initialPdf = { path: null }
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [pdf, setPdf] = useState(initialPdf)
  const [turnover, setTurnover] = useState(initialTurnover)
  const [payments, setPayments] = useState(initialPayments)
  const [selectedMonth, setSelectedMonth] = useState(currentMonth + 1)
  const [activeYear, setActiveYear] = useState(0)
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const [totals, setTotals] = useState({ vat: 0 })

  useEffect(() => {
    const localTotals = { vat: 0 }
    payments.map((p) => {
      localTotals.vat += p.totals?.vat || 0
    })
    setTotals(localTotals)
  }, [payments])
  useEffect(() => {
    setTurnover(initialTurnover)
    setPayments(initialPayments)
    fetchData({})
  }, [selectedMonth])
  useEffect(() => {
    setTurnover(initialTurnover)
    setPayments(initialPayments)
    /******** Specific condition bloc because my company was not created ********/
    // Default select first available month on new selected year
    if (selectedMonth === 0) setSelectedMonth(0)
    // Do nothing if month === 0 (it means we want to compare whole years)
    else if (selectedYear === 2023) setSelectedMonth(6)
    // All years have all months except 2023 (starts at June)
    else setSelectedMonth(currentMonth + 1) // All years (except 2023) start at January
    /****************************************************************************/
    fetchData({
      month: selectedMonth === 0 ? 0 : currentMonth + 1,
    })
  }, [selectedYear])

  const handleGenerateReport = async () => {
    setIsGeneratingPdf(true)
    const res = await apiCall.dashboard.payments.downloadMonthReport({
      year: selectedYear,
      month: selectedMonth,
    })
    if (res && res.ok) {
      setSnackMessage(
        "Votre livre de recettes va être généré au format PDF dans quelques instants...",
      )
      setSnackSeverity("info")
    } else {
      setSnackMessage("Une erreur est survenue...")
      setSnackSeverity("error")
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isGeneratingPdf) fetchData({})
    }, 1000 * 5) // in milliseconds

    return () => clearInterval(intervalId)
  }, [isGeneratingPdf])

  useEffect(() => {
    if (!!pdf?.path) {
      setIsGeneratingPdf(false)
      setSnackMessage("Génération terminée !")
      setSnackSeverity("success")
    }
  }, [pdf?.path])

  return (
    <CustomCard
      borderRadius="15px"
      backgroundColor={(theme) => theme.palette.background.main}
      background="transparent"
      padding="1rem"
      gap={0.5}
      marginBottom={0}
    >
      <Stack
        sx={{
          background: "rgb(0,0,0,0.5)",
          borderRadius: "7.5px",
          padding: ".5rem 1rem",
        }}
        width="100%"
      >
        <Box width="100%" display="flex" justifyContent="center">
          <CustomTabs value={activeYear} onChange={handleChangeYear}>
            {YEARS.map((year, key) => {
              return <CustomTab label={year} key={key} />
            })}
          </CustomTabs>
        </Box>

        <Box width="100%" display="flex" justifyContent="center">
          <CustomTabs value={selectedMonth} onChange={handleChangeMonth}>
            {MONTHS.map((month, key) => (
              <CustomTab
                label={month}
                key={key}
                disabled={
                  (key !== 0 && selectedYear === 2023 && key < 6) || // Condition to not display months before my company was created
                  (selectedYear === currentYear &&
                    key > new Date().getMonth() + 1)
                }
              />
            ))}
          </CustomTabs>
        </Box>
      </Stack>

      {MONTHS.map((month, index) => (
        <CustomTabPanel value={selectedMonth} index={index}>
          <Box>
            <CustomAccordion
              defaultExpanded
              title="Chiffres d'affaire"
              noBorder
              background="rgb(0,0,0,0.3)"
              borderRadius="7.5px 7.5px 0 0"
            >
              <Stack gap={0.2} color="#fff">
                <Grid
                  container
                  sx={{
                    background: "rgb(0,0,0,0.2)",
                    borderRadius: "7.5px 7.5px 0 0",
                    padding: 2,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Grid item xs={6} md={8} textAlign="left">
                    <Typography fontSize="1.5rem">CA HT</Typography>
                  </Grid>
                  <Grid item xs={6} md={4} sx={{ textAlign: "right" }}>
                    <Typography
                      color="secondary"
                      fontSize="1.5rem"
                      whiteSpace="nowrap"
                    >
                      {formatPrice(Number(turnover.total) - totals.vat)} €
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={8} textAlign="left">
                    <Typography color="grey" fontSize="1.5rem">
                      TVA
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={4} sx={{ textAlign: "right" }}>
                    <Typography
                      fontSize="1.5rem"
                      whiteSpace="nowrap"
                      color="grey"
                    >
                      {formatPrice(totals.vat)} €
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  container
                  sx={{
                    background: "rgb(0,0,0,0.5)",
                    borderRadius: "0 0 7.5px 7.5px",
                    padding: 2,
                  }}
                >
                  <Grid item xs={8} sx={{ textAlign: "left" }}>
                    <Typography>Total TTC facturé</Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ textAlign: "right" }}>
                    <Typography fontStyle="italic">
                      + {formatPrice(Number(turnover.total))} €
                    </Typography>
                  </Grid>
                  <Grid item xs={8} sx={{ textAlign: "left" }}>
                    <Typography color="grey">Dont TVA</Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ textAlign: "right" }}>
                    <Typography color="error.main" fontStyle="italic">
                      - {formatPrice(Number(totals.vat))} €
                    </Typography>
                  </Grid>
                  <Grid item xs={8} sx={{ textAlign: "left" }}>
                    <Typography color="grey">
                      Frais de service Stripe
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ textAlign: "right" }}>
                    <Typography color="error.main" fontStyle="italic">
                      - {formatPrice(Number(turnover.total_fees))} €
                    </Typography>
                  </Grid>

                  <Grid item xs={6} md={8} textAlign="left">
                    <Typography color="grey">Cotisations et impôts</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    md={4}
                    sx={{ textAlign: "right" }}
                    display="flex"
                    alignItems="center"
                    justifyContent="end"
                  >
                    <Typography color="error.main" whiteSpace="nowrap">
                      ~{" "}
                      {formatPrice((Number(turnover.real) - totals.vat) * 0.3)}{" "}
                      €
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Box
                      sx={{
                        borderBottom: "1px solid rgb(256,256,256,0.15)",
                        marginTop: 2,
                        marginBottom: 1,
                      }}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    md={8}
                    textAlign="left"
                    display="flex"
                    alignItems="center"
                  >
                    <Typography color="green">Estimation du revenu</Typography>
                  </Grid>
                  <Grid item xs={6} md={4} sx={{ textAlign: "right" }}>
                    <Typography
                      color="green"
                      fontSize="1.5rem"
                      whiteSpace="nowrap"
                    >
                      ~{" "}
                      {formatPrice((Number(turnover.real) - totals.vat) * 0.7)}{" "}
                      €
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            </CustomAccordion>

            <CustomAccordion
              defaultExpanded
              title="Livre de recettes"
              noBorder
              background="rgb(0,0,0,0.3)"
              borderRadius="0 0 7.5px 7.5px"
            >
              <Box overflow="auto" mb={2}>
                <Grid
                  id="report"
                  container
                  minWidth="1000px"
                  width="100%"
                  sx={{
                    borderRadius: "7.5px 7.5px 0 0",
                    background: "rgb(0,0,0,0.5)",
                    padding: ".5rem 1rem",
                  }}
                >
                  <GridHeadItem size={1} label="Montant" />
                  <GridHeadItem size={1} label="HT" />
                  <GridHeadItem size={1} label="TVA" />
                  <GridHeadItem size={1} label="Frais" />
                  <GridHeadItem size={2} label="Commande" />
                  <GridHeadItem size={1.5} label="Client" />
                  <GridHeadItem
                    size={1.5}
                    label="Mode de paiement"
                    align="right"
                  />
                  <GridHeadItem size={1.5} label="Facture" align="right" />
                  <GridHeadItem size={1.5} label="Encaissement" align="right" />
                </Grid>

                {payments.map((payment, key) => (
                  <Grid
                    key={key}
                    id={`report-line-${key}`}
                    container
                    minWidth="1000px"
                    width="100%"
                    sx={{
                      borderRadius:
                        key === payments.length ? "0 0 7.5px 7.5px" : "0",
                      background:
                        key % 2 === 0 ? "rgb(0,0,0,0.15)" : "rgb(0,0,0,0.3.5)",
                      padding: "0 1rem",
                    }}
                  >
                    <GridItem size={1}>{formatPrice(payment.amount)}€</GridItem>
                    <GridItem size={1} color="secondary">
                      {formatPrice(payment.amount - payment.totals?.vat || 0)}€
                    </GridItem>
                    <GridItem size={1} color="grey">
                      {formatPrice(payment.totals.vat)}€
                    </GridItem>
                    <GridItem size={1} color="grey">
                      {formatPrice(payment.fees)}€
                    </GridItem>
                    <GridItem
                      size={2}
                      href={`/dashboard/orders/${payment.order.id}/edit`}
                      orderLabel
                    >
                      {payment.order.label}
                    </GridItem>
                    <GridItem size={1.5} client>
                      {payment.order.client_firstname +
                        " " +
                        payment.order.client_lastname}
                    </GridItem>
                    <GridItem size={1.5} align="right">
                      {payment.type}
                    </GridItem>
                    <GridItem
                      size={1.5}
                      href={`${defaultConfig.ftpPublicBasePath}${payment.file_path}`}
                      align="right"
                    >
                      {payment.invoice_number}
                    </GridItem>
                    <GridItem size={1.5} align="right">
                      {convertDateToShortString(payment.last_update)}
                    </GridItem>
                  </Grid>
                ))}
              </Box>

              <CustomCard borderRadius="15px">
                {!!pdf.path ? (
                  <Box
                    component="a"
                    href={`${buildPublicURL(pdf.path)}`}
                    target="_blank"
                  >
                    <PillButton preventTransition startIcon={<DownloadIcon />}>
                      Livre de recettes de {MONTHS[selectedMonth]}{" "}
                      {selectedYear}
                    </PillButton>
                  </Box>
                ) : (
                  <PillButton
                    preventTransition
                    onClick={handleGenerateReport}
                    startIcon={<PictureAsPdfIcon />}
                    disabled={isGeneratingPdf}
                  >
                    {isGeneratingPdf
                      ? "Veuillez patienter..."
                      : "Générer le PDF"}
                  </PillButton>
                )}
              </CustomCard>
            </CustomAccordion>
          </Box>
        </CustomTabPanel>
      ))}
    </CustomCard>
  )

  function handleChangeYear(e, newValue) {
    setSelectedYear(YEARS[newValue])
    return setActiveYear(newValue)
  }
  function handleChangeMonth(e, newValue) {
    return setSelectedMonth(newValue)
  }
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
        {value === index && (
          <Box
            sx={{
              width: "100%",
              gap: 0.5,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {children}
          </Box>
        )}
      </Box>
    )
  }
  async function fetchData({ month }) {
    const res = await apiCall.dashboard.payments.getPerMonth({
      month: month || selectedMonth,
      year: selectedYear,
    })
    if (res && res.ok) {
      const jsonRes = await res.json()
      setPayments(jsonRes.payments)
      setTurnover(jsonRes.turnover)
      setPdf(jsonRes.file)
    }
  }
}
function Label(props) {
  return (
    <Grid item xs={8}>
      <Stack>
        <BodyText color="grey" {...props} />
      </Stack>
    </Grid>
  )
}
function Value(props) {
  return (
    <Grid item xs={4}>
      <Stack>
        <BodyText textAlign="right" {...props} />
      </Stack>
    </Grid>
  )
}
function RenderKpi({ data, title }) {
  return (
    <Card title={title}>
      <Grid container spacing={0}>
        <Label>Prospects</Label>
        <Value>{data.prospects}</Value>
        <Label>Commandes en cours</Label>
        <Value>{data.orders}</Value>
        <Label>Projets livrés</Label>
        <Value>{data.delivered}</Value>
        {/* <Label>C.A.</Label>
    <Value>{data.turnover / 100}€</Value> */}
      </Grid>
    </Card>
  )
}
function Card({ title, ...props }) {
  return (
    <Stack
      padding={2}
      width="100%"
      minWidth="250px"
      sx={{
        background: "rgb(0,0,0,0.3)",
        borderRadius: "7.5px",
        gap: 2,
        scrollSnapAlign: "center",
      }}
    >
      <BodyText textAlign="center">{title}</BodyText>
      <Stack {...props} />
    </Stack>
  )
}
function WelcomeCard({}) {
  const { user } = useContext(UserContext)
  return (
    <CustomCard
      borderRadius="15px"
      backgroundColor={(theme) => theme.palette.background.main}
      background={"transparent"}
      padding="1rem"
      marginBottom="0"
      className="flex-center"
      gap={2}
    >
      <BodyText
        className="inline-flex gap-10"
        alignItems="center"
        fontSize="1.5rem"
        textAlign="center"
      >
        Content de vous revoir {user.firstname} ! 🎉
      </BodyText>
    </CustomCard>
  )
}
function GridHeadItem({ size, align, label }) {
  return (
    <Grid item xs={size} sx={{ textAlign: align || "left" }} padding={1}>
      <Typography color="text.grey">{label}</Typography>
    </Grid>
  )
}
function GridItem({ size, align, href, orderLabel, client, ...props }) {
  return (
    <Grid
      item
      xs={size}
      sx={{
        textAlign: align || "left",
      }}
    >
      <Box
        component={href ? "a" : "div"}
        href={href || "#"}
        className={href ? "cool-button" : ""}
        target={href ? "_blank" : null}
        padding={1}
      >
        <Typography color={href ? "secondary" : "text.white"} {...props} />
      </Box>
    </Grid>
  )
}
