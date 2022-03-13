import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "@mui/material";

export default function LogoSwitchDropdown(props) {
  const { src } = props;
  const menuItems = [
    { logo: "/logos/dev-logo.png", domain: "dev", color: "#004fa0" },
    { logo: "/logos/film-logo.png", domain: "film", color: "#87181f" },
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
          <Menu {...bindMenu(popupState)}>
            {menuItems.map((menuItem) => {
              return (
                <Link href={`/${menuItem.domain}`} passHref>
                  <MenuItem
                    onClick={popupState.close}
                    sx={{ backgroundColor: menuItem.color, padding: "1rem" }}
                  >
                    <>
                      <Image src={menuItem.logo} width="50rem" height="50rem" />
                      <Typography
                        variant="text"
                        textAlign="center"
                        textTransform="uppercase"
                        sx={{ marginLeft: 2, color: '#fff' }}
                      >
                        Visiter Polygones / {menuItem.domain}
                      </Typography>
                    </>
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
