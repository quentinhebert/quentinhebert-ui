import * as React from "react"
import Button from "@mui/material/Button"
import { UserContext } from "../../contexts/UserContext"
import { Avatar, Typography, useMediaQuery } from "@mui/material"
import dynamic from "next/dynamic"
import theme from "../../config/theme"
const UserMenuDrawer = dynamic(() => import("../Drawer/user-menu"))

function LoginOrMenuButton(props) {
  /********** PROPS **********/
  const {} = props

  /********** USER CONTEXT **********/
  const { user, setUser, setAccessToken } = React.useContext(UserContext)

  /********** USE-STATES **********/
  const [openLogin, setOpenLogin] = React.useState(false)
  const [openDrawer, setOpenDrawer] = React.useState(false)

  /********** FUNCTIONS **********/
  const handleOpenLogin = () => {
    setOpenLogin(true)
  }
  const handleCloseLogin = () => {
    setOpenLogin(false)
  }
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }
    setOpenDrawer(open)
  }

  const isMobile = useMediaQuery(theme.breakpoints.down("lg"))

  /********** RENDER **********/
  // User logged
  if (user)
    return (
      <>
        <Button
          onClick={toggleDrawer(true)}
          sx={{ "&:hover": { background: "transparent" } }}
        >
          {!isMobile ? (
            <Typography
              marginRight={2}
              textTransform="capitalize"
              color="secondary"
            >
              {user.firstname}
            </Typography>
          ) : null}
          {user.avatar_path ? (
            <Avatar alt="Avatar" src={user.avatar_path} />
          ) : (
            <Avatar>{user.firstname[0]}</Avatar>
          )}
        </Button>
        <UserMenuDrawer
          toggleDrawer={toggleDrawer}
          isOpen={openDrawer}
          user={user}
          setUser={setUser}
          setAccessToken={setAccessToken}
        />
      </>
    )
}

/********** EXPORT **********/
export default LoginOrMenuButton
