import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import { Box } from "@mui/material"

export default function FullWidthTabs({ tabs, activeTab, setActiveTab }) {
  const handleChange = (event, newValue) => setActiveTab(newValue)

  return (
    <Box
      sx={{
        width: "100%",
        background: (theme) => theme.palette.background.main,
        borderRadius: "30px",
      }}
    >
      <Tabs
        value={activeTab}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="#fff"
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        sx={{
          borderRadius: "30px",
          "& .MuiTabScrollButton-root": {
            color: (theme) => theme.palette.text.secondary,
          },
          "& .MuiTabs-scroller": {
            flex: "unset",
            margin: "auto",
          },
        }}
      >
        {tabs.map((tab, key) => (
          <Tab
            label={tab.label}
            key={key}
            disableRipple={true}
            sx={{
              textTransform: "initial",
              letterSpacing: 1,
              color:
                activeTab === key
                  ? (theme) => theme.palette.text.secondary
                  : "grey",
            }}
          />
        ))}
      </Tabs>
    </Box>
  )
}
