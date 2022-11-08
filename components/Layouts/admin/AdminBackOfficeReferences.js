import { Stack } from "@mui/material"
import ReferencesPanelUI from "./References/ReferencesPanelUI"
import AdminPagesLayout from "../AdminPagesLayout"
import FixedBackground from "../../Backgrounds/fixed-background"

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
