import { createContext, useContext, useEffect, useState } from "react"
import apiCall from "../../../../services/apiCalls/apiCall"
import { UserContext } from "../../../../contexts/UserContext"
import { ReviewsSection } from "./reviews-section"

export default function ProspectsModule() {
  const { user } = useContext(UserContext)

  // INITIAL STATES
  const initialReviews = []
  const initialState = {
    reviews: initialReviews,
    isFetching: false,
    modal: null,
    openModal: false,
    selectedReview: { id: null, editable: null, visible: null },
    timezone: user.timezone,
  }
  // MODULE STATE
  const [state, setState] = useState(initialState)

  // INITIAL FETCH
  useEffect(() => {
    fetchReviews()
  }, [])

  // RENDER
  return (
    <Context.Provider
      value={{
        state,
        setState,
        fetchReviews,
      }}
    >
      <ReviewsSection />
    </Context.Provider>
  )

  async function fetchReviews() {
    const res = await apiCall.reviews.getAll()
    if (res && res.ok) {
      const jsonRes = await res.json()
      setState({ ...state, reviews: jsonRes })
    }
  }
}

// CONTEXT
export const Context = createContext()
