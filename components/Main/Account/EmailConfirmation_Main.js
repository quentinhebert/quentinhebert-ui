import React, { useEffect, useState } from "react"
import { errorCodes } from "../../../config/errorCodes"
import apiCall from "../../../services/apiCalls/apiCall"
import { Stack } from "@mui/material"
import { useRouter } from "next/router"
import Login_Main from "../Login_Main"
import Custom401_Main from "../Errors/Custom401_Main"
import BodyText from "../../Text/body-text"
import SmallTitle from "../../Titles/small-title"
import OutlinedButton from "../../Buttons/outlined-button"
import { setRefreshToken, setToken } from "../../../services/auth"

export default function EmailConfirmation_Main(props) {
  /********** PROPS **********/
  const {} = props

  /********** ROUTER & URL PARAMS **********/
  const router = useRouter()
  const token = router.query.token

  /********** USE-STATES **********/
  const [login, setLogin] = useState(false)
  const [emailConfirmed, setEmailConfirmed] = useState(false)
  const [error, setError] = useState(false)

  /********** INITIAL CHECK **********/
  // Before all, let's check if user has clicked on the link from email-confirmation email
  useEffect(() => {
    const checkEmail = async () => {
      if (token) {
        const res = await apiCall.users.security.email.confirm(token)
        if (!res || !res.ok) setError(true)

        if (res.status && res.ok) {
          setEmailConfirmed(true)
          const jsonRes = await res.json()
          if (jsonRes.token && jsonRes.refresh_token) {
            setToken(jsonRes.token)
            setRefreshToken(jsonRes.refresh_token)
            window.location.href = "/"
          }
        } else {
          const jsonRes = await res.json()
          if (jsonRes.code === errorCodes.EMAIL_CONFIRM_INVALID_TOKEN)
            return setError(true)
        }
      }
    }
    checkEmail()
  }, [token])

  if (!token || (!emailConfirmed && error)) return <Custom401_Main />

  return (
    <Stack flexGrow={1}>
      {login ? (
        <Login_Main redirect="/" />
      ) : (
        <Stack
          flexGrow={1}
          padding="2rem"
          justifyContent="center"
          alignItems="center"
        >
          <Stack
            justifyContent="center"
            alignItems="center"
            margin="100px auto"
            padding="1.5rem 3rem"
            borderRadius="10px"
            gap={2}
            sx={{ backgroundColor: (theme) => theme.palette.background.main }}
          >
            {emailConfirmed ? (
              <SmallTitle>Votre e-mail est confirmé !</SmallTitle>
            ) : (
              <SmallTitle>Veuillez patienter un instant...</SmallTitle>
            )}

            {emailConfirmed && (
              <>
                <BodyText fontSize="1rem" textAlign="center">
                  Votre adresse e-mail est désormais confirmée.
                  <br />
                  Vous pouvez désormais profiter de toutes les fonctionnalités
                  du site ! 😎
                </BodyText>

                <Stack
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="row"
                  gap={2}
                >
                  <OutlinedButton onClick={() => setLogin(true)}>
                    Connexion
                  </OutlinedButton>
                  <OutlinedButton onClick={() => router.push("/")}>
                    Accueil
                  </OutlinedButton>
                </Stack>
              </>
            )}
          </Stack>
        </Stack>
      )}
    </Stack>
  )
}
