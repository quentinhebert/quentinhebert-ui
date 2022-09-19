import { useRouter } from "next/router"
import { Box, Stack } from "@mui/material"
import ResetPasswordForm from "../Forms/reset-password-form"

const FixedBackground = () => (
  <Box
    sx={{
      position: "fixed",
      width: "100%",
      height: "100vh",
      background: "url(/medias/lines.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "fixed",
      zIndex: 0,
    }}
  />
)

export default function ResetPassordLayout(props) {
  /********** PROPS **********/
  const {} = props

  /********** ROUTER & URL PARAMS **********/
  const router = useRouter()
  const token = router.query.token

  return (
    <Stack alignItems="center" justifyContent="center" flexGrow={1}>
      <FixedBackground />
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
