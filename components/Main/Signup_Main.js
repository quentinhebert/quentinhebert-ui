import { Box, Stack, Typography } from "@mui/material"
import SignUpForm from "../Forms/signup-form"
import { useRouter } from "next/router"
import CustomCard from "../Cards/custom-card"
import CustomCardTitle from "../Titles/custom-card-title"
import Link from "next/link"

export default function Signup_Main() {
  const router = useRouter()
  return (
    <Stack flexGrow={1} mt={10} mb={10}>
      <Stack maxWidth="400px" margin="auto">
        <CustomCard
          gap={6}
          boxShadow={(theme) =>
            `0 0 30px .5rem ${theme.palette.secondary.main}`
          }
        >
          <CustomCardTitle>Créer mon compte</CustomCardTitle>
          <SignUpForm defaultValues={{ email: router.query.default_email }} />

          <Box>
            <Link href="/login" passHref>
              <Typography className="pointer cool-button">
                J'ai déjà un compte
              </Typography>
            </Link>
          </Box>
        </CustomCard>
      </Stack>
    </Stack>
  )
}
