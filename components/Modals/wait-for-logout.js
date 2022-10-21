import { Stack } from "@mui/material"
import CustomCircularProgress from "../ReusableComponents/custom-circular-progress"
import CustomModal from "../ReusableComponents/modals/custom-modal"
import BodyText from "../ReusableComponents/text/body-text"

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
