import { Stack } from "@mui/material"
import Breadcrumbs from "../Navigation/breadcrumbs"
import PageTitle from "../Titles/page-title"

export default function AdminLayout({ children, title, noBreadcrumbs }) {
  return (
    <Stack className="column" gap={2} padding="2rem 3rem">
      {!noBreadcrumbs && <Breadcrumbs panel="admin" />}
      <PageTitle zIndex={1} text={title || ""} />

      <Stack className="full-width" marginTop={2}>
        {children}
      </Stack>
    </Stack>
  )
}
