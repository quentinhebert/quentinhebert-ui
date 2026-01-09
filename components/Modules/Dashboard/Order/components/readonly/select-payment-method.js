import { Grid, Stack } from "@mui/material"
import BodyText from "../../../../../Text/body-text"
import { useEffect, useState } from "react"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import MoneyIcon from "@mui/icons-material/Money"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"

export default function SelectPaymentMethod({ setValue }) {
  const [selectedId, setSelectedId] = useState(null)

  return (
    <Grid container>
      {PAYMENT_OPTIONS.map(({ id, label, icon }) => (
        <Grid item xs={12} sm={6} padding={0.5}>
          <Stack
            bgcolor="#000"
            borderRadius={3}
            className="pointer"
            onClick={() => {
              setSelectedId(id)
              setValue(id)
            }}
            sx={{
              border: (theme) =>
                id === selectedId
                  ? `solid 1px ${theme.palette.secondary.main}`
                  : `solid 1px #000`,
              "&:hover": {
                border: (theme) => `solid 1px ${theme.palette.secondary.main}`,
                "& .MuiTypography-root": {
                  color: (theme) => theme.palette.secondary.main,
                },
              },
              padding: "1rem",
            }}
          >
            {icon}
            <BodyText color={id === selectedId ? "secondary" : null}>
              {label}
            </BodyText>
          </Stack>
        </Grid>
      ))}
    </Grid>
  )
}
export const PAYMENT_OPTIONS = [
  { id: "CASH", label: "Espèces", icon: <MoneyIcon color="secondary" /> },
  {
    id: "CHECK",
    label: "Chèque",
    icon: <AccountBalanceWalletIcon color="secondary" />,
  },
  {
    id: "TRANSFER",
    label: "Virement",
    icon: <AccountBalanceIcon color="secondary" />,
  },
  { id: "CARD", label: "CB", icon: <CreditCardIcon color="secondary" /> },
]
