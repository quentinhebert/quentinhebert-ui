import React, { useEffect, useState } from "react"
import Footer from "../../components/Navigation/Footers/Footer"
import Navbar from "../../components/Navigation/Navbars/navbar"
import AlertInfo from "../../components/Other/alert-info"
import { errorCodes } from "../../config/errorCodes"
import apiCall from "../../services/apiCalls/apiCall"
import { Stack, Typography, Paper, Button } from "@mui/material"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import withSnacks from "../../components/hocs/withSnacks"

const Custom401 = dynamic(() => import("../../pages/401"))

function EmailConfirmationLayout(props) {
  /********** PROPS **********/
  const { setMessageSnack, setOpenSnackBar, setSeverity } = props

  /********** ROUTER & URL PARAMS **********/
  const router = useRouter()
  const token = router.query.token

  /********** USE-STATES **********/
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
    ;(async () => {
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
    })()
  }, [token])

  if (!token) return <Custom401 />

  return (
    <>
      <Navbar />
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ margin: "2rem auto" }}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ margin: "1rem auto" }}
        >
          <Paper variant="contained" sx={{ padding: "3rem" }}>
            {emailConfirmed ? (
              <Typography
                component="h1"
                variant="h6"
                sx={{ marginBottom: "2rem" }}
              >
                Email address confirmed
              </Typography>
            ) : (
              <Typography
                component="h1"
                variant="h6"
                sx={{ marginBottom: "2rem" }}
              >
                Please wait a few seconds...
              </Typography>
            )}

            {emailConfirmed ? (
              <>
                <Typography variant="body1">
                  Your email address is now confirmed. You can use the website
                  with all its features ! Enjoy 😎
                </Typography>
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  sx={{ marginTop: "2rem" }}
                >
                  <Button variant="outlined" onClick={() => router.push("/")}>
                    Homepage
                  </Button>
                </Stack>
              </>
            ) : error.show ? (
              <AlertInfo content={error} />
            ) : (
              <Typography variant="body1">
                Please wait, we are attempting to confirm your email address...
              </Typography>
            )}
          </Paper>
        </Stack>
      </Stack>
      <Footer />
    </>
  )
}

export default withSnacks(EmailConfirmationLayout)
