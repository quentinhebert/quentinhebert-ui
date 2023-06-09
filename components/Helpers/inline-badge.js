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
        top: { xs: 12, md: 20 },
        right: { xs: 3, md: 10 },
      }}
    >
      <Badge
        badgeContent={number}
        sx={{
          "& .MuiBadge-badge": {
            padding: { xs: 0, md: ".75rem .5rem" },
            fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" },
            background: "#D21E16",
            color: "#fff",
            border: "3px solid #000",
            borderRadius: "200px",
          },
        }}
      />
    </Stack>
  )
}
