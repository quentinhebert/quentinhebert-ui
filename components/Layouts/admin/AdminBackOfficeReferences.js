import { Box, Stack } from "@mui/material"
import ReferencesPanelUI from "./References/ReferencesPanelUI"
import FixedBackground from "../../ReusableComponents/backgrounds/fixed-background"
import AdminPagesLayout from "../AdminPagesLayout"

export default function AdminBackOfficeReferences(props) {
  const {} = props

  return (
    <AdminPagesLayout title="Mes références">
      <FixedBackground url="url(/medias/lines.jpg)" />

      <Stack zIndex={0}>
        <ReferencesPanelUI />
      </Stack>
    </AdminPagesLayout>
  )
}
