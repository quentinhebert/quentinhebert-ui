import { Box, Stack } from "@mui/material"
import PageTitle from "../../ReusableComponents/titles/page-title"
import Breadcrumbs from "../../ReusableComponents/navigation/breadcrumbs"
import ReferencesPanelUI from "./References/ReferencesPanelUI"

export default function AdminBackOfficeReferences(props) {
  const {} = props

  return (
    <Stack
      flexGrow={1}
      direction="column"
      gap={2}
      padding={4}
      paddingTop={"7rem"}
      paddingBottom={"7rem"}
    >
      <Box
        position="fixed"
        width="100%"
        height="100%"
        zIndex={0}
        sx={{
          backgroundImage: "url(/medias/lines.jpg)",
          backgroundSize: "cover",
        }}
      />
      <PageTitle zIndex={1} text="Mes Références" />
      <Breadcrumbs panel="admin" />

      <Stack zIndex={0}>
        <ReferencesPanelUI />
      </Stack>
    </Stack>
  )
}
