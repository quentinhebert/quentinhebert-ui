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

const TABS = {
  stats: 0,
  prospects: 1,
  orders: 2,
  quotations: 3,
  invoices: 4,
  new_document: 5,
  calendar: 6,
}

export default function AdminIndex_Main() {
  const router = useRouter()
  const active_tab = router.query.active_tab

  const [tab, setTab] = useState(active_tab ? TABS[active_tab] : 0)

  useEffect(() => {
    setTab(active_tab ? TABS[active_tab] : 0)
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

  const CARDS = [
    {
      title: "Stats",
      icon: <LeaderboardIcon className="full-width full-height" />,
      onClick: () => router.push(`${router.basePath}?active_tab=stats`),
      notifications: 0,
    },
    {
      title: "Prospects",
      icon: <MarkEmailUnreadOutlinedIcon className="full-width full-height" />,
      onClick: () => router.push(`${router.basePath}?active_tab=prospects`),
      notifications: notifications?.quotation_requests || 0,
    },
    {
      title: "Commandes",
      icon: <WorkOutlineOutlinedIcon className="full-width full-height" />,
      href: "/dashboard/orders",
      notifications: 0,
    },
    {
      title: "Devis",
      icon: <TaskIcon className="full-width full-height" />,
      onClick: () => router.push(`${router.basePath}?active_tab=quotations`),
      notifications: 0,
    },
    {
      title: "Factures",
      icon: <DescriptionOutlinedIcon className="full-width full-height" />,
      href: "/dashboard/invoices",
      notifications: 0,
    },
    {
      title: "Créer",
      icon: <NoteAddIcon className="full-width full-height" />,
      onClick: () => router.push(`${router.basePath}?active_tab=new_document`),
      notifications: 0,
    },
    {
      title: "Agenda",
      icon: <EventIcon className="full-width full-height" />,
      onClick: () => router.push(`${router.basePath}?active_tab=calendar`),
      notifications: 0,
    },
  ]

  return (
    <>
      <FixedBackground url="url(/medias/lines.jpg)" />

      <Stack zIndex={0} gap={4}>
        <OneActionBubblesGrid cards={CARDS} tab={tab} />

        {tab === 0 && <KpiModule />}
        {tab === 1 && <QuotationRequests_Main />}
        {tab === 3 && <Quotations_Main />}
        {tab === 5 && <NewDocModule />}
        {tab === 6 && <UserAgenda />}
      </Stack>
    </>
  )
}
