import { Stack } from "@mui/material"
import SignUpForm from "../Forms/signup-form"
import { useRouter } from "next/router"
import CustomCard from "../Cards/custom-card"
import CustomCardTitle from "../Titles/custom-card-title"

export default function Signup_Main() {
  const router = useRouter()
  return (
    <Stack flexGrow={1} minHeight="800px">
      <Stack maxWidth="400px" margin="auto">
        <CustomCard
          gap={6}
          boxShadow={(theme) =>
            `0 0 30px .5rem ${theme.palette.secondary.main}`
          }
        >
          <CustomCardTitle>Inscription</CustomCardTitle>
          <SignUpForm defaultValues={{ email: router.query.default_email }} />
        </CustomCard>
      </Stack>
    </Stack>
  )
}
