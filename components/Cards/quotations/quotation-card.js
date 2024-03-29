import { Avatar, Box, Stack, Typography } from "@mui/material"
import { useContext } from "react"
import { QUOTATION_STATUS } from "../../../enums/quotationStatus"
import apiCall from "../../../services/apiCalls/apiCall"
import { formatDayDate } from "../../../services/date-time"
import BodyText from "../../Text/body-text"
import SmallTitle from "../../Titles/small-title"
import DeleteIcon from "@mui/icons-material/Delete"
import withConfirmAction from "../../hocs/withConfirmAction"
import { AppContext } from "../../../contexts/AppContext"
import CustomCard from "../../Cards/custom-card"
import { buildPublicURL } from "../../../services/utils"
import DropdownOptions from "../../Dropdown/dropdown-options"
import Pill from "../../Text/pill"
import VisibilityIcon from "@mui/icons-material/Visibility"

const MODES = { LIST: "list", GRID: "grid" }

const Status = ({ status }) => {
  let severity = "disabled"
  if (status === QUOTATION_STATUS.REFUSED.id) severity = "error"
  if (status === QUOTATION_STATUS.ACCEPTED.id) severity = "success"
  if (status === QUOTATION_STATUS.SENT.id) severity = "info"

  return (
    <Stack display="inline-flex" component="span" marginRight="0.75rem">
      <Pill
        margin="0rem"
        padding="0 0.75rem"
        preventTransition
        bgColor={(theme) => theme.alert.title[severity].background}
        border="1px solid"
        borderColor={(theme) => theme.alert.title[severity].color}
      >
        <BodyText
          fontSize="0.8rem"
          color={(theme) => theme.alert.title[severity].color}
          preventTransition
        >
          {QUOTATION_STATUS[status].label}
        </BodyText>
      </Pill>
    </Stack>
  )
}

function QuotationCard({
  optionsList,
  mode,
  quotation,
  timezone,
  setActionToFire,
  setOpenConfirmModal,
  setConfirmTitle,
  setConfirmContent,
  setNextButtonText,
  refreshData,
  onClick,
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
  const handleOpen = () =>
    window.open(`/dashboard/quotations/${quotation.id}/edit`, "_ blank")

  const options = []
  if (optionsList?.includes("delete"))
    options.push({
      label: "Supprimer le devis",
      handleClick: handleDelete,
      icon: <DeleteIcon />,
    })
  if (optionsList?.includes("open"))
    options.push({
      label: "Voir le devis",
      handleClick: handleOpen,
      icon: <VisibilityIcon />,
    })

  return (
    <CustomCard
      background={(theme) => theme.palette.background.main}
      backgroundColor="rgb(0,0,0,0.3)"
      sx={{
        cursor: "pointer",
        position: "relative",
        padding: { xs: "1rem", sm: "1rem 2rem" },
        flexDirection: { xs: "row" },
        alignItems: { xs: "", md: "center" },
        "&:hover": {
          background: "rgb(0,0,0,0.5)",
        },
      }}
    >
      <Stack
        onClick={!!onClick ? onClick : null}
        width="100%"
        height="100%"
        sx={{
          gap: 2,
          alignItems: {
            xs: "start",
            sm: mode === MODES.LIST ? "center" : "start",
          },
          flexDirection: {
            xs: "column",
            sm: mode === MODES.LIST ? "row" : "column",
          },
        }}
      >
        <Stack flexDirection="row" alignItems="center">
          <Status status={quotation.status} />
          <Typography fontSize="1rem" color="#fff">
            {quotation.total_price / 100}€
          </Typography>
        </Stack>

        <SmallTitle
          textTransform="initial"
          textAlign="left"
          letterSpacing={0}
          lineHeight={2}
          padding={mode === MODES.GRID ? { xs: 0, sm: "0 0.5rem 0 0" } : 0}
          display="flex"
          alignItems="center"
          gap={1}
          width="90%"
        >
          <Box
            sx={{
              fontSize: "1rem",
              display: "-webkit-box",
              WebkitLineClamp: mode === MODES.GRID ? 2 : { xs: 2, md: 1 },
              WebkitBoxOrient: "vertical",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {quotation.label || "Sans nom"}
          </Box>
        </SmallTitle>

        <Stack flexGrow={1} />

        <Stack
          className="row"
          gap={2}
          alignItems="center"
          justifyContent="right"
          sx={{
            width: { xs: "100%", sm: mode === MODES.LIST ? "100%" : "100%" },
          }}
        >
          {!!quotation.client && (
            <Stack
              className="row"
              alignItems="center"
              gap={1}
              sx={{
                flexGrow: {
                  xs: 1,
                  sm: mode === MODES.LIST ? 0 : 1,
                },
              }}
            >
              {!!quotation.client?.avatar_path ? (
                <Avatar
                  sx={{ width: 24, height: 24 }}
                  alt={quotation.client.firstname}
                  src={buildPublicURL(quotation.client.avatar_path)}
                />
              ) : quotation.client?.firstname?.length ? (
                <Avatar sx={{ width: 24, height: 24 }}>
                  {quotation.client?.firstname[0]}
                </Avatar>
              ) : null}
              <BodyText fontSize="0.8rem" preventTransition>
                {quotation.client?.firstname} {quotation.client?.lastname || ""}
              </BodyText>
            </Stack>
          )}

          <BodyText preventTransition fontSize="0.8rem">
            {formatDayDate({
              timestamp: quotation.last_update,
              timezone: timezone,
            })}
          </BodyText>
        </Stack>
      </Stack>

      {options.length > 0 && (
        <Stack
          sx={{
            alignItems: "end",
            position: {
              xs: "relative",
              sm: mode === MODES.LIST ? "relative" : "absolute",
            },
            top: {
              xs: 0,
              sm: mode === MODES.LIST ? 0 : 10,
            },
            right: {
              xs: 0,
              sm: mode === MODES.LIST ? 0 : 10,
            },
          }}
        >
          <DropdownOptions options={options} />
        </Stack>
      )}
    </CustomCard>
  )
}

export default withConfirmAction(QuotationCard)
