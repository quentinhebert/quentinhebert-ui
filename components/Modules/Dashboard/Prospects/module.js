import { createContext, useContext, useEffect, useState } from "react"
import apiCall from "../../../../services/apiCalls/apiCall"
import { AppContext } from "../../../../contexts/AppContext"
import { UserContext } from "../../../../contexts/UserContext"
import { ProspectsSection } from "./prospects-section"

export default function ProspectsModule() {
  const { user } = useContext(UserContext)

  // INITIAL STATES
  const initialProspects = []
  const initialState = {
    prospects: initialProspects,
    isFetching: false,
    modal: null,
    openModal: false,
    selectedProspectId: null,
    tab: 0,
    timezone: user.timezone,
  }
  // MODULE STATE
  const [state, setState] = useState(initialState)
  const { setSnackSeverity, setSnackMessage } = useContext(AppContext)

  // INITIAL FETCH
  useEffect(() => {
    fetchProspects()
  }, [])

  // RENDER
  return (
    <Context.Provider
      value={{
        state,
        setState,
        fetchProspects,
      }}
    >
      <ProspectsSection />
    </Context.Provider>
  )

  async function fetchProspects() {
    const res = await apiCall.dashboard.prospects.getAll()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setState({ ...state, prospects: jsonRes })
    }
  }
}

// CONTEXT
export const Context = createContext()
