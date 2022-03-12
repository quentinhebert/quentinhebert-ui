import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import LogoSwitchDropdown from "../Dropdown/logo-switch-dropdown";

export default function NavbarFilm() {
  return (
    <Box sx={{ flexGrow: 2 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#87181f", backgroundImage: "none" }}
      >
        <Toolbar>
          <LogoSwitchDropdown src="/logos/film-logo.png" />
          <Box component="div" sx={{ flexGrow: 1 }} />
          <Button sx={{ backgroundColor: "#fff", color: "#87181f" }}>
            Obtenir un devis
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
