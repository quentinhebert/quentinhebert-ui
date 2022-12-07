import { Badge, Box, Stack, Typography } from "@mui/material"
import BodyText from "../Text/body-text"

export default function InlineBadge({ number }) {
  if (number === 0) return <></>

  return (
    <Stack
      component="span"
      alignItems="center"
      justifyContent="center"
      sx={{
        borderRadius: "200px",
        width: "20px",
        height: "20px",
        background: (theme) => theme.palette.secondary.main,
        margin: "0 .25rem",
        textAlign: "center",
      }}
    >
      <Badge badgeContent={number} color="secondary" />
    </Stack>
  )
}
