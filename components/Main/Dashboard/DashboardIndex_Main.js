import { Stack } from "@mui/material"
import FixedBackground from "../../Backgrounds/fixed-background"
import { useRouter } from "next/router"
import OneActionBubblesGrid from "../../Cards/one-action-bubbles-grid"
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined"
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined"
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined"
import TaskIcon from "@mui/icons-material/Task"
import NewDocModule from "../../Sections/Dashboard/new-doc-module"
import KpiModule, { TurnoverModule } from "../../Sections/Dashboard/kpi-module"
import LeaderboardIcon from "@mui/icons-material/Leaderboard"
import { useEffect, useState } from "react"
import EuroIcon from "@mui/icons-material/Euro"
import Orders_Main from "../Orders/Orders_Main"
import QuotationRequests_Main from "../QuotationRequests_Main"
import apiCall from "../../../services/apiCalls/apiCall"
import EventIcon from "@mui/icons-material/Event"
import useSWR from "swr"
import UserAgenda from "../../Sections/Dashboard/user-agenda"
import BalanceSection from "../../Sections/Dashboard/balance-section"

export default function AdminIndex_Main() {
  const router = useRouter()
  const queryTab = router.query.active_tab
  const defaultTab = "stats"

  const [activeTab, setActiveTab] = useState(queryTab ? queryTab : defaultTab)

  useEffect(() => {
    setActiveTab(queryTab ? queryTab : defaultTab)
  }, [router])

  const fetchNotifications = async () => {
    const res = await apiCall.dashboard.notifications.get()
    if (res && res.ok) {
      const jsonRes = await res.json()
      return jsonRes
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  /********** SWR revalidation **********/
  let notifications = {}
  const swr = useSWR(
    `dashboardNotifications`,
    async () => fetchNotifications(),
    {
      fallbackData: notifications,
      revalidateOnMount: true,
    }
  )
  if (!!swr.data) notifications = swr.data

  const navigate = (newTab) =>
    router.push(`${router.basePath}?active_tab=${newTab}`, undefined, {
      scroll: false,
    })

  const CARDS = [
    {
      id: "stats",
      title: "Stats",
      icon: <LeaderboardIcon className="full-width full-height" />,
      onClick: () => navigate("stats"),
      notifications: 0,
    },
    {
      id: "prospects",
      title: "Prospects",
      icon: <MarkEmailUnreadOutlinedIcon className="full-width full-height" />,
      onClick: () => navigate("prospects"),
      notifications: notifications?.quotation_requests || 0,
    },
    {
      id: "orders",
      title: "Commandes",
      icon: <WorkOutlineOutlinedIcon className="full-width full-height" />,
      onClick: () => navigate("orders"),
      notifications: 0,
    },
    {
      id: "calendar",
      title: "Agenda",
      icon: <EventIcon className="full-width full-height" />,
      onClick: () => navigate("calendar"),
      notifications: 0,
    },
    {
      id: "balance",
      title: "Solde",
      icon: <EuroIcon className="full-width full-height" />,
      onClick: () => navigate("balance"),
      notifications: 0,
    },
  ]

  return (
    <>
      <FixedBackground url="url(/medias/lines.jpg)" />

      <Stack zIndex={0} gap={4}>
        <OneActionBubblesGrid cards={CARDS} activeTab={activeTab} />

        {(activeTab === "stats" || !activeTab) && (
          <>
            <KpiModule />
            <TurnoverModule />
          </>
        )}
        {activeTab === "calendar" && <UserAgenda />}
        {activeTab === "prospects" && <QuotationRequests_Main />}
        {activeTab === "orders" && <Orders_Main />}
        {activeTab === "balance" && <BalanceSection />}
      </Stack>
    </>
  )
}
