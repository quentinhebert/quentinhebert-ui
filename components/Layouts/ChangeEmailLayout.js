import React, { useEffect, useState } from "react"
import { Stack, Typography, Paper, Button } from "@mui/material"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import AlertInfo from "../../components/Other/alert-info"
import { errorCodes } from "../../config/errorCodes"
import apiCall from "../../services/apiCalls/apiCall"
import PleaseWait from "../ReusableComponents/helpers/please-wait"
import BodyText from "../ReusableComponents/text/body-text"
import OutlinedButton from "../ReusableComponents/buttons/outlined-button"
import SmallTitle from "../ReusableComponents/titles/small-title"

const Custom401Layout = dynamic(() => import("./error/Custom401Layout"))

export default function ChangeEmailLayout(props) {
  /********** PROPS **********/
  const {} = props

  /********** ROUTER & URL PARAMS **********/
  const router = useRouter()
  const token = router.query.token

  /********** USE-STATES **********/
  const [isFetching, setIsFetching] = useState(true)
  const [emailChanged, setEmailChanged] = useState(false)
  const [error, setError] = useState({
    show: false,
    severity: "warning",
    text: "The access is denied.",
    title: "Invalid token",
  })

  /********** INITIAL CHECK **********/
  // Before all, let's check if user has clicked on the link from email-confirmation email
  useEffect(() => {
    const initialCheck = async () => {
      if (token) {
        const res = await apiCall.unauthenticated.changeEmail(token)
        if (!res) setError({ ...error, show: true })

        if (res.status && res.status === 204) setEmailChanged(true)
        else {
          const jsonRes = await res.json()
          if (jsonRes.code === errorCodes.EMAIL_CHANGE_INVALID_TOKEN)
            setError({ ...error, show: true })
        }
        setIsFetching(false)
      }
    }
    initialCheck()
  }, [token])

  if (!token) return <Custom401Layout />

  return (
    <Stack
      flexGrow={1}
      padding="2rem"
      justifyContent="center"
      alignItems="center"
    >
      {isFetching ? (
        <PleaseWait />
      ) : (
        <Stack
          justifyContent="center"
          alignItems="center"
          margin="100px auto"
          padding="1.5rem 3rem"
          borderRadius="10px"
          maxWidth="800px"
          gap={4}
          sx={{ backgroundColor: (theme) => theme.palette.background.main }}
        >
          {emailChanged && <SmallTitle>Adresse e-mail modifiée ✅</SmallTitle>}

          {emailChanged && (
            <>
              <BodyText textAlign="center" fontSize="1rem">
                {`Votre adresse e-mail a bien été modifiée. Pour la modifier de nouveau, vous devez vous rendre dans "Mon compte 
                  > Mes informations personnelles".`}
              </BodyText>

              <Stack
                justifyContent="center"
                alignItems="center"
                flexDirection="row"
                gap={2}
              >
                <OutlinedButton
                  onClick={() => router.push("/account/personal-information")}
                >
                  Mon compte
                </OutlinedButton>
              </Stack>
            </>
          )}

          {error.show && <AlertInfo content={error} />}
        </Stack>
      )}
    </Stack>
  )
}
