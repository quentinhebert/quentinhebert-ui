export const formatPaymentErrors = (error) => {
  let formattedError = {
    title: "",
    message: "",
  }

  switch (error.code) {
    case "expired_card":
      formattedError.title = "Votre carte a expiré"
      formattedError.message = error.message
      break
    case "incorrect_cvc":
      formattedError.title = "Le numéro CVC est incorrect"
      formattedError.message = error.message
      break
    case "incorrect_number":
      formattedError.title = "Le numéro de votre carte est incorrect"
      formattedError.message = error.message
      break
    case "invalid_expiry_month":
    case "invalid_expiry_year":
      formattedError.title = "La date d'expiration de votre carte est incorrect"
      formattedError.message = error.message
      break
    case "processing_error":
      formattedError.title = "Le paiement a échoué lors du traitement"
      formattedError.message = error.message
      break
    case "card_declined":
      switch (error.decline_code) {
        case "generic_decline":
          formattedError.title = "Le paiement a été refusé"
          formattedError.message = error.message
          break
        case "insufficient_funds":
          formattedError.title = "Le paiement a été refusé"
          formattedError.message = error.message
          break
        case "lost_card":
          formattedError.title = "Le paiement a été refusé"
          formattedError.message = "Votre carte a été signalée comme perdue."
          break
        case "stolen_card":
          formattedError.title = "Le paiement a été refusé"
          formattedError.message = "Votre carte a été signalée comme volée."
          break
      }
      break
    default:
      formattedError.title =
        "Une erreur est survenue. Veuillez nous excuser ce désagrément."
      formattedError.message = error.message
      break
  }

  return formattedError
}
