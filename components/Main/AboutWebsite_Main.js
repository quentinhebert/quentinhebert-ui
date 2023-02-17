import { Stack } from "@mui/material"
import ImgTextBand from "../Banners/ImgTextBand"
import styles from "../../styles/TextShine.module.css"
import BicolorTitle from "../Titles/bicolor-title"
import FixedBackground from "../Backgrounds/fixed-background"
import { Parallax, ParallaxProvider } from "react-scroll-parallax"

export default function AboutWebsite_Main() {
  return (
    <ParallaxProvider>
      <Stack padding="4rem 0" gap={4}>
        <Parallax
          easing="easeInQuad"
          translateY={[0, -1]}
          scale={[1, 1.1]}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "110%",
            height: "110%",
            zIndex: 0,
          }}
        >
          <Stack
            sx={{
              height: "100%",
              width: "100%",
              background:
                "radial-gradient(rgb(0,0,0,0.5) 80%, transparent 100%), url(/medias/film_grain.jpg)",
              backgroundSize: "cover",
            }}
          />
        </Parallax>

        <BicolorTitle
          className={styles.shine}
          mainText="quentinhebert.com"
          mainColor={(theme) => theme.palette.text.secondary}
          secondaryText="Tout savoir sur le site"
          secondaryColor="#fff"
          bgColor="transparent"
        />

        <Stack justifyContent="center" alignItems="center" gap={8} zIndex={0}>
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
            img="/medias/about-website/netlify.png"
            title="Quel hébergement ?"
            titleColor="#3fa2bc"
            text="Le site et son API sont hébergés sur Netlify."
            reverse
          />
        </Stack>
      </Stack>
    </ParallaxProvider>
  )
}
