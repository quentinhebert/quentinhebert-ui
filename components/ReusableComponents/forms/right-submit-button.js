import { Button, Stack } from "@mui/material"
import { styled } from "@mui/system"

const SubmitButton = styled((props) => (
  <Button
    variant="outlined"
    size="large"
    sx={{
      width: "200px",
      color: (theme) => theme.palette.secondary.main,
      backgroundColor: "transparent",
      border: (theme) => `2px solid ${theme.palette.secondary.main}`,
      borderRadius: "10px",
      letterSpacing: "1.5px",
      "&:hover": {
        border: (theme) => `2px solid ${theme.palette.secondary.main}`,
        backgroundColor: (theme) => theme.palette.secondary.main,
        color: (theme) => theme.palette.primary.main,
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
