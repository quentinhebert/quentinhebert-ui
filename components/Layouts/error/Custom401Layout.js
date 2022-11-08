import { Stack, Typography } from "@mui/material"
import { useRouter } from "next/router"
import BodyText from "../../Text/body-text"
import RectangleButton from "../../Buttons/rectangle-button"

export default function Custom401Layout() {
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
        401
      </Typography>

      <BodyText>Accès refusé... La police est en route !</BodyText>

      <RectangleButton secondary="true" onClick={() => router.push("/")}>
        Faire demi-tour
      </RectangleButton>
    </Stack>
  )
}
