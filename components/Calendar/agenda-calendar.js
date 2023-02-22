import { useContext, useEffect, useState } from "react"
import { Calendar } from "@mantine/dates"
import { Indicator } from "@mantine/core"
import fr from "dayjs/locale/fr"
import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween.js"
import theme from "../../config/theme"
import { Button, Stack, Typography, useMediaQuery } from "@mui/material"
import CustomFilledInput from "../Inputs/custom-filled-input"
import apiCall from "../../services/apiCalls/apiCall"
import { UserContext } from "../../contexts/UserContext"
import BodyText from "../Text/body-text"
import { convertDateToLongString } from "../../services/date-time"
import PleaseWait from "../Helpers/please-wait"
import { CalendarContext } from "../../contexts/CalendarContext"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import AddIcon from "@mui/icons-material/Add"
import CustomDatePicker from "../Inputs/custom-date-picker"
import DualInputLine from "../Containers/dual-input-line"
import SwitchButton from "../Inputs/switch-button"
import DeleteIcon from "@mui/icons-material/Delete"
import CustomFilledTextArea from "../Inputs/custom-filled-text-area"
import CustomFilledSelect from "../Inputs/custom-filled-select"
import CustomSelectOption from "../Inputs/custom-select-option"
import withConfirmAction from "../hocs/withConfirmAction"
import { AppContext } from "../../contexts/AppContext"
dayjs.extend(isBetween)

const styles = {
  calendarBase: {
    background: theme.palette.background.main,
  },
  calendarHeaderLevel: {
    color: "#fff",
    "&:hover": {
      background: "rgb(0,0,0,0.5)",
    },
  },
  day: {
    color: "#fff",
    "&:hover": {
      color: "#000",
    },
    "&[data-weekend]": { color: theme.palette.text.secondary },
    "&[data-outside]": { color: theme.palette.text.grey },
    "&[data-selected]": {
      background: "white",
      color: "#000 !important",
      "&:hover": {
        background: "#fff",
      },
    },
  },
  calendarHeaderControl: {
    background: theme.palette.secondary.main,
    color: "#000",
    "&:hover": {
      background: theme.palette.secondary.main,
      opacity: 0.5,
    },
  },
}

export default function AgendaCalendar({ events }) {
  const xs = useMediaQuery((theme) => theme.breakpoints.up("xs"))
  const sm = useMediaQuery((theme) => theme.breakpoints.up("sm"))
  const md = useMediaQuery((theme) => theme.breakpoints.up("md"))
  const lg = useMediaQuery((theme) => theme.breakpoints.up("lg"))

  const {
    setSelectedDate,
    setSelectedEvent,
    selectedEvent,
    start,
    end,
    newEventError,
  } = useContext(CalendarContext)

  const [value, setValue] = useState(null)

  const onChange = (newValue) => {
    setSelectedEvent(null)
    setValue(newValue)
    if (!!setSelectedDate)
      setSelectedDate(dayjs(newValue).format().split("T")[0])
  }

  const isRangeEvent = (date) =>
    events.filter(
      (event) =>
        dayjs(date).isBetween(dayjs(event.start), dayjs(event.end), "day") ||
        (dayjs(date).isSame(dayjs(event.start), "day") &&
          event.start.split("T")[0] !== event.end.split("T")[0]) ||
        (dayjs(date).isSame(dayjs(event.end), "day") &&
          event.start.split("T")[0] !== event.end.split("T")[0])
    ).length

  const isNewEvent = (date) =>
    !newEventError &&
    (dayjs(date).isBetween(dayjs(start), dayjs(end), "day") ||
      dayjs(date).isSame(dayjs(start), "day") ||
      dayjs(date).isSame(dayjs(end), "day"))

  const isEvent = (date) =>
    events.filter(
      (event) =>
        event.start.split("T")[0] === dayjs(date).format().split("T")[0] &&
        event.start.split("T")[0] === event.end.split("T")[0]
    ).length

  return (
    <Calendar
      //   initialMonth={new Date(2022, 5)}
      allowLevelChange={false}
      locale={fr}
      previousMonthLabel={true}
      styles={styles}
      value={value}
      onChange={onChange}
      size={lg ? "md" : md ? "xl" : sm ? "lg" : xs ? "md" : "xs"}
      renderDay={(date) => {
        const day = date.getDate()

        const hasEvent = isEvent(date)
        const hasRangeEvent = isRangeEvent(date)
        const isToday = dayjs().isSame(dayjs(date), "day")

        return (
          <div
            style={{
              border:
                isNewEvent(date) && !!selectedEvent ? "1px solid #fff" : "0px",
              background: isToday
                ? theme.palette.secondary.main
                : hasRangeEvent
                ? "rgb(0,0,0,0.5)"
                : "",
              color: isToday ? "#000" : null,
            }}
          >
            <Indicator size={8} color={"red"} offset={10} disabled={!hasEvent}>
              <div>{day}</div>
            </Indicator>
          </div>
        )
      }}
    />
  )
}

export const EventPanel = withConfirmAction(
  ({
    setActionToFire,
    setOpenConfirmModal,
    setConfirmTitle,
    setNextButtonText,
    setConfirmContent,
  }) => {
    const {
      selectedEvent,
      setSelectedEvent,
      selectedDate,
      setSelectedDate,
      setStart,
      start,
      setEnd,
      end,
      setNewEventError,
      newEventError,
      fetchUserEvents,
    } = useContext(CalendarContext)

    const { setSnackMessage, setSnackSeverity } = useContext(AppContext)
    const { user } = useContext(UserContext)

    const TYPE_OPTIONS = [
      { id: "DELIVERY", label: "Livraison" },
      { id: "MISSION", label: "Prestation" },
      { id: "APPOINTMENT", label: "Rendez-vous" },
    ]

    const [event, setEvent] = useState({
      id: null,
      start: selectedDate,
      end: selectedDate,
      label: "",
      description: "",
      type: TYPE_OPTIONS[1].id,
    })
    const [manyDays, setManyDays] = useState(false)

    const fetchEvent = async () => {
      if (!selectedEvent.id) return
      const res = await apiCall.events.get({
        id: selectedEvent.id,
      })
      if (res && res.ok) {
        const jsonRes = await res.json()
        setEvent({
          ...jsonRes,
          start: dayjs(jsonRes.start).format(),
          end: dayjs(jsonRes.end).format(),
        })
      }
    }

    useEffect(() => {
      fetchEvent()
    }, [selectedEvent.id])
    useEffect(() => {
      setEvent({ ...event, end: event.start })
      setEnd(start)
    }, [manyDays])
    useEffect(() => {
      setNewEventError(dayjs(end).isBefore(dayjs(start)))
    }, [start, end])

    const handleError = () => {
      setSnackMessage("Une erreur est survenue...")
      setSnackSeverity("error")
    }
    const handleSuccess = (text) => {
      setSnackMessage(text)
      setSnackSeverity("success")
    }
    const handleChange = (attribute) => (e) => {
      setEvent({
        ...event,
        [attribute]: e.target.value,
      })
    }
    const updateEvent = async () => {
      const res = await apiCall.events.update({ event })
      if (res && res.ok) {
        handleSuccess("Enregistré !")
        await fetchUserEvents()
        setSelectedEvent(null)
      } else handleError()
    }
    const createEvent = async () => {
      const res = await apiCall.events.create({ event })
      if (res && res.ok) {
        handleSuccess("Ajouté !")
        await fetchUserEvents()
        setSelectedEvent(null)
      } else handleError()
    }
    const handleUpsert = async () => {
      if (!!event.id) return await updateEvent()
      return await createEvent()
    }
    const deleteEvent = async () => {
      const res = await apiCall.events.delete(event)
      if (res && res.ok) {
        handleSuccess("Supprimé !")
        await fetchUserEvents()
        setSelectedEvent(null)
      } else handleError()
    }
    const handleDelete = () => {
      setActionToFire(() => async () => await deleteEvent())
      setOpenConfirmModal(true)
      setConfirmTitle("Supprimer un événement")
      setNextButtonText("Suprimmer")
      setConfirmContent({
        text: "Voulez-vous vraiment supprimer cet événement ?",
      })
    }
    const handleChangeStart = (newValue) => {
      if (!manyDays) {
        setEvent({
          ...event,
          start: dayjs(newValue).format(),
          end: dayjs(newValue).format(),
        })
        setEnd(dayjs(newValue).format())
        setStart(dayjs(newValue).format())
      } else {
        setEvent({ ...event, start: dayjs(newValue).format() })
        setStart(dayjs(newValue).format())
      }
    }
    const handleChangeEnd = (newValue) => {
      setEvent({ ...event, end: newValue })
      setEnd(newValue)
    }

    return (
      <Stack
        width="100%"
        padding={4}
        gap={4}
        sx={{
          background: (theme) => theme.palette.background.main,
          borderRadius: "30px",
        }}
      >
        <Stack
          className="row"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          sx={{ position: "relative" }}
        >
          <Button
            onClick={() => setSelectedEvent(null)}
            variant="outlined"
            startIcon={<ArrowBackIosIcon />}
            color="secondary"
            sx={{
              borderRadius: "30px",
              borderColor: "transparent",
            }}
          >
            Retour
          </Button>
          <BodyText
            preventTransition
            textAlign="center"
            fontSize="1.2rem"
            textTransform="capitalize"
          >
            {!!selectedDate.id
              ? convertDateToLongString(dayjs(selectedDate).format())
              : "Nouvel événement"}
          </BodyText>
          <Button
            onClick={handleUpsert}
            variant="outlined"
            color="secondary"
            sx={{
              borderRadius: "30px",
              borderColor: "transparent",
            }}
          >
            Enregistrer
          </Button>
        </Stack>

        <Stack gap={2}>
          <CustomFilledInput
            type="input"
            id="label"
            label="Titre"
            value={event.label}
            onChange={handleChange("label")}
          />

          <Stack className="row" alignItems="center">
            <BodyText preventTransition fontSize="1rem" marginRight="0.75rem">
              Un jour
            </BodyText>
            <SwitchButton
              label="Plusieurs jours"
              handleCheck={setManyDays}
              checked={manyDays}
            />
          </Stack>

          <DualInputLine>
            <Stack width="50%">
              <CustomDatePicker
                // noPicker
                label="Du"
                value={event.start}
                handleChange={handleChangeStart}
              />
            </Stack>
            <Stack width="50%">
              <CustomDatePicker
                disabled={!manyDays}
                // noPicker
                label="Jusqu'au"
                value={event.end}
                handleChange={handleChangeEnd}
                error={newEventError}
              />
            </Stack>
          </DualInputLine>

          <CustomFilledTextArea
            type="input"
            id="description"
            label="Description"
            value={event.description}
            onChange={handleChange("description")}
          />

          <CustomFilledSelect
            required
            id="budget"
            value={event.type}
            onChange={handleChange("type")}
            renderValue={
              // Trick for placeholder hiding
              event.type !== ""
                ? undefined
                : () => <Typography>Type</Typography>
            }
          >
            {TYPE_OPTIONS.map((option, key) => (
              <CustomSelectOption value={option.id} key={key}>
                {option.label}
              </CustomSelectOption>
            ))}
          </CustomFilledSelect>

          <Button
            onClick={handleDelete}
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{
              marginTop: "1rem",
              borderColor: "transparent",
            }}
          >
            Supprimer
          </Button>
        </Stack>
      </Stack>
    )
  }
)

export function DateEventsPanel({}) {
  // WARNING: selectedDate must be of the form: yyyy-mm-dd

  const { user } = useContext(UserContext)
  const { selectedDate, setSelectedEvent } = useContext(CalendarContext)

  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchEvents = async () => {
    if (!selectedDate) return
    setLoading(true)
    const res = await apiCall.events.getDateEventsByUser({
      userId: user.id,
      date: selectedDate,
    })
    if (res && res.ok) {
      const jsonRes = await res.json()
      setEvents(jsonRes)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchEvents()
  }, [selectedDate])

  return (
    <Stack
      width="100%"
      padding={4}
      gap={4}
      sx={{
        background: (theme) => theme.palette.background.main,
        borderRadius: "30px",
      }}
    >
      <Stack className="row flex-center" sx={{ position: "relative" }}>
        <BodyText
          preventTransition
          textAlign="center"
          fontSize="1.2rem"
          textTransform="capitalize"
        >
          {selectedDate
            ? convertDateToLongString(dayjs(selectedDate).format())
            : null}
        </BodyText>
        <Button
          onClick={() => setSelectedEvent({})}
          variant="outlined"
          color="secondary"
          startIcon={<AddIcon />}
          sx={{
            borderRadius: "30px",
            borderColor: "transparent",
            position: "absolute",
            right: 0,
          }}
        >
          Ajouter
        </Button>
      </Stack>

      <Stack gap={2}>
        {loading ? (
          <PleaseWait />
        ) : !!events?.length ? (
          events.map((event, key) => (
            <Stack
              width="100%"
              onClick={
                !!setSelectedEvent ? () => setSelectedEvent(event) : () => {}
              }
              sx={{
                cursor: "pointer",
                background: "rgb(0,0,0,0.5)",
                padding: "1rem 2rem",
                borderRadius: "30px",
                "&:hover": {
                  background: "rgb(0,0,0,0.7)",
                },
              }}
            >
              <BodyText key={key}>{event.label}</BodyText>
            </Stack>
          ))
        ) : (
          <BodyText preventTransition>Aucun événement</BodyText>
        )}
      </Stack>
    </Stack>
  )
}
