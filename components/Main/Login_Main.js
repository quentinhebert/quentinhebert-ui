import { Box, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { absoluteFullScreen, background } from "../../styles/helper"
import LoginForm from "../Forms/login-form"
import PasswordForgottenForm from "../Forms/password-forgotten-form"
import Link from "next/link"

export default function Login_Main({ redirect }) {
  const [passwordForgotten, setPasswordForgotten] = useState(false)
  const [defaultEmail, setDefaultEmail] = useState("")
  const handlePasswordForgotten = (bool) => {
    setPasswordForgotten(bool)
  }

  return (
    <Stack alignItems="center" justifyContent="center" minHeight="700px">
      <Stack
        sx={{ ...background("/medias/film_grain.jpg"), ...absoluteFullScreen }}
      />
      <Stack
        zIndex={1}
        gap={4}
        sx={{
          width: { xs: "300px", sm: "350px", md: "500px" },
          backgroundColor: "#000",
          borderRadius: "30px",
          boxShadow: (theme) =>
            `0 0 30px .5rem ${theme.palette.secondary.main}`,
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

        <Box margin="-2rem auto 2rem">
          <Link href="/signup" passHref>
            <Typography className="pointer" color="#fff">
              <Box component="span" className="cool-button">
                Je n'ai pas encore de compte
              </Box>
            </Typography>
          </Link>
        </Box>
      </Stack>
    </Stack>
  )
}
