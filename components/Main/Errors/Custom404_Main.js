import { Stack } from "@mui/material"
import { useRouter } from "next/router"
import RectangleButton from "../../Buttons/rectangle-button"
import BodyText from "../../Text/body-text"
import CustomH1 from "../../Titles/custom-h1"

export default function Custom404_Main() {
  const router = useRouter()
  return (
    <Stack
      className="flex-center flex-grow"
      minHeight="500px"
      gap={4}
      padding={2}
    >
      <CustomH1 color="secondary">404</CustomH1>

      <BodyText>Il semble que vous vous êtes perdu·e en chemin...</BodyText>

      <RectangleButton secondary onClick={() => router.push("/")}>
        Case départ
      </RectangleButton>
    </Stack>
  )
}
