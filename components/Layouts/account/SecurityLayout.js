import React from "react"
import ChangePassword from "./sub-layouts/ChangePassword"
import DeleteAccount from "./sub-layouts/DeleteAccount"
import { Stack } from "@mui/material"
import PageTitle from "../../ReusableComponents/titles/page-title"
import Breadcrumbs from "../../ReusableComponents/navigation/breadcrumbs"
import Sessions from "./sub-layouts/Sessions"

export default function SecurityLayout(props) {
  const { user, setUser } = props

  return (
    <Stack
      justifyContent="center"
      direction="column"
      gap={2}
      padding="1rem"
      margin="100px 0"
    >
      <PageTitle zIndex={1} text="Sécurité" />
      <Breadcrumbs panel="account" />

      <Stack gap={4} margin="2rem 0">
        <ChangePassword user={user} setUser={setUser} />
        <Sessions user={user} setUser={setUser} />
        <DeleteAccount user={user} setUser={setUser} />
      </Stack>
    </Stack>
  )
}
