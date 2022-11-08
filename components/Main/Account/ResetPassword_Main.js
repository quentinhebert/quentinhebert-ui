import { useRouter } from "next/router"
import { Stack } from "@mui/material"
import ResetPasswordForm from "../../Forms/reset-password-form"
import FixedBackground from "../../Backgrounds/fixed-background"

export default function ResetPassword_Main(props) {
  /********** PROPS **********/
  const {} = props

  /********** ROUTER & URL PARAMS **********/
  const router = useRouter()
  const token = router.query.token

  return (
    <Stack alignItems="center" justifyContent="center" flexGrow={1}>
      <FixedBackground url="url(/medias/lines.jpg)" />
      <Stack
        zIndex={1}
        gap={4}
        padding="8rem 0"
        sx={{
          backgroundColor: "#000",
        }}
      >
        <ResetPasswordForm token={token} />
      </Stack>
    </Stack>
  )
}
