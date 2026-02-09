import { useContext } from "react"
import { Context, FormCard } from "../../../module"
import { Stack, Typography } from "@mui/material"
import { EditContext } from "../../../edit"
import SmallTitle from "../../../../../../Titles/small-title"
import SwitchButton from "../../../../../../Inputs/switch-button"
import CustomFilledTextArea from "../../../../../../Inputs/custom-filled-text-area"

export default function VariableQuote() {
  const { state, setState } = useContext(Context)

  return (
    <Stack
      sx={{
        width: "100%",
        padding: {
          xs: "1rem",
          md: state.order.variable_quote ? "2rem" : "1rem 2rem",
        },
        backgroundColor: (theme) => theme.palette.background.main,
        borderRadius: "20px",
        gap: 2,
      }}
    >
      <Stack flexDirection="row" alignItems="center" justifyItems="center">
        <SwitchButton
          checked={state.order.variable_quote}
          handleCheck={handleToggle}
        />
        <SmallTitle
          variant="h4"
          textTransform="initial"
          color={(theme) => theme.palette.secondary.main}
          gap={2}
          padding="0.4rem 0 0 0"
        >
          Devis variable
        </SmallTitle>
      </Stack>

      {state.order.variable_quote ? (
        <>
          <Stack width="100%">
            <CustomFilledTextArea
              label="Conditions tarifaires"
              value={state.order.variable_quote_elements?.price_conditions}
              onChange={handleChangeVarQuoteElmts("price_conditions")}
            />
          </Stack>
          <Typography
            lineHeight={1.2}
            fontSize="0.8rem"
            sx={{
              cursor: "pointer",
              color: "grey",
              ":hover": {
                color: (theme) => theme.palette.secondary.main,
              },
            }}
            onClick={() =>
              handleReplaceVarQuoteElmts(
                "price_conditions",
                `• Tarif unitaire : 59 € TTC par tranche de 30 secondes de vidéo finale livrée, par reel\n• Chaque reel est facturé individuellement\n• La durée facturée est arrondie à la tranche supérieure de 30 secondes`,
              )
            }
          >
            • Tarif unitaire : 59 € TTC par tranche de 30 secondes de vidéo
            finale livrée, par reel
            <br />
            • Chaque reel est facturé individuellement
            <br />• La durée facturée est arrondie à la tranche supérieure de 30
            secondes
          </Typography>

          <Stack width="100%">
            <CustomFilledTextArea
              label="Estimation du prix"
              value={state.order.variable_quote_elements?.price_estimation}
              onChange={handleChangeVarQuoteElmts("price_estimation")}
            />
          </Stack>
          <Typography
            lineHeight={1.2}
            fontSize="0.8rem"
            sx={{
              cursor: "pointer",
              color: "grey",
              ":hover": {
                color: (theme) => theme.palette.secondary.main,
              },
            }}
            onClick={() =>
              handleReplaceVarQuoteElmts(
                "price_estimation",
                `• Durée estimée : 20 à 30 secondes par reel\n• Montant estimatif TTC du pack (4 reels) : 236 € TTC\nCe montant est indicatif et non forfaitaire.`,
              )
            }
          >
            • Durée estimée : 20 à 30 secondes par reel
            <br />
            • Montant estimatif TTC du pack (4 reels) : 236 € TTC
            <br />
            Ce montant est indicatif et non forfaitaire.
          </Typography>

          <Stack width="100%">
            <CustomFilledTextArea
              label="Validation et facturation finale"
              value={state.order.variable_quote_elements?.price_validation}
              onChange={handleChangeVarQuoteElmts("price_validation")}
            />
          </Stack>
          <Typography
            lineHeight={1.2}
            fontSize="0.8rem"
            sx={{
              cursor: "pointer",
              color: "grey",
              ":hover": {
                color: (theme) => theme.palette.secondary.main,
              },
            }}
            onClick={() =>
              handleReplaceVarQuoteElmts(
                "price_validation",
                `• La facturation finale TTC sera établie selon la durée finale validée pour livraison par le client\n• Toute demande hors du cadre défini ci-dessus fera l’objet d’un avenant`,
              )
            }
          >
            • La facturation finale TTC sera établie selon la durée finale
            validée pour livraison par le client
            <br />• Toute demande hors du cadre défini ci-dessus fera l’objet
            d’un avenant
          </Typography>
        </>
      ) : (
        <></>
      )}
    </Stack>
  )

  function handleToggle(bool) {
    let newState = {
      ...state,
      order: {
        ...state.order,
        variable_quote: bool,
      },
      orderToUpdate: { ...state.orderToUpdate, variable_quote: bool },
    }
    setState(newState)
  }

  function handleChangeVarQuoteElmts(attribute) {
    return (e) => {
      let newState = {
        ...state,
        order: {
          ...state.order,
          variable_quote_elements: {
            ...state.order.variable_quote_elements,
            [attribute]: e?.target?.value,
          },
        },
        orderToUpdate: {
          ...state.orderToUpdate,
          variable_quote_elements: {
            ...state.order.variable_quote_elements,
            [attribute]: e?.target?.value,
          },
        },
      }
      setState(newState)
    }
  }
  function handleReplaceVarQuoteElmts(attribute, value) {
    let newState = {
      ...state,
      order: {
        ...state.order,
        variable_quote_elements: {
          ...state.order.variable_quote_elements,
          [attribute]: value,
        },
      },
      orderToUpdate: {
        ...state.orderToUpdate,
        variable_quote_elements: {
          ...state.order.variable_quote_elements,
          [attribute]: value,
        },
      },
    }
    setState(newState)
  }
}
