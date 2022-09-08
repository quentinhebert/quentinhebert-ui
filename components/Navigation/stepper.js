import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined"
import { Stack } from "@mui/material"

export default function Stepper({ totalSteps, activeStep, setActiveStep }) {
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      zIndex={1}
      sx={{ color: (theme) => theme.palette.secondary.main }}
    >
      {[...Array(totalSteps).keys()].map((key) => {
        if (key === activeStep)
          return (
            <FiberManualRecordIcon
              key={key}
              sx={{ cursor: "pointer", fontSize: "1rem" }}
            />
          )
        return (
          <FiberManualRecordOutlinedIcon
            key={key}
            sx={{ cursor: "pointer", fontSize: "1rem" }}
            onClick={(e) => setActiveStep(key)}
          />
        )
      })}
    </Stack>
  )
}
