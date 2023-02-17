import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import PersonIcon from "@mui/icons-material/Person"
import WorkIcon from "@mui/icons-material/Work"
import EmailIcon from "@mui/icons-material/Email"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  SwipeableDrawer,
} from "@mui/material"
import React, { useState } from "react"
import LogoutIcon from "@mui/icons-material/Logout"
import { logout } from "../../services/utils"
import Link from "next/link"
import { USERTYPES } from "../../enums/userTypes"
import WaitForLogout from "../Modals/wait-for-logout"
import DashboardIcon from "@mui/icons-material/Dashboard"
import { PersonalComputer, Projects } from "grommet-icons"

const AdminItems = [
  {
    label: "Panneau adminitrateur",
    icon: <AdminPanelSettingsIcon />,
    url: "/admin",
  },
  { label: "Mon compte", icon: <PersonIcon />, url: "/account" },
  {
    label: "Dashboard",
    icon: <DashboardIcon color="#fff" />,
    url: "/dashboard",
  },
]

const ClientItems = [
  { label: "Mon compte", icon: <PersonIcon />, url: "/account" },
  {
    label: "Mes commandes",
    icon: <ShoppingCartIcon />,
    url: "/account/orders",
  },
  // { label: "Messages", icon: <EmailIcon />, url: "#" },
]

const ProfessionalItems = [
  { label: "Mon compte", icon: <PersonIcon />, url: "/account" },
  // { label: "Mes missions", icon: <WorkIcon />, url: "#" },
  // { label: "Messages", icon: <EmailIcon />, url: "#" },
]

const renderMenuItems = (setOfItems) => {
  return setOfItems.map((item, key) => (
    <Link href={item.url} passHref key={key}>
      <Box>
        <ListItem button sx={{ color: (theme) => theme.palette.text.white }}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItem>
      </Box>
    </Link>
  ))
}

export default function UserMenuDrawer(props) {
  const { toggleDrawer, isOpen, user, setUser } = props

  const [openLogoutModal, setOpenLogoutModal] = useState(false)
  const handleOpenLogoutModal = () => setOpenLogoutModal(true)
  const handleCloseLogoutModal = () => setOpenLogoutModal(false)

  const handleLogout = async () => {
    handleOpenLogoutModal()
    const isLoggedOut = await logout() // clean local cookies
    if (isLoggedOut) {
      setUser(null) // User Context}
    }
    handleCloseLogoutModal()
  }

  return (
    <>
      <SwipeableDrawer
        anchor={"right"}
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Stack
          alignItems="left"
          flexDirection="column"
          height="100%"
          paddingRight="1rem"
          sx={{
            background: (theme) => theme.palette.background.main,
          }}
        >
          <Stack
            role="MenuDrawer"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem key="Full name" sx={{ cursor: "default" }}>
                {user.avatar_path ? (
                  <Avatar
                    alt="Avatar"
                    src={user.avatar_path}
                    sx={{ marginRight: "1rem" }}
                  />
                ) : (
                  <Avatar sx={{ marginRight: "1rem" }}>
                    {user.firstname[0]}
                  </Avatar>
                )}
                <ListItemText
                  primary={user.firstname + " " + user.lastname}
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                />
              </ListItem>

              {!!user &&
                user.type === USERTYPES.ADMIN &&
                renderMenuItems(AdminItems)}

              {!!user &&
                user.type === USERTYPES.CLIENT &&
                renderMenuItems(ClientItems)}

              {!!user &&
                user.type === USERTYPES.PROFESSIONAL &&
                renderMenuItems(ProfessionalItems)}

              <ListItem button key="Log out" onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Déconnexion"
                  sx={{ color: (theme) => theme.palette.text.white }}
                />
              </ListItem>
            </List>
          </Stack>
        </Stack>
      </SwipeableDrawer>
      <WaitForLogout open={openLogoutModal} />
    </>
  )
}
