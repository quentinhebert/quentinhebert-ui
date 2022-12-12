import { Stack } from "@mui/material"
import FixedBackground from "../../Backgrounds/fixed-background"
import { useRouter } from "next/router"
import OneActionBubblesGrid from "../../Cards/one-action-bubbles-grid"
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined"
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined"
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined"
import TaskIcon from "@mui/icons-material/Task"
import NewDocModule from "../../Sections/Dashboard/new-doc-module"
import KpiModule from "../../Sections/Dashboard/kpi-module"
import LeaderboardIcon from "@mui/icons-material/Leaderboard"
import { useEffect, useState } from "react"
import Quotations_Main from "../Quotations/Quotations_Main"
import QuotationRequests_Main from "../QuotationRequests_Main"
import apiCall from "../../../services/apiCalls/apiCall"
import NoteAddIcon from "@mui/icons-material/NoteAdd"
import EventIcon from "@mui/icons-material/Event"
import useSWR from "swr"
import UserAgenda from "../../Sections/Dashboard/user-agenda"
import AddIcon from "@mui/icons-material/Add"

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
      href: "/dashboard/orders",
      notifications: 0,
    },
    {
      id: "invoices",
      title: "Factures",
      icon: <DescriptionOutlinedIcon className="full-width full-height" />,
      href: "/dashboard/invoices",
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
      id: "quotations",
      title: "Devis",
      icon: <TaskIcon className="full-width full-height" />,
      onClick: () => navigate("quotations"),
      notifications: 0,
    },
    {
      id: "new_document",
      title: "Créer",
      icon: <AddIcon className="full-width full-height" />,
      onClick: () => navigate("new_document"),
      notifications: 0,
    },
  ]

  return (
    <>
      <FixedBackground url="url(/medias/lines.jpg)" />

      <Stack zIndex={0} gap={4}>
        <OneActionBubblesGrid cards={CARDS} activeTab={activeTab} />

        {(activeTab === "stats" || !activeTab) && <KpiModule />}
        {activeTab === "calendar" && <UserAgenda />}
        {activeTab === "prospects" && <QuotationRequests_Main />}
        {activeTab === "quotations" && <Quotations_Main />}
        {activeTab === "new_document" && <NewDocModule />}
      </Stack>
    </>
  )
}
