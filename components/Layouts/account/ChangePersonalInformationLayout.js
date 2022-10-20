import React from "react"
import ChangePersonalInformation from "./sub-layouts/ChangePersonalInformation"
import ChangeAvatar from "./sub-layouts/ChangeAvatar"
import { Stack } from "@mui/material"
import ChangeTimezone from "./sub-layouts/ChangeTimezone"
import AccountPagesLayout from "../AccountPagesLayout"

export default function ChangePersonalInformationLayout(props) {
  const { user, setUser } = props

  return (
    <AccountPagesLayout title="Mes informations personnelles">
      <Stack gap={4} margin="2rem 0">
        <ChangeAvatar user={user} setUser={setUser} />
        <ChangePersonalInformation user={user} setUser={setUser} />
        <ChangeTimezone user={user} setUser={setUser} />
      </Stack>
    </AccountPagesLayout>
  )
}
