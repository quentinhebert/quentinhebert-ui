import { useContext, useEffect, useState } from "react"
import { Context, FormCard, PAYMENT_MODES } from "../../../module"
import {
  Box,
  InputAdornment,
  Slider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material"
import AlertInfo from "../../../../../../Other/alert-info"
import BodyText from "../../../../../../Text/body-text"
import CustomOutlinedInput from "../../../../../../Inputs/custom-outlined-input"
import CustomFilledTextArea from "../../../../../../Inputs/custom-filled-text-area"
import theme from "../../../../../../../config/theme"

import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import EuroIcon from "@mui/icons-material/Euro"
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox"
import AddBoxIcon from "@mui/icons-material/AddBox"
import CustomFilledInput from "../../../../../../Inputs/custom-filled-input"
import PillButton from "../../../../../../Buttons/pill-button"

const PAYMENT_OPTIONS = [
  { id: "CASH", label: "Espèces" },
  { id: "CHECK", label: "Chèque" },
  { id: "TRANSFER", label: "Virement" },
  { id: "CARD", label: "CB" },
]

export default function Payment() {
  const { state, setState } = useContext(Context)
  const [paymentMode, setPaymentMode] = useState(null)

  useEffect(() => {
    // Get payment mode
    let value
    switch (state.order.payment_fractions.length) {
      case 1:
        value = PAYMENT_MODES.ONCE
        break
      case 2:
        value = PAYMENT_MODES.TWICE
        break
      default:
        value = PAYMENT_MODES.MULTIPLE
        break
    }
    setPaymentMode(value) // Default value is not correct
  }, [state.order.payment_fractions.length])

  return (
    <FormCard title="Paiement" step={3} totalSteps={5} icon={<EuroIcon />}>
      <TogglePaymentMode />
      {paymentMode === PAYMENT_MODES.TWICE ? (
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <Typography color="secondary">
            Acompte ({state.order.payment_fractions[0]}%)
          </Typography>
          <Slider
            color="secondary"
            aria-label="Temperature"
            value={state.order.payment_fractions[0] || 30}
            valueLabelDisplay="auto"
            onChange={(e, newValue) =>
              setState({
                ...state,
                order: {
                  ...state.order,
                  payment_fractions: [newValue, 100 - newValue],
                },
                orderToUpdate: {
                  ...state.orderToUpdate,
                  payment_fractions: [newValue, 100 - newValue],
                },
              })
            }
            step={5}
            marks
            min={0}
            max={100}
          />
          <Typography color="secondary">
            Solde ({100 - state.order.payment_fractions[0]}%)
          </Typography>
        </Stack>
      ) : null}

      {paymentMode === PAYMENT_MODES.MULTIPLE ? (
        <Stack spacing={2}>
          {state.order.payment_fractions.reduce(
            (partialSum, a) => partialSum + parseInt(a),
            0,
          ) !== 100 && (
            <AlertInfo
              content={{
                show: true,
                severity: "error",
                title: "Pourcentages incorrects",
                text: `Veuillez vérifier le total des pourcentages des échéances de paiements. Le total doit être égal à 100%. Le total est actuellement de ${state.order.payment_fractions.reduce(
                  (partialSum, a) => partialSum + parseInt(a),
                  0,
                )}%.`,
              }}
            />
          )}
          <PillButton
            onClick={() => {
              const localFractions = state.order.payment_fractions
              localFractions.push(0)
              setState({
                ...state,
                order: { ...state.order, payment_fractions: localFractions },
                orderToUpdate: {
                  ...state.orderToUpdate,
                  payment_fractions: localFractions,
                },
              })
            }}
          >
            <AddIcon />
          </PillButton>
          <Stack>
            {state.order.payment_fractions.map((fraction, key) => (
              <Stack
                flexDirection="row"
                alignItems="center"
                gap={1}
                padding=".5rem 1.5rem"
                justifyContent="space-between"
                sx={{
                  background: key % 2 === 0 ? "rgb(0,0,0,0.2)" : "",
                }}
              >
                <BodyText preventTransition fontSize="1rem" color="grey">
                  {key === 0
                    ? "Acompte"
                    : key === state.order.payment_fractions.length - 1
                      ? "Solde"
                      : `Échéance ${key + 1}/${
                          state.order.payment_fractions.length
                        }`}
                </BodyText>
                <Stack flexDirection="row" alignItems="center" gap={2}>
                  <Stack flexDirection="row" gap={1}>
                    <IndeterminateCheckBoxIcon
                      color="secondary"
                      sx={{
                        fontSize: "2.5rem",
                        cursor: "pointer",
                        "&:hover": {
                          opacity: 0.5,
                        },
                      }}
                      onClick={(e) => {
                        const payment_fractions = state.order.payment_fractions
                        if (Number(payment_fractions[key]) <= 0) return
                        payment_fractions[key] =
                          Number(payment_fractions[key]) - 10
                        setState({
                          ...state,
                          order: { ...state.order, payment_fractions },
                          orderToUpdate: {
                            ...state.orderToUpdate,
                            payment_fractions,
                          },
                        })
                      }}
                    />
                    <CustomOutlinedInput
                      type="phone"
                      sx={{ width: "70px" }}
                      InputProps={{
                        disableUnderline: true,
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                      }}
                      value={fraction}
                      onChange={(e) => {
                        const payment_fractions = state.order.payment_fractions
                        payment_fractions[key] = Number(e.target.value)
                        setState({
                          ...state,
                          order: { ...state.order, payment_fractions },
                          orderToUpdate: {
                            ...state.orderToUpdate,
                            payment_fractions,
                          },
                        })
                      }}
                    />
                    <AddBoxIcon
                      color="secondary"
                      sx={{
                        fontSize: "2.5rem",
                        cursor: "pointer",
                        "&:hover": {
                          opacity: 0.5,
                        },
                      }}
                      onClick={(e) => {
                        const payment_fractions = state.order.payment_fractions
                        if (Number(payment_fractions[key] >= 100)) return
                        payment_fractions[key] =
                          Number(payment_fractions[key]) + 10
                        setState({
                          ...state,
                          order: { ...state.order, payment_fractions },
                          orderToUpdate: {
                            ...state.orderToUpdate,
                            payment_fractions,
                          },
                        })
                      }}
                    />
                  </Stack>
                  <DeleteIcon
                    color="secondary"
                    sx={{
                      "&:hover": { opacity: 0.5 },
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      const payment_fractions = state.order.payment_fractions
                      payment_fractions.splice(key, 1)
                      setState({
                        ...state,
                        order: { ...state.order, payment_fractions },
                        orderToUpdate: {
                          ...state.orderToUpdate,
                          payment_fractions,
                        },
                      })
                    }}
                  />
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
      ) : null}

      {fractionSum !== 100 && (
        <AlertInfo
          content={{
            severity: "error",
            title: `Somme de ${fractionSum}%`,
            text: `La somme des échéances doit être égale à 100%. Elle est actuellement de ${fractionSum}%.`,
          }}
        />
      )}

      <CustomFilledInput
        label="Conditions de règlement"
        placeholder="Acompte de 30% lors de la signature du devis. Solde de 70% entre le jour de la prestation et la livraison."
        value={state.order.payment_conditions}
        onChange={handleChange("payment_conditions")}
        helperText={
          <ul style={{ padding: ".25rem 1rem", color: "grey" }}>
            <Li
              attribute="payment_conditions"
              text="Paiement en une fois à la signature du devis."
            />
            <Li
              attribute="payment_conditions"
              text={
                paymentMode === PAYMENT_MODES.TWICE
                  ? `Acompte de ${state.order.payment_fractions[0]}% lors de la signature du devis. Solde de ${100 - state.order.payment_fractions[0]}% entre le jour de la prestation et la livraison.`
                  : "Acompte de 30% lors de la signature du devis. Solde de 70% entre le jour de la prestation et la livraison."
              }
            />
            <Li
              attribute="payment_conditions"
              text="
                Acompte de 40% lors de la signature du devis. Échéance
                de 30% le jour de la prestation. Solde de 30% entre le
                jour de la prestation et la livraison."
            />
          </ul>
        }
        error={state.errors.payment_conditions}
      />
      <Stack
        sx={{
          background: "#000",
          padding: ".75rem",
          border: "1px solid",
          borderColor: state.errors.payment_options
            ? theme.palette.error.main
            : theme.palette.secondary.main,
          borderRadius: "10px",
          gap: 2,
        }}
      >
        <BodyText
          preventTransition
          color={(theme) =>
            state.errors.payment_options
              ? theme.palette.error.main
              : theme.palette.text.secondary
          }
          fontSize="1rem"
        >
          Moyen(s) de paiement
        </BodyText>

        <Stack flexDirection="row" gap={1}>
          {PAYMENT_OPTIONS.map((opt) => (
            <Stack
              sx={{
                padding: ".5rem 1rem",
                borderRadius: "10px",
                background: (theme) =>
                  state.order.payment_options[opt.id]
                    ? theme.palette.background.secondary
                    : theme.palette.background.main,
                cursor: "pointer",
                "&:hover": {
                  background: (theme) => theme.palette.text.secondary,
                  opacity: 0.7,
                },
              }}
              onClick={() => {
                let value = true
                if (state.order.payment_options[opt.id]) value = false
                setState({
                  ...state,
                  order: {
                    ...state.order,
                    payment_options: {
                      ...state.order.payment_options,
                      [opt.id]: value,
                    },
                  },
                  orderToUpdate: {
                    ...state.orderToUpdate,
                    payment_options: {
                      ...state.orderToUpdate.payment_options,
                      [opt.id]: value,
                    },
                  },
                })
              }}
            >
              <BodyText
                color={(theme) =>
                  state.order.payment_options[opt.id]
                    ? theme.palette.text.primary
                    : "#fff"
                }
              >
                {opt.label}
              </BodyText>
            </Stack>
          ))}
        </Stack>
      </Stack>
      <CustomFilledTextArea
        id="payment_delay_penalties"
        label="Pénalités de retard ou pour non paiement"
        value={state.order.payment_delay_penalties}
        onChange={handleChange("payment_delay_penalties")}
        error={state.errors.payment_delay_penalties}
        helperText={
          <ul style={{ padding: ".25rem 1rem", color: "grey" }}>
            <Li
              attribute="payment_delay_penalties"
              text="Une indemnité forfaitaire de 40€, à laquelle s'ajoute un taux d'Intérêt de retard de 15%. Calcul des intérêts de retard : Somme due TTC * jours de retard * taux d’intérêt / (365 * 100). Les jours de retard sont calculés à partir de la date de réception de la facture."
            />
          </ul>
        }
      />
    </FormCard>
  )
  function TogglePaymentMode() {
    return (
      <ToggleButtonGroup
        color="primary"
        value={paymentMode}
        exclusive
        onChange={(e, val) => {
          switch (val) {
            case PAYMENT_MODES.ONCE:
              setState({
                ...state,
                order: { ...state.order, payment_fractions: [100] },
                orderToUpdate: {
                  ...state.orderToUpdate,
                  payment_fractions: [100],
                },
              })
              break
            case PAYMENT_MODES.TWICE:
              setState({
                ...state,
                order: { ...state.order, payment_fractions: [60, 40] },
                orderToUpdate: {
                  ...state.orderToUpdate,
                  payment_fractions: [60, 40],
                },
              })
              break
            case PAYMENT_MODES.MULTIPLE:
              setState({
                ...state,
                order: { ...state.order, payment_fractions: [40, 30, 30] },
                orderToUpdate: {
                  ...state.orderToUpdate,
                  payment_fractions: [40, 30, 30],
                },
              })
              break
          }
          setPaymentMode(val)
        }}
        sx={{
          justifyContent: "center",
          "& .Mui-selected": {
            backgroundColor: (theme) =>
              `${theme.palette.secondary.main} !important`,
          },
          "&>.MuiToggleButton-root": {
            backgroundColor: "rgb(0,0,0,0.2)",
            padding: ".5rem 1rem",
            textTransform: "initial",
            "&:hover": {
              color: (theme) => theme.palette.text.primary,
              backgroundColor: (theme) => theme.palette.secondary.main,
              opacity: 0.7,
            },
          },
        }}
      >
        <ToggleButton
          value={PAYMENT_MODES.ONCE}
          sx={{
            borderRadius: "30px",
          }}
        >
          Paiement unique
        </ToggleButton>
        <ToggleButton value={PAYMENT_MODES.TWICE}>Acompte / solde</ToggleButton>
        <ToggleButton
          value={PAYMENT_MODES.MULTIPLE}
          sx={{
            borderRadius: "30px",
          }}
        >
          Plusieurs fois
        </ToggleButton>
      </ToggleButtonGroup>
    )
  }
  function fractionSum() {
    return state.order.payment_fractions.reduce(
      (a, b) => Number(a) + Number(b),
      0,
    )
  }
  function handleChange(attribute) {
    return (e) =>
      setState({
        ...state,
        order: { ...state.order, [attribute]: e.target.value },
      })
  }
}

const Li = ({ attribute, text }) => {
  const { state, setState } = useContext(Context)

  return (
    <Box
      component="li"
      onClick={() => {
        setState({
          ...state,
          order: { ...state.order, [attribute]: text },
          orderToUpdate: { ...state.orderToUpdate, [attribute]: text },
        })
      }}
      sx={{
        cursor: "pointer",
        "&:hover": { color: (theme) => theme.palette.text.secondary },
      }}
    >
      {text}
    </Box>
  )
}
