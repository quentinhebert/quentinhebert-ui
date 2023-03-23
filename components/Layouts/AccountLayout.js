import { Stack } from "@mui/material"
import Breadcrumbs from "../Navigation/breadcrumbs"
import PageTitle from "../Titles/page-title"

export default function AccountLayout({ children, title, noBreadcrumbs }) {
  return (
    <Stack
      className="column"
      gap={2}
      sx={{ padding: { xs: "2rem 1.5rem", md: "2rem 3rem" } }}
    >
      {!noBreadcrumbs && <Breadcrumbs panel="account" />}
      {!!title && <PageTitle zIndex={1} text={title} />}

      <Stack className="full-width" marginTop={4}>
        {children}
      </Stack>
    </Stack>
  )
}
