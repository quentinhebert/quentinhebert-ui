import { Backdrop, Stack } from "@mui/material"
import CustomCircularProgress from "../Helpers/custom-circular-progress"
import BodyText from "../Text/body-text"

export default function WaitForLogout(props) {
  const { open } = props

  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: "rgb(0, 0, 0, 0.95)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
      open={open}
    >
      <CustomCircularProgress />
      <BodyText preventTransition>Déconnexion...</BodyText>
    </Backdrop>
  )
}
