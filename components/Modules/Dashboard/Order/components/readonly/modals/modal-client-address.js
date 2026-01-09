import { useEffect, useState } from "react"
import SelectAddressSection from "../../../../../../Sections/Account/Orders/select-address-section"
import apiCall from "../../../../../../../services/apiCalls/apiCall"

export default function ModalClientAddress({ clientId, refreshData }) {
  const [selectedAddress, setSelectedAddress] = useState(null)

  async function updateMainAddress() {
    const res = await apiCall.clients.addresses.update({
      client: { id: clientId },
      address: selectedAddress,
    })
    if (res && res.ok) await refreshData()
    else alert("error")
  }

  useEffect(() => {
    if (!!selectedAddress) updateMainAddress()
  }, [selectedAddress])

  return (
    <>
      <SelectAddressSection
        givenUserId={clientId}
        nextBtnText="Sélectionner"
        setParentAddress={setSelectedAddress}
        handleNext={() => {}}
      />
    </>
  )
}
