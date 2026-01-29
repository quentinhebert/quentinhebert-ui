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
      if (!!successMsg) setSnackMessage(successMsg)
      setSnackSeverity("success")
      if (!!handleSuccess) handleSuccess()
    } else {
      if (!!errorMsg) setSnackMessage(errorMsg)
      setSnackSeverity("error")
      if (!!handleError) handleError()
    }
  }

  return { notifySuccessError }
}
