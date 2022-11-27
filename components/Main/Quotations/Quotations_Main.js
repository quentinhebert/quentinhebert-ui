import { Stack, Tooltip } from "@mui/material"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../contexts/UserContext"
import { QUOTATION_STATUS } from "../../../enums/quotationStatus"
import apiCall from "../../../services/apiCalls/apiCall"
import { formatDayDate } from "../../../services/date-time"
import PillButton from "../../Buttons/pill-button"
import PleaseWait from "../../Helpers/please-wait"
import BodyText from "../../Text/body-text"
import SmallTitle from "../../Titles/small-title"
import AddIcon from "@mui/icons-material/Add"
import { useRouter } from "next/router"
import DeleteIcon from "@mui/icons-material/Delete"
import withConfirmAction from "../../hocs/withConfirmAction"
import { AppContext } from "../../../contexts/AppContext"

const Status = ({ status }) => (
  <BodyText fontStyle="italic" marginLeft=".5rem">
    ({QUOTATION_STATUS[status].label})
  </BodyText>
)

const QuotationCard = withConfirmAction(function ({
  quotation,
  timezone,
  setActionToFire,
  setOpenConfirmModal,
  setConfirmTitle,
  setConfirmContent,
  setNextButtonText,
  refreshData,
}) {
  const { setSnackMessage, setSnackSeverity } = useContext(AppContext)
  const handleSuccess = () => {
    setSnackMessage("Devis supprimé")
    setSnackSeverity("success")
    refreshData()
  }
  const handleError = () => {
    setSnackMessage("Un problème est survenu")
    setSnackSeverity("error")
  }
  const deleteQuotation = async () => {
    const res = await apiCall.quotations.delete({ id: quotation.id })
    if (res && res.ok) return handleSuccess()
    return handleError()
  }
  const handleDelete = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setActionToFire(() => () => deleteQuotation())
    setOpenConfirmModal(true)
    setNextButtonText("Supprimer")
    setConfirmTitle("Supprimer le devis")
    setConfirmContent({
      text: `Voulez vous vraiment supprimer le devis ${quotation.label} ?`,
    })
  }
  return (
    <Stack
      sx={{
        background: (theme) => theme.palette.background.main,
        borderColor: (theme) => theme.palette.background.main,
        border: "1px solid",
        padding: 2,
        borderRadius: "10px",
        cursor: "pointer",
        "&:hover": {
          borderColor: (theme) => theme.palette.background.secondary,
        },
      }}
    >
      <Stack className="row" alignItems="center" gap={2}>
        <SmallTitle textTransform="initial">
          {quotation.label || "Sans nom"}
          <Status status={quotation.status} />
        </SmallTitle>
        <Stack flexGrow={1} />
        <BodyText>
          {formatDayDate({
            timestamp: quotation.last_update,
            timezone: timezone,
          })}
        </BodyText>
        <Stack
          onClick={handleDelete}
          sx={{
            color: (theme) => theme.palette.text.secondary,
            "&:hover": {
              filter: "opacity(0.5)",
            },
          }}
        >
          <Tooltip title="Supprimer le devis">
            <DeleteIcon />
          </Tooltip>
        </Stack>
      </Stack>
    </Stack>
  )
})

export default function Quotations_Main({}) {
  /******* USE-STATES *******/
  const [quotations, setQuotations] = useState([])
  const [loading, setLoading] = useState(false)

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
      <Stack width="100%" alignItems="end">
        <PillButton startIcon={<AddIcon />} onClick={handleNewQuotation}>
          Nouveau devis
        </PillButton>
      </Stack>
      {quotations.map((quotation, key) => (
        <Link
          key={key}
          href={`/dashboard/quotations/${quotation.id}/edit`}
          passHref
        >
          <a>
            <QuotationCard
              quotation={quotation}
              timezone={user.timezone}
              refreshData={fetchQuotations}
            />
          </a>
        </Link>
      ))}
    </Stack>
  )
}
