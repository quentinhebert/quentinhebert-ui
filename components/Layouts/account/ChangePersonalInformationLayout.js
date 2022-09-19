import React from "react"
import ChangePersonalInformation from "./ChangePersonalInformation"
import ChangePassword from "./ChangePassword"
import ChangeAvatar from "./ChangeAvatar"
import DeleteAccount from "./DeleteAccount"
import { Stack } from "@mui/material"
import PageTitle from "../../ReusableComponents/titles/page-title"
import Breadcrumbs from "../../ReusableComponents/navigation/breadcrumbs"

export default function ChangePersonalInformationLayout(props) {
  const { user, setUser } = props

  return (
    <Stack
      justifyContent="center"
      direction="column"
      gap={2}
      padding="1rem"
      margin="100px 0"
    >
      <PageTitle zIndex={1} text="Mes informations personnelles" />
      <Breadcrumbs panel="account" />

      <Stack gap={4} margin="2rem 0">
        <ChangeAvatar user={user} setUser={setUser} />
        <ChangePersonalInformation user={user} setUser={setUser} />
        <ChangePassword user={user} setUser={setUser} />
        <DeleteAccount user={user} setUser={setUser} />
      </Stack>
    </Stack>
  )
}