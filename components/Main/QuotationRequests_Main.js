import { Stack } from "@mui/material"
import CenteredMaxWidthContainer from "../Containers/centered-max-width-container"
import BodyText from "../Text/body-text"
import CircleIcon from "@mui/icons-material/Circle"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import apiCall from "../../services/apiCalls/apiCall"
import { formatDayDate } from "../../services/date-time"
import { UserContext } from "../../contexts/UserContext"
import PleaseWait from "../Helpers/please-wait"

const QuotationRequestsCard = ({
  id,
  opened,
  firstname,
  email,
  description,
  date,
}) => (
  <Link href={`/dashboard/quotation-requests/${id}`} passHref>
    <Stack
      component="a"
      sx={{
        border: "0.5px solid #fff",
        padding: 2,
        borderRadius: "10px",
        cursor: "pointer",
        background: opened ? "" : "rgb(198, 144, 14, 0.3)",
        "&:hover": {
          background: (theme) => theme.palette.background.secondary,
        },
      }}
      className="row"
      justifyContent="space-between"
    >
      <Stack flexGrow={1} gap={1}>
        <BodyText fontWeight="bold">
          {firstname || ""} ({email || ""})
        </BodyText>
        <BodyText
          fontStyle="italic"
          color={opened ? "gray" : "rgb(256, 256, 256, 0.7)"}
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {description || ""}
        </BodyText>
      </Stack>
      <Stack minWidth="150px">
        <BodyText textAlign="right">{date || ""}</BodyText>
      </Stack>
      {!opened && <CircleIcon color="secondary" sx={{ marginLeft: "1rem" }} />}
    </Stack>
  </Link>
)

const QuotationRequestsList = ({ list }) => {
  const { user } = useContext(UserContext)

  return (
    <Stack gap={2}>
      {list.map((item) => {
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
            date={formattedDate}
          />
        )
      })}
    </Stack>
  )
}

export default function QuotationRequests_Main(props) {
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

  return (
    <CenteredMaxWidthContainer gap={4}>
      {loading ? <PleaseWait /> : <QuotationRequestsList list={list} />}
    </CenteredMaxWidthContainer>
  )
}
