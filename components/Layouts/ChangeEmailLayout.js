import React, { useEffect, useState } from "react"
import { Stack } from "@mui/material"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import apiCall from "../../services/apiCalls/apiCall"
import PleaseWait from "../Helpers/please-wait"
import BodyText from "../text/body-text"
import OutlinedButton from "../Buttons/outlined-button"
import SmallTitle from "../Titles/small-title"

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
  const [error, setError] = useState(false)

  /********** INITIAL CHECK **********/
  // Before all, let's check if user has clicked on the link from email-confirmation email
  useEffect(() => {
    const initialCheck = async () => {
      if (token) {
        const res = await apiCall.users.security.email.update(token)
        if (!res || !res.ok) setError(true)

        if (res.status && res.status === 204) setEmailChanged(true)
        else {
          const jsonRes = await res.json()
          if (jsonRes.code === errorCodes.EMAIL_CHANGE_INVALID_TOKEN)
            setError(true)
        }
        setIsFetching(false)
      }
    }
    initialCheck()
  }, [token])

  if (!token || (!emailChanged && error)) return <Custom401Layout />

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
        </Stack>
      )}
    </Stack>
  )
}
