import { Stack, Typography } from "@mui/material"
import { useRouter } from "next/router"
import RectangleButton from "../../Buttons/rectangle-button"
import BodyText from "../../Text/body-text"

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

      <RectangleButton secondary="true" onClick={() => router.push("/")}>
        Case départ
      </RectangleButton>
    </Stack>
  )
}
