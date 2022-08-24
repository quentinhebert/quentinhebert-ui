import { Button } from "@mui/material"
import { styled } from "@mui/system"

const SubmitButton = styled((props) => (
  <Button
    variant="outlined"
    size="large"
    sx={{
      width: "200px",
      color: (theme) => "#fff",
      backgroundColor: "transparent",
      border: `2px solid #fff`,
      borderRadius: "10px",
      letterSpacing: "1.5px",
      "&:hover": {
        border: `2px solid #fff`,
        backgroundColor: "#fff",
        color: theme.palette.secondary.main,
      },
    }}
    {...props}
  />
))()

export default function CustomSubmitButton(props) {
  return <SubmitButton {...props} />
}
