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
    { logo: "/logos/dev-logo.png", domain: "dev", color: "#004fa0" },
    { logo: "/logos/film-logo.png", domain: "film", color: "#87181f" },
  ];
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button
            variant="contained"
            {...bindTrigger(popupState)}
            sx={{
              backgroundColor: "transparent",
              boxShadow: "none",
              "&:hover": { backgroundColor: "transparent", boxShadow: "none" },
            }}
          >
            <Image src={src} width="100rem" height="100rem" />
          </Button>
          <Menu {...bindMenu(popupState)}>
            {menuItems.map((menuItem) => {
              return (
                <Link href={`/${menuItem.domain}`} passHref>
                  <MenuItem
                    onClick={popupState.close}
                    sx={{ backgroundColor: menuItem.color }}
                  >
                    <>
                      <Image
                        src={menuItem.logo}
                        width="100rem"
                        height="100rem"
                      />{" "}
                      Visiter Polygones.{menuItem.domain}
                    </>
                  </MenuItem>
                </Link>
              );
            })}
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
