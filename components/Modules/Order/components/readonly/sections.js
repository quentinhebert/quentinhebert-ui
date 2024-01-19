import { useContext } from "react"
import { Context, MODES } from "../../module"
import AlertInfo from "../../../../Other/alert-info"
import { Stack } from "@mui/material"
import PillButton from "../../../../Buttons/pill-button"
import OrderReadOnlySection from "../../../../Sections/Orders/order-read-only-section"
import LogsSection from "./sections/logs-section"
import ClientSection from "./sections/client-section"
import DocumentsSection from "./sections/document-section"
import { PaymentSection } from "./sections/payment-section"

export default function Sections() {
  const { state, setState } = useContext(Context)

  switch (state.activeTab) {
    default:
      return (
        <>
          <AlertInfo
            content={{
              show: !!state.order.client && !state.order.items?.length,
              title: "Commande non visible par votre client",
              js: (
                <Stack gap={2}>
                  Vous devez ajouter des items à votre commande pour que votre
                  client puisse accéder à cette dernière.
                  <PillButton
                    onClick={() => setState({ ...state, mode: MODES.EDIT })}
                  >
                    Modifier la commande
                  </PillButton>
                </Stack>
              ),
              severity: "warning",
            }}
          />
          <OrderReadOnlySection
            items={state.items}
            order={state.order}
            hideModalities
          />
        </>
      )
    case 1:
      return (
        <OrderReadOnlySection
          items={state.items}
          order={state.order}
          hideDetails
        />
      )
    case 2:
      return <ClientSection />
    case 3:
      return <PaymentSection />
    case 4:
      return <DocumentsSection />
    case 5:
      return <LogsSection />
  }
}
