import { Box, Grid, IconButton, Stack, Tooltip } from "@mui/material"
import { useContext } from "react"
import AddIcon from "@mui/icons-material/Add"
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined"
import { useRouter } from "next/router"

import PillButton from "../../../Buttons/pill-button"
import PleaseWait from "../../../Helpers/please-wait"
import BodyText from "../../../Text/body-text"
import { Context, STATUS_OPTIONS } from "./module"
import StatusTabs from "./components/status-tabs"
import OrderCard from "./components/order-card"

export default function OrdersSection() {
  const { state } = useContext(Context)

  const filteredOrders = populateFilteredOrders()

  return (
    <Stack
      sx={{
        position: "relative",
        borderRadius: "30px",
        gap: 4,
        padding: { xs: "2rem 1rem", md: "2rem" },
        background: (theme) => theme.palette.background.main,
      }}
    >
      <Title />
      <NewOrderBtn />
      <StatusTabs />

      {state.isFetching && <PleaseWait />}

      <Grid container spacing={1}>
        {filteredOrders.map((order, key) => (
          <Grid key={key} item xs={12} lg={6} xl={4}>
            <OrderCard order={order} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  )

  function populateFilteredOrders() {
    switch (STATUS_OPTIONS[state.tab].id) {
      case "ALL":
        return state.orders || []
      case "FINISHED":
        return !!state.orders
          ? state.orders.filter(
              (elt) => !!elt.delivered_date && elt.status !== "ARCHIVED"
            )
          : []
      case "ARCHIVED":
        return !!state.orders
          ? state.orders.filter((elt) => elt.status === "ARCHIVED")
          : []
      default:
        return !!state.orders
          ? state.orders.filter(
              (elt) =>
                !elt.delivered_date &&
                STATUS_OPTIONS.filter(
                  (opt) => opt.id === STATUS_OPTIONS[state.tab].id
                )[0].statuses.includes(elt.status)
            )
          : []
    }
  }
}

function NewOrderBtn() {
  const router = useRouter()
  const handleNew = () => router.push("/dashboard/orders/create")
  return (
    <Box sx={{ position: "absolute", right: 30, top: 30 }}>
      <Tooltip title="Nouvelle commande">
        <IconButton
          onClick={handleNew}
          sx={{
            aspectRatio: 1,
            display: { xs: "block", md: "none" },
            background: (theme) => theme.palette.secondary.main,
            color: (theme) => theme.palette.background.main,
            "&:hover": { color: (theme) => theme.palette.secondary.main },
          }}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>

      <PillButton
        startIcon={<AddIcon />}
        onClick={handleNew}
        display={{ xs: "none", md: "flex" }}
      >
        Créer
      </PillButton>
    </Box>
  )
}
function Title() {
  return (
    <BodyText
      className="inline-flex gap-10"
      alignItems="center"
      fontSize="1.5rem"
      lineHeight="2rem"
      textAlign="center"
      preventTransition
    >
      <WorkOutlineOutlinedIcon sx={{ fontSize: "2rem" }} /> Commandes
    </BodyText>
  )
}
