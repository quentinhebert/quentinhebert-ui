import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Image from "next/image";
import Link from "next/link";

export default function LogoSwitchDropdown(props) {
  const { src } = props;
  const menuItems = [
    { logo: "/logos/dev-logo-band.png", domain: "dev", color: "#004fa0" },
    { logo: "/logos/film-logo-band.png", domain: "film", color: "#87181f" },
  ];
  return (
    <PopupState variant="popover" popupId="popup-menu">
      {(popupState) => (
        <>
          <Button
            variant="contained"
            {...bindTrigger(popupState)}
            sx={{
              backgroundColor: "transparent",
              boxShadow: "none",
              padding: ".75rem",
              "&:hover": {
                backgroundColor: "transparent",
                backgroundImage: "none",
                boxShadow: "none",
              },
            }}
          >
            <Image src={src} width="60rem" height="60rem" />
          </Button>
          <Menu {...bindMenu(popupState)} sx={{ padding: 0 }}>
            {menuItems.map((menuItem, key) => {
              return (
                <Link key={key} href={`/${menuItem.domain}`} passHref>
                  <MenuItem
                    onClick={popupState.close}
                    sx={{
                      backgroundColor: menuItem.color,
                      padding: ".5rem 1rem",
                    }}
                  >
                    <Image src={menuItem.logo} width="50rem" height="25rem" />
                  </MenuItem>
                </Link>
              );
            })}
          </Menu>
        </>
      )}
    </PopupState>
  );
}
