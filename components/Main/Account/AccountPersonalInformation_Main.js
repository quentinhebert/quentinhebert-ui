import { Stack } from "@mui/material"
import ChangeAvatarSection from "../../Sections/Account/PersonalInformation/change-avatar-section"
import ChangePersonalInformationSection from "../../Sections/Account/PersonalInformation/change-personal-information-section"
import ChangeTimezoneSection from "../../Sections/Account/PersonalInformation/change-timezone-section"
import CenteredMaxWidthContainer from "../../Containers/centered-max-width-container"

export default function AccountPersonalInformation_Main(props) {
  const { user, setUser } = props

  return (
    <Stack margin="2rem 0">
      <CenteredMaxWidthContainer gap={4}>
        {/* AVATAR */}
        <ChangeAvatarSection user={user} setUser={setUser} />

        {/* PERSONAL INFORMATION */}
        <ChangePersonalInformationSection user={user} setUser={setUser} />

        {/* TIMEZONE */}
        <ChangeTimezoneSection user={user} setUser={setUser} />
      </CenteredMaxWidthContainer>
    </Stack>
  )
}
