import { useContext, useEffect, useState } from "react"
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  timelineItemClasses,
} from "@mui/lab"
import { Stack, Typography } from "@mui/material"
import ErrorIcon from "@mui/icons-material/Error"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import dynamic from "next/dynamic"
const ReactJson = dynamic(() => import("react-json-view"), { ssr: false })

import {
  Context,
  DocumentHeader,
  DocumentType,
  FormCard,
} from "../../../module"
import { UserContext } from "../../../../../../../contexts/UserContext"
import apiCall from "../../../../../../../services/apiCalls/apiCall"
import { LOG_CONTENT } from "../../../../../../../services/logs"
import CustomAccordion from "../../../../../../Containers/custom-accordion"
import { formatDayDate } from "../../../../../../../services/date-time"
import PleaseWait from "../../../../../../Helpers/please-wait"

export default function LogsSection() {
  const { state } = useContext(Context)
  const user = useContext(UserContext)

  const [logs, setLogs] = useState([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    fetchLogs()
  }, [])

  return (
    <Stack width="100%" gap={2}>
      <FormCard>
        <Stack gap={2}>
          <DocumentHeader>
            <DocumentType>Historique</DocumentType>
          </DocumentHeader>

          {fetching && <PleaseWait />}

          {!fetching && (!logs.length || logs.length === 0) && (
            <Typography color="text.grey">Rien pour le moment.</Typography>
          )}

          <Timeline
            sx={{
              "&.MuiTimeline-root": {
                padding: "0",
              },
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
          >
            {logs.map((log, key) => (
              <TimelineItem key={key}>
                <TimelineSeparator sx={{ margin: "1.25rem 0 0" }}>
                  {getIcon({ severity: log.severity })}
                  <TimelineConnector />
                </TimelineSeparator>

                <TimelineContent sx={{ py: "12px", px: 2 }}>
                  <Typography color="grey" fontSize="0.8rem">
                    {formatDayDate({
                      timestamp: log.created_at,
                      timezone: user.timezone,
                    })}
                  </Typography>

                  <Typography
                    variant="h6"
                    component="span"
                    sx={{
                      color: (theme) => theme.alert.title[log.severity].color,
                    }}
                  >
                    {LOG_CONTENT[log?.metadata?.event]?.label}
                  </Typography>

                  <Typography color="grey" my={1}>
                    {LOG_CONTENT[log?.metadata?.event]?.description(
                      log.metadata
                    )}
                  </Typography>

                  <CustomAccordion title="Metadata">
                    <Stack overflow="auto" width="100%">
                      <ReactJson
                        indentWidth={1.5}
                        displayDataTypes={false}
                        src={log?.metadata}
                        theme="pop"
                        enableClipboard={false}
                        style={{
                          zIndex: 0,
                          padding: "1rem .5rem",
                          borderRadius: "10px",
                          fontSize: "0.8rem",
                          cursor: "text",
                          wordBreak: "break-all",
                        }}
                      />
                    </Stack>
                  </CustomAccordion>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Stack>
      </FormCard>
    </Stack>
  )

  async function fetchLogs() {
    const res = await apiCall.orders.getLogs({ id: state.order.id })
    if (res?.ok) {
      const jsonRes = await res.json()
      setLogs(jsonRes)
    }
    setFetching(false)
  }
  function getIcon({ severity }) {
    return (
      <TimelineDot
        sx={{ background: (theme) => theme.alert.title[severity].background }}
      >
        {severity === "success" ? (
          <CheckCircleIcon
            sx={{ color: (theme) => theme.alert.title[severity].color }}
          />
        ) : null}
        {severity === "error" ? (
          <ErrorIcon
            sx={{ color: (theme) => theme.alert.title[severity].color }}
          />
        ) : null}
      </TimelineDot>
    )
  }
}
