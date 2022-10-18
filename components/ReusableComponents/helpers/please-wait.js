import { Stack } from "@mui/material"
import CustomCircularProgress from "../custom-circular-progress"
import BodyText from "../text/body-text"

export default function PleaseWait() {
  return (
    <Stack padding="2rem" alignItems="center" justifyContent="center">
      <Stack
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
        gap={4}
      >
        <CustomCircularProgress />
        <BodyText preventTransition={true}>Veuillez patienter...</BodyText>
      </Stack>
    </Stack>
  )
}
