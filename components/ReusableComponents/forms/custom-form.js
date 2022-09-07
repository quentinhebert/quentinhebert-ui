import { Stack, useMediaQuery } from "@mui/material"
import { styled } from "@mui/system"

const FormContainer = styled((props) => {
  const md = useMediaQuery((theme) => theme.breakpoints.down("md"))
  return (
    <Stack
      component={"form"}
      alignItems="center"
      justifyContent="center"
      gap={md ? 1 : 2}
      {...props}
    />
  )
})(() => ({}))

export default function CustomForm(props) {
  return <FormContainer {...props} />
}
