import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import apiCall from "../../../services/apiCalls/apiCall"
import CustomOutlinedAutocomplete from "../../Inputs/custom-outlined-autocomplete"

export default function ClientAutocomplete({
  value,
  placeholder,
  setValue,
  inputValue,
  setInputValue,
  defaultValue,
}) {
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchResults = async () => {
    if (inputValue.trim() === "") return
    setLoading(true)
    const res = await apiCall.clients.search({ string: inputValue })
    if (res && res.ok) {
      const jsonRes = await res.json()
      setOptions(jsonRes.clients)
    }
    setLoading(false)
  }

  // Throttle / debounce
  useEffect(() => {
    const timeout = setTimeout(fetchResults, 250)
    return () => clearTimeout(timeout)
  }, [inputValue])

  useEffect(() => {
    if (defaultValue?.email) setInputValue(defaultValue?.email)
  }, [defaultValue])

  return (
    <CustomOutlinedAutocomplete
      fullWidth
      options={options}
      getOptionLabel={(option) =>
        `${option.email} (${option.firstname} ${option.lastname})`
      }
      label="Client"
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {`${option.email} (${option.firstname} ${option.lastname})`}
        </Box>
      )}
      onChange={(event, newValue) => setValue(newValue)}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      loading={loading}
      noOptionsText={"Aucun client"}
      loadingText="Veuillez patienter..."
      defaultValue={defaultValue?.email ? defaultValue : null}
      placeholder={placeholder || ""}
    />
  )
}
