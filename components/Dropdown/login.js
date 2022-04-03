import * as React from "react";
import Avatar from "@mui/material/Avatar";
import withUser from "../hocs/withUser";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import EmailIcon from "@mui/icons-material/Email";
import dynamic from "next/dynamic";
const LoginModal = dynamic(() => import("../Modals/login-modal"));

function Login(props) {
  /********** PROPS **********/
  const { user, logout, handleSetTokens } = props;

  /********** USE-STATES **********/
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);

  /********** FUNCTIONS **********/
  const handleOpenLogin = () => {
    setOpenLogin(true);
  };
  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer(open);
  };

  /********** SUB-COMPONENTS **********/
  const MenuDrawer = () => {
    return (
      <Stack
        role="MenuDrawer"
        onClick={toggleDrawer("right", false)}
        onKeyDown={toggleDrawer("right", false)}
      >
        <List>
          <ListItem button key="Firstname">
            <ListItemText primary={user.firstname + " " + user.lastname} />
          </ListItem>

          <ListItem button key="Mon compte" onClick={null}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Mon compte" />
          </ListItem>

          <ListItem button key="Mes missions" onClick={null}>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Mes missions" />
          </ListItem>

          <ListItem button key="Mon messages" onClick={null}>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItem>

          <ListItem button key="Se déconnecter" onClick={logout}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Se déconnecter" />
          </ListItem>
        </List>
      </Stack>
    );
  };

  /********** RENDER **********/
  if (user)
    return (
      <>
        <Button onClick={toggleDrawer(true)}>
          <Avatar alt="Avatar" src="/logos/logo.png" />
          <Typography margin={2} textTransform="capitalize">
            {user.firstname}
          </Typography>
        </Button>

        <SwipeableDrawer
          anchor={"right"}
          open={openDrawer}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <Stack
            justifyContent="center"
            alignItems="left"
            flexDirection="column"
          >
            <MenuDrawer />
          </Stack>
        </SwipeableDrawer>
      </>
    );

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleOpenLogin}
        sx={{
          letterSpacing: "1px",
          padding: ".5rem 1rem",
          "&:hover": { color: "#fff" },
        }}
      >
        Se connecter
      </Button>

      {openLogin ? (
        <LoginModal
          openLogin={openLogin}
          handleOpenLogin={handleOpenLogin}
          handleCloseLogin={handleCloseLogin}
          handleSetTokens={handleSetTokens}
        />
      ) : null}
    </>
  );
}

/********** EXPORT + HOC **********/
export default withUser(Login);
