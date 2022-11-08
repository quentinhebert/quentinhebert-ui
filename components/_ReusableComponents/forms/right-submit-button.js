import { Button, Stack } from "@mui/material"
import { styled } from "@mui/system"

const SubmitButton = styled((props) => (
  <Button
    variant="outlined"
    size="large"
    sx={{
      minWidth: "200px",
      color: (theme) => theme.palette.secondary.main,
      backgroundColor: "transparent",
      border: (theme) => `2px solid ${theme.palette.secondary.main}`,
      borderRadius: "30px",
      letterSpacing: "1.5px",
      boxShadow: (theme) => `0px 0px 20px 2px ${theme.palette.secondary.main}`,
      "&:hover": {
        border: (theme) => `2px solid ${theme.palette.secondary.main}`,
        backgroundColor: (theme) => theme.palette.secondary.main,
        color: "#000",
        fontWeight: "bold",
      },
    }}
    {...props}
  />
))(() => ({}))

const ButtonContainer = styled((props) => (
  <Stack sx={{ width: "100%", alignItems: "end" }} {...props} />
))(() => ({}))

export default function RightSubmitButton(props) {
  return (
    <ButtonContainer>
      <SubmitButton {...props} />
    </ButtonContainer>
  )
}
