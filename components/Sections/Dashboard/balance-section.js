import { Grid, Stack } from "@mui/material"
import CustomCard from "../../Cards/custom-card"
import BodyText from "../../Text/body-text"
import EuroIcon from "@mui/icons-material/Euro"
import EastIcon from "@mui/icons-material/East"
import { useEffect, useState } from "react"
import PillButton from "../../Buttons/pill-button"
import apiCall from "../../../services/apiCalls/apiCall"
import { formatPrice } from "../../../services/utils"

export default function BalanceSection({}) {
  const [balance, setBalance] = useState(null)
  const [lastPayout, setLastPayout] = useState(null)

  const fetchBalance = async () => {
    const res = await apiCall.dashboard.balance.get()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setBalance(jsonRes)
    } else alert("error")
  }
  const fetchLastPayout = async () => {
    const res = await apiCall.dashboard.payouts.getLast()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setLastPayout(jsonRes)
    } else alert("error")
  }

  const initiatePayout = async () => {
    const res = await apiCall.dashboard.payouts.initiate()
    if (res && res.ok) alert("Succès")
    else alert("error")
  }

  useEffect(() => {
    fetchBalance()
    fetchLastPayout()
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
        }}
      >
        <BodyText
          preventTransition
          className="inline-flex gap-10"
          alignItems="center"
          fontSize="1.5rem"
          lineHeight="2rem"
          textAlign="center"
        >
          <EuroIcon /> Mon solde
        </BodyText>

        <Stack
          maxWidth="300px"
          width="100%"
          bgcolor="rgb(0,0,0,0.5)"
          padding="1rem 1.5rem"
          borderRadius="15px"
        >
          <Grid container spacing={2}>
            <Grid item xs={8} display="flex" alignItems="start">
              <BodyText color="grey">Solde disponible</BodyText>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="end">
              <BodyText textAlign="right">
                {formatPrice(balance?.available[0].amount || 0)} €
              </BodyText>
            </Grid>
            <Grid item xs={8} display="flex" alignItems="start">
              <BodyText color="grey">Estimation des virements à venir</BodyText>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="end">
              <BodyText textAlign="right">
                {formatPrice(balance?.pending[0].amount || 0)} €
              </BodyText>
            </Grid>
            <Grid item xs={8} display="flex" alignItems="start">
              <BodyText color="grey">
                Dernier virement vers votre compte (status: {lastPayout?.status}
                )
              </BodyText>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="end">
              <BodyText textAlign="right">
                {formatPrice(lastPayout?.amount || 0)} €
              </BodyText>
            </Grid>
          </Grid>
        </Stack>

        <Stack maxWidth="300px" width="100%">
          <PillButton
            disabled={balance?.available[0].amount <= 0}
            onClick={initiatePayout}
            endIcon={<EastIcon />}
          >
            Virer l'argent
          </PillButton>
        </Stack>
      </Stack>
    </CustomCard>
  )
}
