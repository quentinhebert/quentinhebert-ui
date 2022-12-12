import { Box, Stack } from "@mui/material"
import BodyText from "../Text/body-text"
import CircleIcon from "@mui/icons-material/Circle"
import { useContext, useEffect, useState } from "react"
import apiCall from "../../services/apiCalls/apiCall"
import { formatDayDate } from "../../services/date-time"
import { UserContext } from "../../contexts/UserContext"
import PleaseWait from "../Helpers/please-wait"
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined"
import Pill from "../Text/pill"
import RefreshButton from "../Buttons/refresh-button"
import DropdownOptions from "../Dropdown/dropdown-options"
import { useRouter } from "next/router"
import { AppContext } from "../../contexts/AppContext"
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"

const QuotationRequestsCard = ({
  id,
  opened,
  firstname,
  email,
  description,
  date,
  services,
  refreshData,
}) => {
  const router = useRouter()
  const { setSnackMessage, setSnackSeveerity } = useContext(AppContext)

  const markAsRead = async () => {
    const res = await apiCall.quotations.requests.setOpened({
      id,
      opened: true,
    })
    if (!res || !res.ok) {
      setSnackMessage("Une erreur s'est produite")
      setSnackSeveerity("error")
    }
    refreshData()
  }

  const markAsUnread = async () => {
    const res = await apiCall.quotations.requests.setOpened({
      id,
      opened: false,
    })
    if (!res || !res.ok) {
      setSnackMessage("Une erreur s'est produite")
      setSnackSeveerity("error")
    }
    refreshData()
  }

  const options = [
    {
      label: opened ? "Marquer comme non lue" : "Marquer comme lue",
      handleClick: opened ? markAsUnread : markAsRead,
      icon: <MarkEmailUnreadIcon />,
    },
    {
      label: "Ouvrir dans un nouvel onglet",
      handleClick: () =>
        window.open(`/dashboard/quotation-requests/${id}`, "_blank").focus(),
      icon: <OpenInNewIcon />,
    },
  ]

  return (
    <Stack
      sx={{
        flexDirection: "column",
        padding: "1rem 2rem",
        gap: 2,
        borderRadius: "30px",
        background: opened ? "rgb(0,0,0,0.3)" : "rgb(198, 144, 14, 0.2)",
        "&:hover": {
          background: opened ? "rgb(0,0,0,0.5)" : "rgb(198, 144, 14, 0.5)",
        },
      }}
      justifyContent="space-between"
    >
      <Stack className="row" alignItems="center">
        {!opened && (
          <CircleIcon color="secondary" sx={{ marginRight: "1rem" }} />
        )}
        <BodyText textAlign="right" preventTransition>
          {date || ""}
        </BodyText>

        <Stack flexGrow={1} />

        <DropdownOptions options={options} />
      </Stack>

      <Stack
        onClick={(e) => router.push(`/dashboard/quotation-requests/${id}`)}
        flexGrow={1}
        sx={{
          cursor: "pointer",
          display: "box",
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        <BodyText fontWeight="bold" preventTransition>
          {firstname || ""}{" "}
          <Box
            component="span"
            fontSize="1rem"
            sx={{
              color: (theme) => "rgb(256, 256, 256, 0.7)",
            }}
          >
            {email || ""}
          </Box>
        </BodyText>

        <BodyText
          color={opened ? "gray" : "rgb(256, 256, 256, 0.7)"}
          fontSize="1rem"
          preventTransition
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {description || ""}
        </BodyText>
      </Stack>

      <Stack className="row" gap={1}>
        {services.map((service, key) => (
          <Pill
            key={key}
            margin="0rem"
            padding="0 0.75rem"
            preventTransition
            bgColor={(theme) => theme.alert.title["disabled"].background}
            border="1px solid"
            borderColor={(theme) => theme.alert.title["disabled"].color}
          >
            <BodyText
              fontSize="0.8rem"
              color={(theme) => theme.alert.title["disabled"].color}
              preventTransition
            >
              {service}
            </BodyText>
          </Pill>
        ))}
      </Stack>
    </Stack>
  )
}

export default function QuotationRequests_Main({}) {
  const { user } = useContext(UserContext)

  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  // FETCH
  const fetchData = async () => {
    setLoading(true)
    const res = await apiCall.quotations.requests.getAll()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setList(jsonRes)
    }
    setLoading(false)
  }

  // Initial fetch
  useEffect(() => {
    fetchData()
  }, [])

  const newNotifList = list.filter((item) => item.opened === false)

  return (
    <Stack
      gap={4}
      sx={{
        background: (theme) => theme.palette.background.main,
        borderRadius: "30px",
      }}
      padding="2rem"
    >
      <BodyText
        className="inline-flex gap-10"
        alignItems="center"
        fontSize="1.5rem"
        lineHeight="2rem"
        textAlign="center"
        preventTransition
      >
        <MarkEmailUnreadOutlinedIcon sx={{ fontSize: "2rem" }} /> Demandes de
        contact {newNotifList.length ? `(${newNotifList.length})` : null}
      </BodyText>

      <Stack width="100%" alignItems="end">
        <RefreshButton refresh={fetchData} />
      </Stack>

      <Stack gap={2}>
        {!!list?.length &&
          list.map((item) => {
            // Format date
            const formattedDate = formatDayDate({
              timestamp: item.created_at,
              timezone: user.timezone,
            })

            return (
              <QuotationRequestsCard
                key={item.id}
                id={item.id}
                opened={item.opened}
                firstname={item.firstname}
                email={item.email}
                description={item.description}
                services={item.services}
                date={formattedDate}
                refreshData={fetchData}
              />
            )
          })}
      </Stack>
    </Stack>
  )
}
