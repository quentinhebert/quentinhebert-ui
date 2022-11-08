import { Stack } from "@mui/material"
import CustomCircularProgress from "../Helpers/custom-circular-progress"
import BodyText from "../Text/body-text"
import CustomModal from "./custom-modal"

export default function WaitForLogout(props) {
  const { open } = props

  return (
    <CustomModal open={open}>
      <Stack
        alignItems="center"
        justifyContent="center"
        flexDirection="row"
        minHeight={300}
        gap={4}
      >
        <CustomCircularProgress />
        <BodyText preventTransition>Déconnexion...</BodyText>
      </Stack>
    </CustomModal>
  )
}
