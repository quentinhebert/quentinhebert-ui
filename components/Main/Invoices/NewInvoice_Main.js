import { Stack } from "@mui/system"
import PillButton from "../../Buttons/pill-button"
import BodyText from "../../Text/body-text"
import DescriptionIcon from "@mui/icons-material/Description"
import { Icon } from "react-icons-kit"
import { ic_insert_drive_file_outline, ic_file_copy } from "react-icons-kit/md"
import apiCall from "../../../services/apiCalls/apiCall"
import { useContext, useEffect, useState } from "react"
import WestIcon from "@mui/icons-material/West"
import PleaseWait from "../../Helpers/please-wait"
import { Avatar, Box, Grid } from "@mui/material"
import {
  convertDateToLongString,
  formatDayDate,
} from "../../../services/date-time"
import CustomCard from "../../Cards/custom-card"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import { UserContext } from "../../../contexts/UserContext"
import { buildPublicURL } from "../../../services/utils"
import Link from "next/link"
import UpdateIcon from "@mui/icons-material/Update"
import EuroSymbolIcon from "@mui/icons-material/EuroSymbol"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"

const Root = (props) => (
  <Stack gap={4} className="flex-center" minHeight="300px" {...props} />
)

export default function NewInvoice_Main({}) {
  const { user } = useContext(UserContext)

  const [quotations, setQuotations] = useState([])
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)

  const fetchQuotations = async () => {
    if (step !== 1) return
    setLoading(true)
    const res = await apiCall.quotations.getAll()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setQuotations(jsonRes)
    }
    setLoading(false)
  }

  const handleNext = () => setStep(step + 1)
  const handlePrevious = () => setStep(step - 1)

  useEffect(() => {
    fetchQuotations()
  }, [step])

  if (step === 0)
    return (
      <Root>
        <BodyText
          className="inline-flex gap-10"
          alignItems="center"
          fontSize="1.5rem"
        >
          Créer une facture...
        </BodyText>
        <Stack
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 4 },
          }}
        >
          <PillButton
            onClick={() => router.push("/dashboard/quotations/create")}
          >
            <Icon
              icon={ic_insert_drive_file_outline}
              size={25}
              style={{ marginRight: ".5rem" }}
            />
            Depuis zéro
          </PillButton>
          <PillButton onClick={handleNext}>
            <Icon
              icon={ic_file_copy}
              size={25}
              style={{ marginRight: ".5rem" }}
            />
            À partir d'un devis
          </PillButton>
        </Stack>
      </Root>
    )

  if (step === 1)
    return (
      <Root>
        <BodyText
          className="inline-flex gap-10"
          alignItems="center"
          fontSize="1.5rem"
          lineHeight="1.75rem"
          textAlign="center"
        >
          Sélectionnez le devis sur lequel se basera la nouvelle facture...
        </BodyText>

        {loading && (
          <Stack className="full-width flex-center">
            <PleaseWait />
          </Stack>
        )}

        <Grid container spacing={2}>
          {quotations.map((quotation, key) => {
            let totalPrice = 0
            quotation.items?.length &&
              quotation.items.map((item) => {
                totalPrice +=
                  ((item.quantity * item.no_vat_price) / 100) *
                  (1 + item.vat / 100)
              })
            return (
              <Grid item key={key} xs={12} sm={6} md={4} lg={3}>
                <CustomCard gap={2}>
                  <BodyText>{quotation.label}</BodyText>

                  <BodyText
                    sx={{ color: (theme) => theme.palette.text.secondary }}
                  >
                    {totalPrice} €
                  </BodyText>

                  <Stack gap={1}>
                    <BodyText
                      fontSize="0.8rem"
                      alignItems="center"
                      display="flex"
                      gap={1}
                    >
                      <CalendarTodayIcon />{" "}
                      {convertDateToLongString(quotation.date)}
                    </BodyText>

                    {!!quotation.client && (
                      <Stack className="row" alignItems="center" gap={1}>
                        {!!quotation.client?.avatar_path ? (
                          <Avatar
                            sx={{ width: 24, height: 24 }}
                            alt={quotation.client.firstname}
                            src={buildPublicURL(quotation.client.avatar_path)}
                          />
                        ) : (
                          <Avatar sx={{ width: 24, height: 24 }}>
                            {quotation.client?.firstname?.length &&
                              quotation.client?.firstname[0]}
                          </Avatar>
                        )}
                        <BodyText fontSize="0.8rem">
                          {quotation.client?.firstname}{" "}
                          {quotation.client?.lastname || ""}
                        </BodyText>
                      </Stack>
                    )}
                  </Stack>

                  <Stack flexGrow={1} />

                  <Stack
                    className="full-width flex-center"
                    sx={{
                      gap: 2,
                      flexDirection: { xs: "column-reverse", md: "row" },
                    }}
                  >
                    <Link
                      href={`/dashboard/quotations/${quotation.id}/edit`}
                      passHref
                    >
                      <Box
                        target="_blank"
                        component="a"
                        className="cool-button"
                      >
                        <BodyText
                          display="flex"
                          alignItems="center"
                          gap={0.5}
                          color={(theme) => theme.palette.text.secondary}
                          fontSize="1rem"
                        >
                          Voir
                          <OpenInNewIcon sx={{ fontSize: "1rem" }} />
                        </BodyText>
                      </Box>
                    </Link>
                    <PillButton fontSize="0.8rem" padding="0.5rem 1rem">
                      Sélectionner
                    </PillButton>
                  </Stack>
                </CustomCard>
              </Grid>
            )
          })}
        </Grid>

        <PillButton startIcon={<WestIcon />} onClick={handlePrevious}>
          Retour
        </PillButton>
      </Root>
    )
  else return <></>
}
