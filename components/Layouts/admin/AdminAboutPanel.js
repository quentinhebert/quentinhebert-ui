import { Link, Stack, Typography } from "@mui/material"
import { useRouter } from "next/router"
import EditAboutPage from "./EditAboutPage"

export default function AdminAboutPanel(props) {
  const {} = props

  const router = useRouter()

  return (
    <Stack justifyContent="center" direction="column" gap={4} padding="1rem">
      <Typography component="h6" variant="h6">
        <Link onClick={() => router.push("/admin")} href="#" color="#000">
          Dashboard
        </Link>
        {" > Edit About page"}
      </Typography>

      <Typography component="span" variant="body1">
        Beneath, you can edit the different content of your About page.
      </Typography>
      <Stack alignItems="center" justifyContent="center" direction="column">
        <EditAboutPage />
      </Stack>
    </Stack>
  )
}
