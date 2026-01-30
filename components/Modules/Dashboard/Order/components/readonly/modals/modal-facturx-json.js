import { Box, Stack } from "@mui/material"
import { ModalTitle } from "../../../../../../Modals/Modal-Components/modal-title"
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange"
import BodyText from "../../../../../../Text/body-text"
import { useEffect, useState } from "react"
import PillButton from "../../../../../../Buttons/pill-button"
import CancelButton from "../../../../../../Buttons/cancel-button"
import apiCall from "../../../../../../../services/apiCalls/apiCall"
import { useSnack } from "../../../../../../../hooks/useSnack"
import CustomModal from "../../../../../../Modals/custom-modal"
import dynamic from "next/dynamic"
const ReactJson = dynamic(() => import("react-json-view"), {
  ssr: false,
})

const data = {
  number: "FV-N09830",
  date: "13/01/2026",
  delivery_date: "15/01/2026",
  vat_exempted: true,
  supplier: {
    siret: "92019522900017",
    name: "Quentin Hébert (Entreprise Individuelle)",
    email: "hello@quentinhebert.com",
    postalAddress: {
      lineOne: "6 rue Henri",
      postalCode: "60750",
      city: "Choisy-au-Bac",
      countryCode: "FR",
    },
  },
  recipient: {
    siret: "83106290600043",
    vat_number: "FR58831062906",
    company_name: "Vinyle et Hifi Vintage",
    name: "Pascal Zion",
    email: "contact@vinylehifi.com",
    postalAddress: {
      lineOne: "456 Avenue des Champs",
      postalCode: "69001",
      city: "Lyon",
      countryCode: "FR",
    },
  },
  lines: [
    {
      description: "Test 1",
      quantity: 2,
      unit_price: 200,
      vat_rate: 0,
    },
    {
      description: "Test 2",
      quantity: 1,
      unit_price: 350,
      vat_rate: 0,
    },
  ],
  totals: {
    no_vat_amount: 750,
    vat: 0,
  },
  notes: [
    {
      subject_code: "PMT",
      content:
        "En cas de retard de paiement, indemnité forfaitaire pour frais de recouvrement : 40 EUR.",
    },
    {
      subject_code: "PMD",
      content: "Pénalités calculées sur la base du taux BCE + 10 points.",
    },
  ],
}

export default function ModalFacturXjson({ open, handleClose, invoice }) {
  const { notifySuccessError } = useSnack()

  const [json, setJson] = useState(null)

  useEffect(() => {
    fetchJson()
  }, [open])

  async function fetchJson() {
    const res = await apiCall.orders.getFacturXjson({ invoice })
    notifySuccessError({
      condition: res && res.ok,
      errorMsg: "Une erreur est survenue ❌",
    })
    const jsonRes = await res.json()
    setJson(jsonRes)
  }

  async function copyToClipboard() {
    const jsonData = JSON.stringify(json, null, 2)
    notifySuccessError({
      condition: true,
      successMsg: "Copié dans le presse-papier ✅",
      errorMsg: "Une erreur est survenue ❌",
    })
    return navigator.clipboard.writeText(jsonData)
  }

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      gap={4}
      StickyBottom={
        <Stack gap={1}>
          <PillButton
            startIcon={<CurrencyExchangeIcon />}
            onClick={() => copyToClipboard()}
          >
            Copier
          </PillButton>
          <CancelButton
            variant="text"
            handleCancel={handleClose}
            label="Fermer"
          />
        </Stack>
      }
    >
      {!invoice?.number ? (
        <></>
      ) : (
        <>
          <ModalTitle alignItems="center" display="flex" gap={1}>
            Payload (Json) pour générer la factur-X
          </ModalTitle>
          <Stack gap={4}>
            <BodyText textAlign="center">
              Facture{" "}
              <Box
                component="span"
                sx={{
                  color: (theme) => theme.palette.secondary.main,
                  fontWeight: "bold",
                }}
              >
                {invoice.number}
              </Box>
            </BodyText>

            {!!json && (
              <ReactJson
                src={json}
                theme="pop"
                style={{ padding: "1rem 0" }}
                enableClipboard={false}
                displayDataTypes={false}
              />
            )}
          </Stack>
        </>
      )}
    </CustomModal>
  )
}
