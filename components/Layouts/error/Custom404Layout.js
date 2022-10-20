import { Stack, Typography } from "@mui/material"
import BodyText from "../../ReusableComponents/text/body-text"
import CustomSubmitButton from "../../ReusableComponents/forms/custom-submit-button"
import { useRouter } from "next/router"

export default function Custom404Layout() {
  const router = useRouter()
  return (
    <Stack
      flexGrow={1}
      minHeight="500px"
      justifyContent="center"
      alignItems="center"
      gap={4}
      padding={2}
    >
      <Typography color="secondary" variant="h2" component="h1">
        404
      </Typography>

      <BodyText>Il semble que vous vous êtes perdu·e en chemin...</BodyText>

      <CustomSubmitButton secondary="true" onClick={() => router.push("/")}>
        Case départ
      </CustomSubmitButton>
    </Stack>
  )
}
