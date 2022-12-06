import { Grid, Stack } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../contexts/UserContext"
import apiCall from "../../../services/apiCalls/apiCall"
import PillButton from "../../Buttons/pill-button"
import PleaseWait from "../../Helpers/please-wait"
import BodyText from "../../Text/body-text"
import AddIcon from "@mui/icons-material/Add"
import { useRouter } from "next/router"
import QuotationCard from "../../Cards/quotations/quotation-card"
import ModesToggle from "../../Navigation/modes-toggle"
import { MODES_ENUM } from "../../../enums/modesEnum"

export default function Quotations_Main({}) {
  /******* USE-STATES *******/
  const [quotations, setQuotations] = useState([])
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState(MODES_ENUM.LIST)

  const router = useRouter()
  const { user } = useContext(UserContext)

  /******* FETCH DATA *******/
  const fetchQuotations = async () => {
    setLoading(true)
    const res = await apiCall.quotations.getAll()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setQuotations(jsonRes)
    }
    setLoading(false)
  }

  /******* INITIAL FETCH *******/
  useEffect(() => {
    fetchQuotations()
  }, [])

  const handleNewQuotation = () => router.push("/dashboard/quotations/create")

  if (loading) return <PleaseWait />

  return (
    <Stack gap={2}>
      <BodyText>Vous trouverez ci-dessous tous vos devis.</BodyText>
      <Stack className="row" alignItems="center" width="100%">
        <ModesToggle mode={mode} setMode={setMode} />
        <PillButton startIcon={<AddIcon />} onClick={handleNewQuotation}>
          Nouveau devis
        </PillButton>
      </Stack>

      <Grid container spacing={2}>
        {quotations.map((quotation, key) => (
          <Grid
            key={key}
            item
            xs={12}
            sm={mode === MODES_ENUM.LIST ? 12 : 6}
            md={mode === MODES_ENUM.LIST ? 12 : 4}
          >
            <QuotationCard
              quotation={quotation}
              timezone={user.timezone}
              refreshData={fetchQuotations}
              mode={mode}
              onClick={() =>
                router.push(`/dashboard/quotations/${quotation.id}/edit`)
              }
              optionsList={["delete"]}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}
