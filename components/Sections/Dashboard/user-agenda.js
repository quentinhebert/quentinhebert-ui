import { Stack } from "@mui/material"
import dayjs from "dayjs"
import { useContext, useEffect, useState } from "react"
import { CalendarContext } from "../../../contexts/CalendarContext"
import { UserContext } from "../../../contexts/UserContext"
import apiCall from "../../../services/apiCalls/apiCall"
import AgendaCalendar, {
  DateEventsPanel,
  EventPanel,
} from "../../Calendar/agenda-calendar"

export default function UserAgenda({}) {
  const { user } = useContext(UserContext)

  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedDate, setSelectedDate] = useState(dayjs().format())
  const [start, setStart] = useState(dayjs().format())
  const [end, setEnd] = useState(dayjs().format())
  const [newEventError, setNewEventError] = useState(false)

  const fetchUserEvents = async () => {
    const res = await apiCall.events.getAllByUser({ userId: user.id })
    if (res && res.ok) {
      const jsonRes = await res.json()
      setEvents(jsonRes)
    } else alert("Problem")
  }

  useEffect(() => {
    fetchUserEvents()
  }, [])

  return (
    <CalendarContext.Provider
      value={{
        selectedEvent,
        setSelectedEvent,
        selectedDate,
        setSelectedDate,
        start,
        setStart,
        end,
        setEnd,
        newEventError,
        setNewEventError,
        fetchUserEvents,
      }}
    >
      <Stack sx={{ flexDirection: "row", gap: 4 }}>
        <AgendaCalendar events={events} />
        {!selectedEvent ? <DateEventsPanel /> : <EventPanel />}
      </Stack>
    </CalendarContext.Provider>
  )
}
