import React from "react"
import { Stack } from "@mui/material"
import ChangePasswordSection from "../../Sections/Account/Security/change-password-section"
import SessionsSection from "../../Sections/Account/Security/sessions-section"
import DeleteAccountSection from "../../Sections/Account/Security/delete-account-section"
import CenteredMaxWidthContainer from "../../Containers/centered-max-width-container"

export default function AccountSecurity_Main(props) {
  const { user, setUser } = props

  return (
    <Stack maxWidth="880px" width="100%" gap={2} margin="auto">
      {/* PASSWORD */}
      <ChangePasswordSection user={user} setUser={setUser} />

      {/* SESSIONS */}
      <SessionsSection user={user} setUser={setUser} />

      {/* DELETE ACCOUNT */}
      <DeleteAccountSection user={user} setUser={setUser} />
    </Stack>
  )
}
