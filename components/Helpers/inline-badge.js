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
export function OverlapBadge({ number }) {
  if (number === 0) return <></>

  return (
    <Stack
      component="span"
      alignItems="center"
      justifyContent="center"
      sx={{
        position: "absolute",
        top: { xs: 10, md: 20 },
        right: { xs: 2.5, md: 10 },
        borderRadius: "200px",
        // background: (theme) => theme.alert.title.error.color,
      }}
    >
      <Badge
        badgeContent={number}
        sx={{
          "& .MuiBadge-badge": {
            fontSize: "1rem",
            background: "#D21E16",
            color: "#fff",
          },
        }}
      />
    </Stack>
  )
}
