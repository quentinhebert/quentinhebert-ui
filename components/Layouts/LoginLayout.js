import { Box, Stack } from "@mui/material"
import { useState } from "react"
import LoginForm from "../Forms/login-form"
import PasswordForgottenForm from "../Forms/password-forgotten-form"

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

export default function LoginLayout(props) {
  const { redirect } = props

  const [passwordForgotten, setPasswordForgotten] = useState(false)
  const [defaultEmail, setDefaultEmail] = useState("")
  const handlePasswordForgotten = (bool) => {
    setPasswordForgotten(bool)
  }

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      height="calc(100vh - 65px)"
      minHeight="600px"
    >
      <FixedBackground />
      <Stack
        zIndex={1}
        gap={4}
        sx={{
          width: { xs: "300px", sm: "350px", md: "500px" },
          backgroundColor: "#000",
        }}
      >
        {!passwordForgotten ? (
          <LoginForm
            redirect={redirect}
            handleClickPasswordForgotten={(e) => handlePasswordForgotten(true)}
            passwordForgottenDefaultEmail={defaultEmail}
            setPasswordForgottenDefaultEmail={setDefaultEmail}
          />
        ) : (
          <PasswordForgottenForm
            handleCancel={(e) => handlePasswordForgotten(false)}
            defaultEmail={defaultEmail}
          />
        )}
      </Stack>
    </Stack>
  )
}
