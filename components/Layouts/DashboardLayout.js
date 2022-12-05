import { Stack } from "@mui/material"
import Breadcrumbs from "../Navigation/breadcrumbs"
import PageTitle from "../Titles/page-title"

export default function DashboardLayout({ children, title, noBreadcrumbs }) {
  return (
    <Stack
      className="column"
      gap={2}
      margin="80px 0"
      sx={{ padding: { xs: "2rem 1rem", md: "2rem 3rem" } }}
    >
      {!noBreadcrumbs && <Breadcrumbs panel="dashboard" />}
      <PageTitle zIndex={1} text={title || ""} />

      <Stack className="full-width" marginTop={2}>
        {children}
      </Stack>
    </Stack>
  )
}
