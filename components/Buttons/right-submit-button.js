import { Button, Stack } from "@mui/material"
import { styled } from "@mui/system"
import SubmitButton from "./submit-button"

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
