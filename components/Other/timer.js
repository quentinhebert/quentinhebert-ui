import { useState, useEffect } from "react"
import { Box, Typography } from "@mui/material"

export default function Timer(props) {
  const { color, fontFamily, fontSize, letterSpacing, disabled } = props

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
    if (!disabled) setTimeout(() => updateTimer(), 1000)
  }, [totalSeconds, disabled])

  const display = (val) => {
    if (val < 10) return "0" + val
    return val
  }

  return (
    <Box component="span">
      <Typography
        fontSize={fontSize || "1rem"}
        color={color || theme.palette.text.white}
        fontFamily={fontFamily || "Helmet"}
        fontWeight="bold"
        letterSpacing={letterSpacing || "1px"}
      >
        {display(hours)}:{display(minutes)}:{display(seconds)}
      </Typography>
    </Box>
  )
}
