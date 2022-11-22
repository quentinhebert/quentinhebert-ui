import { Box } from "@mui/material"

export default function FixedBackground({ url, background }) {
  if (background)
    return (
      <Box
        className="full-width fixed"
        height="100%"
        zIndex={0}
        sx={{
          background: background,
          backgroundSize: "cover",
        }}
      />
    )
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
