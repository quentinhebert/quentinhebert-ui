import { Box, Stack } from "@mui/material"
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
        <Stack
          component="li"
          borderBottom={`1px solid rgb(256,256,256,0.1)`}
          sx={{ ":last-of-type": { borderBottom: "none" } }}
          {...props}
        >
          <Stack width="100%" flexDirection="row" alignItems="center" gap={0.5}>
            {option.firstname} {option.lastname}{" "}
            <Box fontSize=".9rem" color="gray">
              {!!option.company && `/ ${option.company}`}
            </Box>
          </Stack>
          <Stack width="100%" color="gray" fontSize=".9rem">
            <em>{option.email}</em>
          </Stack>
        </Stack>
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
