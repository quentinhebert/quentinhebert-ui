import { Link, Stack, Typography } from "@mui/material"
import { useRouter } from "next/router"
import EditCategories from "./EditCategories"

export default function AdminCategoriesPanel(props) {
  const {} = props

  const router = useRouter()

  return (
    <Stack justifyContent="center" direction="column" gap={4} padding="1rem">
      <Typography component="h6" variant="h6">
        <Link onClick={() => router.push("/admin")} href="#" color="#000">
          Dashboard
        </Link>
        {" > Edit categories"}
      </Typography>

      <Typography component="span" variant="body1">
        Beneath, you can edit the different categories of your homepage.
      </Typography>
      <Stack alignItems="center" justifyContent="center" direction="column">
        <EditCategories />
      </Stack>
    </Stack>
  )
}
