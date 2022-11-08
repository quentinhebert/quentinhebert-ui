import React from "react"
import { Stack } from "@mui/material"
import ChangePasswordSection from "../../Sections/Account/Security/ChangePasswordSection"
import SessionsSection from "../../Sections/Account/Security/SessionsSection"
import DeleteAccountSection from "../../Sections/Account/Security/DeleteAccountSection"

export default function AccountSecurity_Main(props) {
  const { user, setUser } = props

  return (
    <Stack gap={4} margin="2rem 0">
      {/* PASSWORD */}
      <ChangePasswordSection user={user} setUser={setUser} />

      {/* SESSIONS */}
      <SessionsSection user={user} setUser={setUser} />

      {/* DELETE ACCOUNT */}
      <DeleteAccountSection user={user} setUser={setUser} />
    </Stack>
  )
}
