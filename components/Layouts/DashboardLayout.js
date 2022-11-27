import { Stack } from "@mui/material"
import Breadcrumbs from "../Navigation/breadcrumbs"
import PageTitle from "../Titles/page-title"

export default function DashboardLayout({ children, title, noBreadcrumbs }) {
  return (
    <Stack className="column" gap={2} padding="2rem 3rem" margin="80px 0">
      {!noBreadcrumbs && <Breadcrumbs panel="dashboard" />}
      <PageTitle zIndex={1} text={title || ""} />

      <Stack className="full-width" marginTop={2}>
        {children}
      </Stack>
    </Stack>
  )
}
