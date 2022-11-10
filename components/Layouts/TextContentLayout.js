import { Stack } from "@mui/material"
import CenteredMaxWidthContainer from "../Containers/centered-max-width-container"

export default function TextContentLayout(props) {
  return (
    <CenteredMaxWidthContainer margin="150px auto">
      <Stack {...props} />
    </CenteredMaxWidthContainer>
  )
}
