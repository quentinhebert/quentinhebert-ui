import { Stack } from "@mui/material"
import { useRouter } from "next/router"
import RectangleButton from "../../Buttons/rectangle-button"
import BodyText from "../../Text/body-text"
import CustomH1 from "../../Titles/custom-h1"

export default function Custom401_Main({ redirect }) {
  const router = useRouter()
  return (
    <Stack
      className="flex-center flex-grow"
      minHeight="400px"
      gap={4}
      padding={2}
    >
      <CustomH1 color="secondary">401</CustomH1>

      <BodyText>Accès refusé... La police est en route !</BodyText>

      <RectangleButton secondary onClick={() => router.push(redirect || "/")}>
        Faire demi-tour
      </RectangleButton>
    </Stack>
  )
}
