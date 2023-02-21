import { Stack } from "@mui/material"
import { useState } from "react"
import { absoluteFullScreen, background } from "../../styles/helper"
import FixedBackground from "../Backgrounds/fixed-background"
import LoginForm from "../Forms/login-form"
import PasswordForgottenForm from "../Forms/password-forgotten-form"

export default function Login_Main({ redirect }) {
  const [passwordForgotten, setPasswordForgotten] = useState(false)
  const [defaultEmail, setDefaultEmail] = useState("")
  const handlePasswordForgotten = (bool) => {
    setPasswordForgotten(bool)
  }

  return (
    <Stack alignItems="center" justifyContent="center" minHeight="600px">
      <Stack
        sx={{ ...background("/medias/film_grain.jpg"), ...absoluteFullScreen }}
      />
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
