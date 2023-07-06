import { Tab, Tabs } from "@mui/material"

export default function CustomTabs({ value, onChange, ...props }) {
  return (
    <Tabs
      value={value}
      onChange={onChange}
      textColor="#fff"
      indicatorColor="transparent"
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
      sx={{
        "& .MuiTabs-scroller": {
          display: "flex",
        },
      }}
      {...props}
    />
  )
}

export function CustomTab({ label, disabled, ...props }) {
  return (
    <Tab
      label={label}
      id={`tab-${label}`}
      aria-controls={`tabpanel-${label}`}
      sx={{
        borderRadius: "30px",
        textTransform: "capitalize",
        padding: 1,
        "&.MuiTab-root": {
          minHeight: "",
          minWidth: "40px",
          padding: ".5rem 1rem",
          display: "flex",
          margin: "auto .25rem",
          background: "rgb(256, 256, 256, 0.015)",
        },
        "&.Mui-selected": {
          background: (theme) => theme.palette.secondary.main,
          color: "#000",
          fontWeight: "bold",
        },
        "&.Mui-disabled": {
          color: "rgb(256,256,256,0.1) !important",
          background: "transparent",
        },
      }}
      disabled={disabled}
      {...props}
    />
  )
}
