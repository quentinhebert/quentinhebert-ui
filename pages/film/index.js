import React from "react";
import Head from "next/head";
import NavbarFilm from "../../components/Navigation/Navbars/navbar-film";
import Footer from "../../components/Navigation/Footers/Footer";
import GearBand from "../../components/sections/gear-band";
import BicolorTitleBand from "../../components/sections/bicolorTitleBand";
import HeadBand from "../../components/sections/headBand";

const gear = {
  canon: {
    bgImg: "url(/medias/gear-canon.png)",
    items: [
      "Canon 5D MkIII",
      "Objectif Sigma 24-70mm f2.8",
      "Objectif Sigma 70-200mm f2.8",
    ],
  },
  fujifilm: {
    bgImg: "url(/medias/gear-fujifilm.png)",
    items: ["Fujifilm X-T3", "Objectif Fujifilm 18-55mm f2.8-4"],
  },
  ronin: {
    bgImg: "url(/medias/gear-ronin.png)",
    items: ["DJI Ronin SC"],
  },
  sound: {
    bgImg: "url(/medias/gear-sound.png)",
    items: [
      "Zoom H4n Pro",
      "Zoom H4n",
      "Kit micros cravate Synco G1A2 HF",
      "Micro Prodipe Pro ST-1",
      "Perche Rode 3 mètres",
    ],
  },
};

export default function FilmHomePage() {
  return (
    <>
      <Head>
        <title>Polygones | FILM</title>
        <meta name="description" content="Filmmaker" />
        <link rel="icon" href="/favicon.ico" />
        <link href="http://fonts.cdnfonts.com/css/xhers" rel="stylesheet" />
        <link href="http://fonts.cdnfonts.com/css/luxerie" rel="stylesheet" />
      </Head>

      <NavbarFilm />

      <HeadBand
        bgImg="url(/medias/home-background1.jpg)"
        mainText="Un savoir faire et une passion au service de vos projets"
        buttonText="Découvrez mon univers"
        buttonUrl="#"
      />

      <BicolorTitleBand
        mainText="mon matériel vidéo"
        mainColor="#87181f"
        secondaryText="Tout savoir sur"
        secondaryColor="#fff"
        bgColor="#000"
      />
      <GearBand
        reverse={true}
        gear={gear.canon}
        mainText={"Un boîtier réflexe professionel haut de gamme"}
      />
      <GearBand
        reverse={false}
        gear={gear.fujifilm}
        mainText={"Un boîtier hybride Récent et polyvalent"}
      />
      <GearBand
        reverse={true}
        gear={gear.ronin}
        mainText={"Un stabilisateur à moteurs 3-axes"}
        portrait
      />

      <BicolorTitleBand
        mainText="mon matériel de prise de son"
        mainColor="#87181f"
        secondaryText="Tout savoir sur"
        secondaryColor="#fff"
        bgColor="#000"
      />
      <GearBand
        reverse={false}
        gear={gear.sound}
        mainText={"Un enregistreur numérique et des micros-cravate"}
      />

      <Footer bgColor="#8F3731" />
    </>
  );
}
