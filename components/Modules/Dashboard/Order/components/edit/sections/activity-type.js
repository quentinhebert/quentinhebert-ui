import { useContext } from "react"
import { Context } from "../../../module"
import { ACTIVITY_TYPES } from "../../../../../../../enums/activityTypesEnum"
import { Stack, Typography } from "@mui/material"

export default function ActivityType() {
  const { state, setState } = useContext(Context)

  return (
    <Stack
      sx={{
        padding: "2rem 1rem",
        maxWidth: "900px",
        margin: "auto",
        gap: 4,
        alignItems: "center",
      }}
    >
      <Typography variant="h4" color="secondary">
        Quel est le type de prestation ?
      </Typography>
      <Stack className="row" gap={2}>
        <ActivityTypeCard
          label="Vidéo"
          selected={state.order.activity_type === ACTIVITY_TYPES.video}
          onClick={() => handleChangeActivityType(ACTIVITY_TYPES.video)}
        />
        <ActivityTypeCard
          label="Web"
          selected={state.order.activity_type === ACTIVITY_TYPES.web}
          onClick={() => handleChangeActivityType(ACTIVITY_TYPES.web)}
        />
      </Stack>
    </Stack>
  )

  function handleChangeActivityType(activityType) {
    setState({
      ...state,
      order: { ...state.order, activity_type: activityType },
      orderToUpdate: { ...state.orderToUpdate, activity_type: activityType },
    })
  }
}

function ActivityTypeCard({ label, selected, ...props }) {
  return (
    <Stack
      sx={{
        borderRadius: "30px",
        border: selected
          ? (theme) => `2px solid ${theme.palette.secondary.main}`
          : (theme) => `2px solid ${theme.palette.primary.main}`,
        padding: { xs: "1rem 2rem", md: "1rem 3rem" },
        background: selected
          ? (theme) => theme.palette.secondary.main
          : "transparent",
        cursor: "pointer",
      }}
      {...props}
    >
      <Typography
        variant="h4"
        color={selected ? "#000" : (theme) => theme.palette.primary.main}
      >
        {label}
      </Typography>
    </Stack>
  )
}
