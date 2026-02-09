import { Stack } from "@mui/material"
import Toolbar from "./components/edit/toolbar"
import ActivityType from "./components/edit/sections/activity-type"
import MissionDate from "./components/edit/sections/mission-date"
import { createContext, useContext } from "react"
import DeliveryDate from "./components/edit/sections/delivery-date"
import Payment from "./components/edit/sections/payment"
import { Context } from "./module"
import VAT from "./components/edit/sections/vat"
import PriceTable from "./components/edit/sections/price-table"
import VariableQuote from "./components/edit/sections/variable-quote"

export default function OrderEdit({}) {
  const { state, setState } = useContext(Context)
  return (
    <EditContext.Provider value={{ handleChangeDate, handleChange }}>
      <Stack gap={2}>
        <Toolbar />

        <Stack
          sx={{
            padding: "2rem 1rem",
            gap: 2,
            maxWidth: "900px",
            width: "100%",
            margin: "auto",
          }}
        >
          <ActivityType />
          <VariableQuote />
          <MissionDate />
          <DeliveryDate />
          <Payment />
          <VAT />
          <PriceTable />
        </Stack>
      </Stack>
    </EditContext.Provider>
  )

  function handleChangeDate(attribute) {
    return (newValue) => {
      if (state.errors[attribute])
        setState({ ...state, errors: { ...state.errors, [attribute]: false } })
      setState({
        ...state,
        order: { ...state.order, [attribute]: newValue },
        orderToUpdate: { ...state.orderToUpdate, [attribute]: newValue },
      })
    }
  }
  function handleChange(attribute) {
    return (e) => {
      if (state.errors[attribute])
        setState({ ...state, errors: { ...state.errors, [attribute]: false } })
      setState({
        ...state,
        order: { ...state.order, [attribute]: e.target.value },
        orderToUpdate: { ...state.orderToUpdate, [attribute]: e.target.value },
      })
    }
  }
}

export const EditContext = createContext()
