import { Box, Stack, Tooltip, Typography } from "@mui/material"
import { useContext } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import PersonIcon from "@mui/icons-material/Person"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import UpdateIcon from "@mui/icons-material/Update"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import CancelIcon from "@mui/icons-material/Cancel"
import { useRouter } from "next/router"
import Link from "next/link"
import UndoIcon from "@mui/icons-material/Undo"
import InventoryIcon from "@mui/icons-material/Inventory"

import apiCall from "../../../../../services/apiCalls/apiCall"
import {
  convertDateToShortString,
  convertDateToVeryShortString,
  formatDayDate,
} from "../../../../../services/date-time"
import BodyText from "../../../../Text/body-text"
import withConfirmAction from "../../../../hocs/withConfirmAction"
import { AppContext } from "../../../../../contexts/AppContext"
import CustomCard from "../../../../Cards/custom-card"
import { ORDERSTATES } from "../../../../../enums/orderStates"
import { parseOrderPrice } from "../../../../../services/orders"
import { Context, inProgressStatuses } from "../module"
import DropdownOptions from "../../../../Dropdown/dropdown-options"
import { UserContext } from "../../../../../contexts/UserContext"

function OrderCard({
  order,
  setActionToFire,
  setOpenConfirmModal,
  setConfirmTitle,
  setConfirmContent,
  setNextButtonText,
}) {
  const { fetchOrders } = useContext(Context)
  const { setSnackMessage, setSnackSeverity } = useContext(AppContext)
  const user = useContext(UserContext)
  const router = useRouter()

  const { totalPrice } = parseOrderPrice(order)
  const options = populateOptions()

  return (
    <CustomCard
      onClick={() => router.push(`/dashboard/orders/${order.id}/edit`)}
      background={(theme) => theme.palette.background.main}
      backgroundColor="rgb(0,0,0,0.3)"
      boxShadow="none"
      marginBottom="0"
      sx={{
        cursor: "pointer",
        position: "relative",
        padding: { xs: "1rem", sm: "1rem 2rem" },
        "&:hover": {
          background: "rgb(0,0,0,0.5)",
        },
      }}
    >
      <Stack gap={2} width="100%" alignItems="start" flexDirection="column">
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          gap={4}
        >
          <Status status={order.status} />
          <DropdownOptions
            options={options}
            visible={
              !inProgressStatuses.includes(order.status) ||
              (!!order.delivered_date && order.status === "PAYMENT_SUCCEEDED")
            }
          />
        </Stack>

        <Link
          href={`/dashboard/orders/${order.id}/edit`}
          passHref
          style={{ width: "100%" }}
        >
          <Stack
            width="100%"
            flexDirection="row"
            justifyContent="space-between"
            gap={1}
          >
            <Label label={order.label} />
            <Typography fontSize="2rem" lineHeight={1} color="grey">
              {totalPrice / 100}€
            </Typography>
          </Stack>
        </Link>

        <Stack
          flexDirection="row"
          alignItems="flex-start"
          justifyContent="space-between"
          width="100%"
          borderTop="1px solid rgb(256,256,256, 0.1)"
          pt={2}
        >
          <Stack gap={1} fontSize="0.8rem" color="grey">
            <Client client={order.client} />
            <Date date={convertDateToShortString(order.date)} />
            {!!order.delivered_date && (
              <Date
                date={convertDateToVeryShortString(order.delivered_date)}
                delivery
              />
            )}
          </Stack>
          <Stack gap={1} fontSize="0.8rem">
            <Date
              date={formatDayDate({
                timestamp: order.last_update,
                timezone: user.timezone,
              })}
              lastUpdate
            />
          </Stack>
        </Stack>
      </Stack>
    </CustomCard>
  )

  function populateOptions() {
    const options = []
    if (!order.delivered_date || order.status !== "PAYMENT_SUCCEEDED")
      options.push({
        label: "Supprimer la commande",
        handleClick: handleDelete,
        icon: <DeleteIcon />,
      })
    if (!!order.delivered_date && order.status === "PAYMENT_SUCCEEDED")
      options.push({
        label: "Archiver la commande",
        handleClick: handleArchive,
        icon: <InventoryIcon />,
      })
    if (order.status === "DRAFT")
      options.push({
        label: "Annuler la commande",
        handleClick: handleCancel,
        icon: <CancelIcon />,
      })
    if (order.status === "CANCELED")
      options.push({
        label: "Rétablir la commande",
        handleClick: uncancelOrder,
        icon: <UndoIcon />,
      })
    return options
  }
  function handleSuccess({ tab }) {
    setSnackMessage("Commande supprimées")
    setSnackSeverity("success")
    fetchOrders({ tab })
  }
  function handleError() {
    setSnackMessage("Un problème est survenu")
    setSnackSeverity("error")
  }
  async function cancelOrder() {
    const res = await apiCall.orders.save({
      id: order.id,
      items: order.items,
      status: "CANCELED",
    })
    if (!res?.ok) return handleError()
    handleSuccess({ tab: 4 })
  }
  async function archiveOrder() {
    const res = await apiCall.orders.save({
      id: order.id,
      items: order.items,
      status: "ARCHIVED",
    })
    if (!res?.ok) return handleError()
    handleSuccess({ tab: 5 })
  }
  async function handleArchive(e) {
    e?.preventDefault()
    e?.stopPropagation()
    setActionToFire(() => () => archiveOrder())
    setOpenConfirmModal(true)
    setNextButtonText("Oui, archiver la commande")
    setConfirmTitle("Archiver la commande")
    setConfirmContent({
      text: `Voulez vous vraiment archiver la commande ${
        order.label || "Sans nom"
      } ?`,
    })
  }
  async function uncancelOrder() {
    const res = await apiCall.orders.save({
      id: order.id,
      items: order.items,
      status: "DRAFT",
    })
    if (!res?.ok) return handleError()
    handleSuccess({ tab: 1 })
  }
  async function handleCancel(e) {
    e?.preventDefault()
    e?.stopPropagation()
    setActionToFire(() => () => cancelOrder())
    setOpenConfirmModal(true)
    setNextButtonText("Oui, annuler la commande")
    setConfirmTitle("Annuler la commande")
    setConfirmContent({
      text: `Voulez vous vraiment annuler la commande ${
        order.label || "Sans nom"
      } ?`,
    })
  }
  async function deleteOrder() {
    const res = await apiCall.orders.delete(order)
    if (res && res.ok) return handleSuccess()
    return handleError()
  }
  async function handleDelete(e) {
    e?.preventDefault()
    e?.stopPropagation()
    setActionToFire(() => () => deleteOrder())
    setOpenConfirmModal(true)
    setNextButtonText("Supprimer")
    setConfirmTitle("Supprimer la commande")
    setConfirmContent({
      text: `Voulez vous vraiment supprimer la commande ${
        order.label || "Sans nom"
      } ?`,
    })
  }
}

function Status({ status }) {
  let severity = "disabled"
  severity = ORDERSTATES[status].severity

  return (
    <Box>
      <Stack
        borderRadius={30}
        padding="0 0.75rem"
        border="1px solid"
        borderColor={(theme) => theme.alert.title[severity].color}
        sx={{ background: (theme) => theme.alert.title[severity].background }}
      >
        <BodyText
          fontSize="0.8rem"
          color={(theme) => theme.alert.title[severity].color}
          preventTransition
          sx={{ whiteSpace: "nowrap" }}
        >
          {ORDERSTATES[status].label}
        </BodyText>
      </Stack>
    </Box>
  )
}
function Label({ label }) {
  return (
    <Tooltip title={label || "Sans nom"}>
      <Typography
        color="#fff"
        textAlign="left"
        lineHeight={1.2}
        display="flex"
        alignItems="center"
      >
        <Box
          sx={{
            fontSize: "1.2rem",
            display: "-webkit-box",
            WebkitLineClamp: { xs: 2, md: 1 },
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
            overflow: "hidden",
            wordBreak: "break-word",
          }}
        >
          {label || "Sans nom"}
        </Box>
      </Typography>
    </Tooltip>
  )
}
function Client({ client }) {
  return (
    <BodyText
      fontSize="inherit"
      lineHeight="inherit"
      preventTransition
      display="flex"
      alignItems="center"
      gap={1}
      color="inherit"
    >
      <PersonIcon fontSize="inherit" />
      {!!client.firstname
        ? `${client?.firstname} ${client?.lastname || ""}`
        : "..."}
    </BodyText>
  )
}
function Date({ date, lastUpdate, delivery }) {
  return (
    <BodyText
      fontSize="inherit"
      lineHeight="inherit"
      preventTransition
      display="flex"
      alignItems="center"
      gap={1}
      color={lastUpdate ? "grey" : "inherit"}
    >
      {!!lastUpdate ? (
        <UpdateIcon fontSize="inherit" />
      ) : delivery ? (
        <LocalShippingIcon fontSize="inherit" />
      ) : (
        <CalendarTodayIcon fontSize="inherit" />
      )}
      {date || "..."}
    </BodyText>
  )
}
export default withConfirmAction(OrderCard)
