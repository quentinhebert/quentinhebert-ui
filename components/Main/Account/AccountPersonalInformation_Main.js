import { Stack } from "@mui/material"
import ChangeAvatarSection from "../../Sections/Account/PersonalInformation/change-avatar-section"
import ChangePersonalInformationSection from "../../Sections/Account/PersonalInformation/change-personal-information-section"
import ChangeTimezoneSection from "../../Sections/Account/PersonalInformation/change-timezone-section"

export default function AccountPersonalInformation_Main(props) {
  const { user, setUser } = props

  return (
    <Stack gap={4} margin="2rem 0">
      {/* AVATAR */}
      <ChangeAvatarSection user={user} setUser={setUser} />

      {/* PERSONAL INFORMATION */}
      <ChangePersonalInformationSection user={user} setUser={setUser} />

      {/* TIMEZONE */}
      <ChangeTimezoneSection user={user} setUser={setUser} />
    </Stack>
  )
}
