import { Stack } from "@mui/material"
import { useState } from "react"
import FixedBackground from "../Backgrounds/fixed-background"
import LoginForm from "../Forms/login-form"
import PasswordForgottenForm from "../Forms/password-forgotten-form"

export default function LoginLayout({ redirect }) {
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
      <FixedBackground url="url(/medias/lines.jpg)" />
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
