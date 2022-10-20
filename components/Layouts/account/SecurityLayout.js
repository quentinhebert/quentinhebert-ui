import React from "react"
import ChangePassword from "./sub-layouts/ChangePassword"
import DeleteAccount from "./sub-layouts/DeleteAccount"
import { Stack } from "@mui/material"
import PageTitle from "../../ReusableComponents/titles/page-title"
import Breadcrumbs from "../../ReusableComponents/navigation/breadcrumbs"
import Sessions from "./sub-layouts/Sessions"
import AccountPagesLayout from "../AccountPagesLayout"

export default function SecurityLayout(props) {
  const { user, setUser } = props

  return (
    <AccountPagesLayout title="Sécurité">
      <Stack gap={4} margin="2rem 0">
        <ChangePassword user={user} setUser={setUser} />
        <Sessions user={user} setUser={setUser} />
        <DeleteAccount user={user} setUser={setUser} />
      </Stack>
    </AccountPagesLayout>
  )
}
