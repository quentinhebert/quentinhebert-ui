import { useContext, useState } from "react"
import FullWidthTabs from "../../../Navigation/full-width-tabs"
import { Context } from "./module"
import Toolbar from "./components/readonly/toolbar/toolbar"
import TabContent from "./components/readonly/sections"
import { Stack } from "@mui/material"

export default function OrderReadonly({}) {
  const { state, setState } = useContext(Context)

  const nbPayments = state.order.payments?.length
  const hasClient = !!state.order.client?.id
  const nbDocuments =
    state.order.quotations?.length + state.order.invoices?.length

  const TABS = [
    { label: "Détails" },
    { label: "Modalités" },
    { label: "Client", warning: !hasClient },
    { label: "Paiement(s)", badge: nbPayments },
    { label: "Document(s)", badge: nbDocuments },
    { label: "Historique" },
  ]

  return (
    <Stack gap={2}>
      <Toolbar />

      <FullWidthTabs
        tabs={TABS}
        activeTab={state.activeTab}
        setActiveTab={(newState) => setState({ ...state, activeTab: newState })}
      />

      <TabContent />
    </Stack>
  )
}
