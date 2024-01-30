import { Stack } from "@mui/material"
import { useRouter } from "next/router"
import OneActionBubblesGrid from "../../Cards/one-action-bubbles-grid"
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined"
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined"
import LeaderboardIcon from "@mui/icons-material/Leaderboard"
import { useEffect, useState } from "react"
import EuroIcon from "@mui/icons-material/Euro"
import QuotationRequests_Main from "../QuotationRequests_Main"
import apiCall from "../../../services/apiCalls/apiCall"
import EventIcon from "@mui/icons-material/Event"
import useSWR from "swr"
import UserAgenda from "../../Sections/Dashboard/user-agenda"
import BalanceSection from "../../Sections/Dashboard/balance-section"
import StatsModule from "../../Sections/Dashboard/kpi-module"
import OrdersModule from "../../Modules/Dashboard/Orders/module"
import ProspectsModule from "../../Modules/Dashboard/Prospects/module"

export default function AdminIndex_Main() {
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

  const router = useRouter()
  const queryTab = router.query.active_tab
  const defaultTab = "stats"
  const CARDS = populateCards()

  const [activeTab, setActiveTab] = useState(queryTab ? queryTab : defaultTab)

  useEffect(() => {
    setActiveTab(queryTab ? queryTab : defaultTab)
  }, [router])

  useEffect(() => {
    fetchNotifications()
  }, [])

  return (
    <Stack zIndex={0} gap={4}>
      <OneActionBubblesGrid cards={CARDS} activeTab={activeTab} />

      {(activeTab === "stats" || !activeTab) && <StatsModule />}
      {/* {activeTab === "prospects" && <QuotationRequests_Main />} */}
      {activeTab === "prospects" && <ProspectsModule />}
      {activeTab === "orders" && <OrdersModule />}
      {activeTab === "calendar" && <UserAgenda />}
      {activeTab === "balance" && <BalanceSection />}
    </Stack>
  )

  async function fetchNotifications() {
    const res = await apiCall.dashboard.notifications.get()
    if (res && res.ok) {
      const jsonRes = await res.json()
      return jsonRes
    }
  }
  function navigate(newTab) {
    return router.push(`${router.basePath}?active_tab=${newTab}`, undefined, {
      scroll: false,
    })
  }
  function populateCards() {
    return [
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
        icon: (
          <MarkEmailUnreadOutlinedIcon className="full-width full-height" />
        ),
        onClick: () => navigate("prospects"),
        notifications: notifications?.prospects || 0,
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
  }
}
