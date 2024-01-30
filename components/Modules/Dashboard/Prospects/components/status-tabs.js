import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import { Box, Stack, Typography } from "@mui/material"
import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react"

import { Context } from "../module"
import PROSPECT_STATES, {
  PROSPECT_STATES_ENUM,
} from "../../../../../enums/prospectStates"
import { scrollTo } from "../../../../../services/utils"

export default function StatusTabs() {
  const { state, setState } = useContext(Context)

  const topRef = useRef()

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
        sx={{
          position: "sticky",
          alignSelf: "flex-start",
          top: "55px",
          zIndex: 1,
          background: (theme) => theme.palette.background.main,
        }}
      >
        <Box display="flex" justifyContent="center" width="100%">
          <Tabs
            value={state.tab}
            onChange={handleChangeTab}
            allowScrollButtonsMobile
            variant="scrollable"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              "& .MuiTabs-indicator": {
                backgroundColor: "background.secondary",
              },
              "& .MuiTab-root": {
                minWidth: 0,
                fontSize: { xs: "1.5rem", md: "1.1rem" },
                textTransform: "capitalize",
                color: "text.white",
              },
              "& .MuiTab-root.Mui-selected": {
                color: "text.secondary",
              },
              ".MuiTabs-scrollButtons.Mui-disabled": {
                opacity: 0.3,
              },
            }}
          >
            {PROSPECT_STATES_ENUM.map((status, key) => {
              const Icon = () => PROSPECT_STATES[status].icon
              const Label = () => (
                <Stack className="row flex-center" gap={1}>
                  <Icon />
                  <Typography
                    display={{ xs: "none", md: "flex" }}
                    fontSize=".8rem"
                  >
                    {PROSPECT_STATES[status].label}
                  </Typography>
                </Stack>
              )
              return (
                <Tab
                  key={key}
                  label={<Label />}
                  sx={{
                    color: (theme) =>
                      `${
                        theme.alert.title[PROSPECT_STATES[status].severity]
                          .color
                      } !important`,
                  }}
                />
              )
            })}
          </Tabs>
        </Box>
      </Stack>
    </>
  )

  function handleChangeTab(event, newValue) {
    setState({ ...state, tab: newValue })
  }
}
