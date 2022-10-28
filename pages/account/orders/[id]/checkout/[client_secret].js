import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useRouter } from "next/router"
import StripeCheckoutForm from "../../../../../components/Forms/StripeCheckoutForm"
import PagesLayout from "../../../../../components/Layouts/PagesLayout"
import theme from "../../../../../config/theme"

const head = {
  // Main meta tags
  title: "Page de paiement",
  description: "quentinhebert.com : payez en ligne en toute sécurité !",
  // SEO helpers
  follow: false,
  // OpenGraph additional tags (sharing)
  type: "website",
  ogImg: "/medias/ogimg.png",
}

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`)

export default function PaymentPage() {
  const router = useRouter()
  const orderId = router.query.id
  const clientSecret = router.query.client_secret

  const appearance = {
    theme: "night",
    variables: {
      fontFamily: "Helmet",
      fontWeightNormal: "400",
      borderRadius: "20px",
      colorPrimary: theme.palette.secondary.main,
      colorPrimaryText: "#1A1B25",
      colorText: theme.palette.text.secondary,
      colorTextSecondary: "white",
      colorTextPlaceholder: "#fff",
      colorIconTab: "white",
      colorLogo: "dark",
    },
    rules: {
      ".Input, .Block": {
        backgroundColor: "transparent",
        border: "1.5px solid var(--colorPrimary)",
      },
    },
  }

  const options = {
    clientSecret,
    appearance,
    fonts: [
      {
        family: "Helmet",
        src: "url(https://fonts.cdnfonts.com/s/18191/Helmet-Regular.woff)",
        weight: "400",
      },
    ],
  }

  return (
    <PagesLayout head={head}>
      <Elements stripe={stripePromise} options={options}>
        <StripeCheckoutForm orderId={orderId} clientSecret={clientSecret} />
      </Elements>
    </PagesLayout>
  )
}
