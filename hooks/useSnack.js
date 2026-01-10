import { useContext } from "react"
import { AppContext } from "../contexts/AppContext"

export function useSnack() {
  const { setSnackMessage, setSnackSeverity } = useContext(AppContext)

  const notifySuccessError = ({
    condition,
    successMsg,
    errorMsg,
    handleSuccess,
    handleError,
  }) => {
    if (condition) {
      setSnackMessage(successMsg)
      setSnackSeverity("success")
      if (!!handleSuccess) handleSuccess()
    } else {
      setSnackMessage(errorMsg)
      setSnackSeverity("error")
      if (!!handleError) handleError()
    }
  }

  return { notifySuccessError }
}
