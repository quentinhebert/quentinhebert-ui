import { useState, useEffect } from "react"
import { Box, Typography } from "@mui/material"

export default function Timer() {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const [totalSeconds, setTotalSeconds] = useState(0)

  const updateTimer = () => {
    setTotalSeconds(totalSeconds + 1)
    setSeconds(totalSeconds % 60)
    setMinutes(Math.floor(totalSeconds / 60))
    setHours(Math.floor(totalSeconds / (60 * 60)))
  }

  useEffect(() => {
    setTimeout(() => updateTimer(), 1000)
  }, [totalSeconds])

  const display = (val) => {
    if (val < 10) return "0" + val
    return val
  }

  return (
    <Box component="span">
      <Typography color="text.white">
        {display(hours)}:{display(minutes)}:{display(seconds)}
      </Typography>
    </Box>
  )
}
