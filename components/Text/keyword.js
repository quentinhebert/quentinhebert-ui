import { Box } from "@mui/material"

export default function Keyword(props) {
  return (
    <Box
      component="span"
      sx={{
        color: (theme) => `${theme.palette.text.secondary} !important`,
        // fontStyle: "italic",
        fontSize: { xs: "1.1rem", md: "1.2rem" },
      }}
      {...props}
    />
  )
}
