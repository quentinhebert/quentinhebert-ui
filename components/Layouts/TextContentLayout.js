import { Stack } from "@mui/material"
import CenteredMaxWidthContainer from "../Containers/centered-max-width-container"

export default function TextContentLayout(props) {
  return (
    <CenteredMaxWidthContainer margin="50px auto 100px">
      <Stack {...props} />
    </CenteredMaxWidthContainer>
  )
}
