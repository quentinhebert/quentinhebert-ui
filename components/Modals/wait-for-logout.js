import { Stack } from "@mui/material"
import CustomCircularProgress from "../Helpers/custom-circular-progress"
import BodyText from "../Text/body-text"
import CustomModal from "./custom-modal"

export default function WaitForLogout(props) {
  const { open } = props

  return (
    <CustomModal open={open} fullscreen>
      <Stack
        alignItems="center"
        justifyContent="center"
        flexDirection="row"
        height="100%"
        gap={4}
      >
        <CustomCircularProgress />
        <BodyText preventTransition>Déconnexion...</BodyText>
      </Stack>
    </CustomModal>
  )
}
