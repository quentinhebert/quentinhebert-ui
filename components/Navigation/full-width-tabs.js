import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import { Badge, Box, Stack } from "@mui/material"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"

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
            label={
              <Stack flexDirection="row" gap={1} alignItems="center">
                {tab.label}
                {tab.badge > 0 && (
                  <Badge
                    badgeContent={tab.badge}
                    color="secondary"
                    sx={{
                      marginLeft: 1,
                      "& .MuiBadge-badge": {
                        right: 0,
                        top: "50%",
                      },
                    }}
                  />
                )}
                {tab.warning && <ErrorOutlineIcon />}
              </Stack>
            }
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
