import AppBar from "@mui/material/AppBar"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"

export default function FullWidthTabs({ tabs, activeTab, setActiveTab }) {
  const handleChange = (event, newValue) => setActiveTab(newValue)

  return (
    <AppBar
      position="static"
      sx={{
        borderRadius: "30px",
        background: (theme) => theme.palette.background.main,
      }}
    >
      <Tabs
        value={activeTab}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="#fff"
        variant="fullWidth"
        sx={{ borderRadius: "30px" }}
      >
        {tabs.map((tab, key) => (
          <Tab
            label={tab.label}
            key={key}
            sx={{
              textTransform: "initial",
              color:
                activeTab === key
                  ? (theme) => theme.palette.text.secondary
                  : "#fff",
            }}
          />
        ))}
      </Tabs>
    </AppBar>
  )
}
