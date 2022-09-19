import { Stack } from "@mui/material"
import BicolorTitle from "../ReusableComponents/titles/bicolor-title"
import ImgTextBand from "../Sections/img-text-band-about-website"
import styles from "../../styles/TextShine.module.css"

export default function AboutWebsiteLayout() {
  return (
    <Stack padding="8rem 0">
      <BicolorTitle
        className={styles.shine}
        mainText="le site quentinhebert.com"
        mainColor={(theme) => theme.palette.text.secondary}
        secondaryText="Tout savoir sur"
        secondaryColor="#fff"
        bgColor="transparent"
      />

      <Stack justifyContent="center" alignItems="center">
        <ImgTextBand
          img="/medias/about-website/nodejs-logo.png"
          title="Quel environnement ?"
          titleColor="#61b448"
          text="Ce site internet est un projet Node.js qui a été développé par Quentin HEBERT."
          reverse
        />
        <ImgTextBand
          img="/medias/about-website/javascript-logo.png"
          title="Quel language ?"
          titleColor="#f7e018"
          text="Le langage majoritairement utilisé dans le projet est le JavaScript."
        />
        <ImgTextBand
          img="/medias/about-website/libraries.png"
          title="Quelles librairies ?"
          titleColor="#0080ff"
          text="Le projet est un projet ReactJS, avec son framework Next.js. Nous
          utilisons également la librairie MUI (anciennement MaterialUI) pour
          les éléments d'interface facilement personalisables. Son utilisation a
          permi d'accélérer la phase de développement du site en front-end."
          reverse
        />
        <ImgTextBand
          img="/medias/about-website/stripe-logo.png"
          title="Quel service de paiement en ligne ?"
          titleColor="#6772e5"
          text="Le projet est un projet ReactJS, avec son framework Next.js. Nous
          utilisons également la librairie MUI (anciennement MaterialUI) pour
          les éléments d'interface facilement personalisables. Son utilisation a
          permi d'accélérer la phase de développement du site en front-end."
        />
        <ImgTextBand
          img="/medias/about-website/google-logo.png"
          title="Quel service de paiement en ligne ?"
          titleColor="#fff"
          text="Le site est hébergé sur [à définir]."
          reverse
        />
      </Stack>
    </Stack>
  )
}
