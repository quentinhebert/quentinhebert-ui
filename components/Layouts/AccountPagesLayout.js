import { Stack } from "@mui/material"
import Breadcrumbs from "../Navigation/breadcrumbs"
import PageTitle from "../Titles/page-title"

export default function AccountPagesLayout({ children, title, noBreadcrumbs }) {
  return (
    <Stack className="column" gap={2} padding="2rem 3rem" margin="80px 0">
      <PageTitle zIndex={1} text={title || ""} />
      {!noBreadcrumbs && <Breadcrumbs panel="account" />}

      <Stack className="full-width" marginTop={4}>
        {children}
      </Stack>
    </Stack>
  )
}
