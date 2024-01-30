import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import { Stack, useMediaQuery } from "@mui/material"
import { useContext, useEffect, useRef } from "react"
import { Context, STATUS_OPTIONS } from "../module"
import { scrollTo } from "../../../../../services/utils"

export default function StatusTabs() {
  const { state, setState } = useContext(Context)
  const topRef = useRef()

  const isMobileOrTablet = useMediaQuery((theme) =>
    theme.breakpoints.down("sm")
  )

  const didMount = useRef(false)
  useEffect(() => {
    if (didMount.current) {
      if (!!topRef?.current) scrollTo(topRef)
    } else didMount.current = true
  }, [state.tab])

  return (
    <>
      <Stack ref={topRef} sx={{ scrollMarginTop: "40px" }} />

      <Stack
        width="100%"
        position="relative"
        sx={{
          position: "sticky",
          alignSelf: "flex-start",
          top: "55px",
          zIndex: 1,
          background: (theme) => theme.palette.background.main,
        }}
      >
        <Tabs
          value={state.tab}
          onChange={handleChangeTab}
          centered
          allowScrollButtonsMobile
          variant={isMobileOrTablet ? "scrollable" : "standard"}
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            "& .MuiTabs-indicator": {
              backgroundColor: "background.secondary",
            },
            "& .MuiTab-root": {
              textTransform: "capitalize",
              color: "text.white",
            },
            "& .MuiTab-root.Mui-selected": {
              color: "text.secondary",
            },
          }}
        >
          {STATUS_OPTIONS.map((status, key) => {
            return <Tab key={key} label={status.label} />
          })}
        </Tabs>
      </Stack>
    </>
  )

  function handleChangeTab(event, newValue) {
    setState({ ...state, tab: newValue })
  }
}
