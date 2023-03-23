import { Stack } from "@mui/material"
import Breadcrumbs from "../Navigation/breadcrumbs"
import PageTitle from "../Titles/page-title"

export default function DashboardLayout({
  children,
  title,
  noBreadcrumbs,
  marginTop,
  padding,
}) {
  return (
    <Stack
      className="column"
      gap={2}
      sx={{ padding: padding || { xs: "2rem 1rem", md: "2rem 3rem" } }}
    >
      {!noBreadcrumbs && <Breadcrumbs panel="dashboard" />}
      {!!title && <PageTitle zIndex={1} text={title} />}

      <Stack className="full-width" marginTop={marginTop || 2}>
        {children}
      </Stack>
    </Stack>
  )
}
