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
import TaskIcon from "@mui/icons-material/Task"

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

  return (
    <Stack
      gap={4}
      sx={{
        background: (theme) => theme.palette.background.main,
        borderRadius: "30px",
      }}
      padding="2rem"
    >
      <BodyText
        className="inline-flex gap-10"
        alignItems="center"
        fontSize="1.5rem"
        lineHeight="2rem"
        textAlign="center"
        preventTransition
      >
        <TaskIcon sx={{ fontSize: "2rem" }} /> Mes devis
      </BodyText>

      <Stack className="row" alignItems="center" width="100%">
        <ModesToggle mode={mode} setMode={setMode} />
        <PillButton startIcon={<AddIcon />} onClick={handleNewQuotation}>
          Nouveau devis
        </PillButton>
      </Stack>

      {loading ? (
        <PleaseWait />
      ) : (
        <Grid container spacing={1}>
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
      )}
    </Stack>
  )
}
