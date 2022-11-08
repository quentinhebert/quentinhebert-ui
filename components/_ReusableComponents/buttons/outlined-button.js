import { Box, Button } from "@mui/material"

export default function OutlinedButton(props) {
  return (
    <Box>
      <Button
        variant="outlined"
        color="secondary"
        sx={{
          fontSize: { xs: "1rem", md: "1.1rem" },
          border: (theme) => `1px solid ${theme.palette.secondary.main}`,
          padding: ".25rem 2rem",
        }}
        onClick={props.onClick}
        {...props}
      />
    </Box>
  )
}
