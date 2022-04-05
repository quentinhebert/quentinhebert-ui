import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import LogoSwitchDropdown from "../../Dropdown/logo-switch-dropdown";
import Login from "../../Dropdown/login";

export default function Navbar(props) {
  const { dev, film } = props;

  // Define main color of navbar
  let mainColor = "#000";
  if (dev) mainColor = "#004fa0";
  else if (film) mainColor = "#87181f";

  // Define logo of navbar
  let logo = "/logos/logo.png";
  if (dev) logo = "/logos/dev-logo.png";
  else if (film) logo = "/logos/film-logo.png";

  return (
    <AppBar
      position="sticky"
      component="nav"
      sx={{ backgroundColor: mainColor, backgroundImage: "none" }}
    >
      <Box sx={{ flexGrow: 2 }}>
        <Toolbar>
          <LogoSwitchDropdown src={logo} />
          <Box component="div" sx={{ flexGrow: 1 }} />
          <Button
            sx={{
              backgroundColor: "#fff",
              color: mainColor,
              letterSpacing: "1px",
              padding: ".5rem 1rem",
              margin: ".5rem",
              border: "solid 1px",
              "&:hover": { color: "#fff" },
            }}
          >
            Obtenir un devis
          </Button>
          <Login />
        </Toolbar>
      </Box>
    </AppBar>
  );
}
