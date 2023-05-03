import { Stack } from "@mui/material"
import { useContext } from "react"
import { AppContext } from "../../contexts/AppContext"

export default function QAndA({ ...props }) {
  const { lang } = useContext(AppContext)
  return <Stack className="relative"></Stack>
}
