import { Box } from "@mui/material"

export default function ({ url }) {
  return (
    <Box
      className="full-width fixed"
      height="100%"
      zIndex={0}
      sx={{
        backgroundImage: url,
        backgroundSize: "cover",
      }}
    />
  )
}
