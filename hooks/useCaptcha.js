// hooks/useCaptcha.js
import { useContext, useState } from "react"
import {
  Checkbox,
  CircularProgress,
  Box,
  Stack,
  Typography,
} from "@mui/material"
import { defaultConfig } from "../config/defaultConfig"
import translations from "../services/translation"
import { AppContext } from "../contexts/AppContext"

/**
 * Gère le captcha custom + session + heuristique côté front
 */
export function useCaptcha() {
  const { lang } = useContext(AppContext)

  const [honeypot, setHoneypot] = useState(false)
  const [captcha, setCaptcha] = useState(null)
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(false)
  const [alert, setAlert] = useState(null)
  const [missingCaptcha, setMissingCaptcha] = useState(false)

  // Récupère ou crée un sessionId stocké en localStorage
  const getSessionId = () => {
    let id = localStorage.getItem("sessionId")
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem("sessionId", id)
    }
    return id
  }

  // API Call
  async function getChallengeApiCall({ sessionId }) {
    try {
      return await fetch(
        `${defaultConfig.apiUrl}/captcha/challenge?sessionId=${sessionId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    } catch (error) {
      console.error(error)
    }
  }

  // Compute Captcha va demander du temps de travail au navigateur + ordinateur / machine du client
  function computeCaptchaAsync(A, B, iterations = 100_000, chunkSize = 5_000) {
    return new Promise((resolve) => {
      let result = BigInt(A) + BigInt(B)
      let n = BigInt(0)
      let i = 0

      function doChunk() {
        const end = Math.min(i + chunkSize, iterations)
        for (; i < end; i++) {
          n = (n + result + BigInt(i) * 31n) ^ ((result << 5n) | (result >> 3n))
          result = (result + n) & 0xffffffffffffffffn
        }

        if (i < iterations) {
          // laisse le thread respirer et continue le chunk suivant
          setTimeout(doChunk, 0)
        } else {
          resolve(result.toString())
        }
      }

      doChunk()
    })
  }

  // Demande un challenge au serveur
  const initCaptcha = async () => {
    const startTime = Date.now()
    setLoading(true) // Pour la checkbox Captcha
    setMissingCaptcha(false)
    const res = await getChallengeApiCall({ sessionId: getSessionId() })
    if (!res || !res.ok) {
      // Potentiellement rate limit reached
      setChecked(false)
      setLoading(false)

      if (res) {
        const jsonRes = await res.json()
        if (jsonRes.error === "rate_limit_exceeded")
          setAlert(translations.contact.captcha.alerts.too_many_attemps[lang])
        if (jsonRes.error === "blacklist")
          setAlert(translations.contact.captcha.alerts.blacklist[lang])
      }
      return
    }
    const challenge = await res.json()

    if (challenge !== null) {
      const { A, B, token, nonce } = challenge

      const result = BigInt(A) + BigInt(B)
      const proof = await computeCaptchaAsync(A, B, 1_000_000)

      setCaptcha({
        A,
        B,
        result: result.toString(),
        token,
        nonce,
        honeypot,
        proof,
        heuristique: { start: startTime },
      })

      setChecked(true)
      setLoading(false)
    } else {
      // FIXME Afficher un problème sur la checkbox
      setChecked(false)
      setLoading(false)
    }
  }

  // Composant HONEYPOT caché à placer dans le formulaire
  const Honeypot = () => {
    return (
      <input
        type="text"
        name="jetevoislehacker"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ display: "none" }}
        tabIndex="-1"
        autoComplete="off"
      />
    )
  }

  function handleResetCaptcha() {
    setChecked(false)
    setCaptcha(null)
    setMissingCaptcha(false)
    setAlert(null)
  }

  // Composant CAPTCHA
  function CaptchaComponent() {
    return (
      <>
        <Stack
          alignItems="center"
          flexDirection="row"
          bgcolor="#161616"
          sx={{
            padding: "0.5rem 1rem",
            border: missingCaptcha ? "2px solid" : "0px",
            borderColor: (theme) => theme.palette.error.main,
            borderRadius: 3,
            maxWidth: { xs: "100%", md: "350px", lg: "350px" },
            width: "100%",
            transition: "box-shadow 0.2s ease",
            cursor: "default",
            ":hover": {
              boxShadow: (theme) => `0px 0px 10px 1px rgb(198, 144, 14, 0.6)`,
            },
          }}
        >
          <Box position="relative" width={40} height={40}>
            {loading ? (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress size={28} color="secondary" />
              </div>
            ) : (
              <div
                key="checkbox"
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Checkbox
                  color="secondary"
                  checked={checked}
                  disabled={checked}
                  onClick={initCaptcha}
                  sx={{
                    "&.Mui-disabled": {
                      color: (theme) => theme.palette.secondary.main,
                    },
                    "& .MuiSvgIcon-root": {
                      transition: "transform 0.2s ease",
                      transform: checked ? "scale(1.2)" : "scale(1)",
                    },
                  }}
                />
              </div>
            )}
          </Box>

          <Stack>
            <Typography
              color="secondary"
              variant="body1"
              fontSize="1rem"
              ml={2}
            >
              {translations.contact.captcha.label[lang]}
            </Typography>

            {alert && (
              <Typography
                ml={2}
                color={(theme) => theme.palette.error.light}
                variant="body2"
                fontSize="0.6rem"
              >
                {alert}
              </Typography>
            )}

            {missingCaptcha && (
              <Typography
                ml={2}
                color={(theme) => theme.palette.error.light}
                variant="body2"
                fontSize="0.6rem"
              >
                {translations.contact.captcha.missingCaptcha[lang]}
              </Typography>
            )}
          </Stack>
        </Stack>
      </>
    )
  }

  return {
    CaptchaComponent,
    captcha,
    Honeypot,
    handleResetCaptcha,
    setMissingCaptcha,
  }
}
