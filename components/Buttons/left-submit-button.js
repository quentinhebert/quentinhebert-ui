import { Button, Stack } from "@mui/material"
import { styled } from "@mui/system"
import SubmitButton from "./submit-button"

const ButtonContainer = styled((props) => (
  <Stack sx={{ width: "100%", alignItems: "start" }} {...props} />
))(() => ({}))

export default function LeftSubmitButton(props) {
  return (
    <ButtonContainer>
      <SubmitButton {...props} />
    </ButtonContainer>
  )
}
