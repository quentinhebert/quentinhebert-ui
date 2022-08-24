import { Stack } from "@mui/material"
import { styled } from "@mui/system"

const FormContainer = styled((props) => (
  <Stack
    component={"form"}
    alignItems="center"
    justifyContent="center"
    gap={2}
    {...props}
  />
))()

export default function CustomForm(props) {
  return <FormContainer {...props} />
}
