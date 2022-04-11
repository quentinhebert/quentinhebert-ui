import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import EmailIcon from "@mui/icons-material/Email";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  SwipeableDrawer,
} from "@mui/material";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../services/utils";
import Link from "next/link";
import { USERTYPES } from "../../enums/userTypes";

const AdminItems = [
  { label: "Espace admin", icon: <AdminPanelSettingsIcon />, url: "/admin" },
  { label: "Mon compte", icon: <PersonIcon />, url: "/account" },
  { label: "Mes missions", icon: <WorkIcon />, url: "#" },
  { label: "Messages", icon: <EmailIcon />, url: "#" },
];

const ClientItems = [
  { label: "Mon compte", icon: <PersonIcon />, url: "/account" },
  { label: "Mes commandes", icon: <ShoppingCartIcon />, url: "#" },
  { label: "Messages", icon: <EmailIcon />, url: "#" },
];

const ProfessionalItems = [
  { label: "Mon compte", icon: <PersonIcon />, url: "/account" },
  { label: "Mes missions", icon: <WorkIcon />, url: "#" },
  { label: "Messages", icon: <EmailIcon />, url: "#" },
];

const renderMenuItems = (setOfItems) => {
  return setOfItems.map((item) => (
    <Link href={item.url} passHref>
      <ListItem button key={item.label}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.label} />
      </ListItem>
    </Link>
  ));
};

export default function UserMenuDrawer(props) {
  const { toggleDrawer, isOpen, user, setUser, setAccessToken } = props;

  const handleLogout = () => {
    logout(); // clean local cookies
    setAccessToken(null); // User Context
    setUser(null); // User Context
  };

  return (
    <SwipeableDrawer
      anchor={"right"}
      open={isOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <Stack
        justifyContent="center"
        alignItems="left"
        flexDirection="column"
        sx={{ paddingRight: "1rem" }}
      >
        <Stack
          role="MenuDrawer"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem key="Full name" sx={{ cursor: "default" }}>
              <Avatar
                alt="Avatar"
                src="/logos/logo.png"
                sx={{ marginRight: "1rem" }}
              />
              <ListItemText primary={user.firstname + " " + user.lastname} />
            </ListItem>

            {!!user &&
              user.type === USERTYPES.ADMIN &&
              renderMenuItems(AdminItems)}

            {!!user &&
              user.type === USERTYPES.CLIENT &&
              renderMenuItems(ClientItems)}

            {!!user &&
              user.type === USERTYPES.CLIENT &&
              renderMenuItems(ProfessionalItems)}

            <ListItem button key="Se déconnecter" onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Se déconnecter" />
            </ListItem>
          </List>
        </Stack>
      </Stack>
    </SwipeableDrawer>
  );
}
