import React, { useEffect, useState } from "react"
import Footer from "../../components/Navigation/Footers/Footer"
import AlertInfo from "../../components/Other/alert-info"
import { errorCodes } from "../../config/errorCodes"
import apiCall from "../../services/apiCalls/apiCall"
import { Stack, Typography, Button } from "@mui/material"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import BodyText from "../ReusableComponents/text/body-text"
import SmallTitle from "../ReusableComponents/titles/small-title"
import OutlinedButton from "../ReusableComponents/buttons/outlined-button"
import LoginLayout from "../Layouts/LoginLayout"

const Custom401 = dynamic(() => import("../../pages/401"))

export default function EmailConfirmationLayout(props) {
  /********** PROPS **********/
  const {} = props

  /********** ROUTER & URL PARAMS **********/
  const router = useRouter()
  const token = router.query.token

  /********** USE-STATES **********/
  const [login, setLogin] = useState(false)
  const [emailConfirmed, setEmailConfirmed] = useState(false)
  const [error, setError] = useState({
    show: false,
    severity: "warning",
    text: "L'accès demandé n'est pas autorisé.",
    title: "Token invalide",
  })

  /********** INITIAL CHECK **********/
  // Before all, let's check if user has clicked on the link from email-confirmation email
  useEffect(() => {
    const checkEmail = async () => {
      if (token) {
        const res = await apiCall.unauthenticated.emailConfirm(token)
        if (!res) setError({ ...error, show: true })

        if (res.status && res.status === 204) setEmailConfirmed(true)
        else {
          const jsonRes = await res.json()
          if (jsonRes.code === errorCodes.EMAIL_CONFIRM_INVALID_TOKEN)
            return setError({ ...error, show: true })
        }
      }
    }
    checkEmail()
  }, [token])

  if (!token) return <Custom401 />

  return (
    <Stack minHeight="100vh">
      {login ? (
        <LoginLayout redirect="/" />
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

            {error.show && <AlertInfo content={error} />}

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

      <Footer />
    </Stack>
  )
}
