import { Stack } from "@mui/material"
import ImgTextBand from "../Banners/ImgTextBand"
import styles from "../../styles/TextShine.module.css"
import BicolorTitle from "../Titles/bicolor-title"
import FixedBackground from "../Backgrounds/fixed-background"
import { Parallax, ParallaxProvider } from "react-scroll-parallax"
import { useContext } from "react"
import { AppContext } from "../../contexts/AppContext"
import { defaultConfig } from "../../config/defaultConfig"
import translations from "../../services/translation"

export default function AboutWebsite_Main() {
  const { lang } = useContext(AppContext)
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
          mainText={defaultConfig.webclientUrl.split("//")[1]}
          mainColor={(theme) => theme.palette.text.secondary}
          secondaryText={translations.aboutWebsite.subtitle[lang]}
          secondaryColor="#fff"
          bgColor="transparent"
        />

        <Stack justifyContent="center" alignItems="center" gap={8} zIndex={0}>
          <ImgTextBand
            img="/medias/about-website/nodejs-logo.png"
            title={translations.aboutWebsite.environment.title[lang]}
            titleColor="#61b448"
            text={translations.aboutWebsite.environment.description[lang]}
            reverse
          />
          <ImgTextBand
            img="/medias/about-website/javascript-logo.png"
            title={translations.aboutWebsite.language.title[lang]}
            titleColor="#f7e018"
            text={translations.aboutWebsite.language.description[lang]}
          />
          <ImgTextBand
            img="/medias/about-website/libraries.png"
            title={translations.aboutWebsite.libraries.title[lang]}
            titleColor="#0080ff"
            text={translations.aboutWebsite.libraries.description[lang]}
            reverse
          />
          <ImgTextBand
            img="/medias/about-website/stripe-logo.png"
            title={translations.aboutWebsite.payments.title[lang]}
            titleColor="#6772e5"
            text={translations.aboutWebsite.payments.description[lang]}
          />
          <ImgTextBand
            img="/medias/about-website/netlify.png"
            title={translations.aboutWebsite.host.title[lang]}
            titleColor="#3fa2bc"
            text={translations.aboutWebsite.host.description[lang]}
            reverse
          />
        </Stack>
      </Stack>
    </ParallaxProvider>
  )
}
