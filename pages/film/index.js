import React from "react";
import Head from "next/head";
import NavbarFilm from "../../components/Navigation/Navbars/navbar-film";
import Footer from "../../components/Navigation/Footers/Footer";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Button, Typography, useMediaQuery } from "@mui/material";
import theme from "../../config/theme";
import styled from "styled-components";
import Image from "next/image";

const gear = {
  canon: [
    "Canon 5D MkIII",
    "Objectif Sigma 24-70mm f2.8",
    "Objectif Sigma 70-200mm f2.8",
  ],
  fujifilm: ["Fujifilm X-T3", "Objectif Fujifilm 18-55mm f2.8-4"],
};

export default function FilmHomePage() {
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));
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

      <Stack
        height="50vh"
        component="div"
        sx={{
          backgroundImage: "url(/medias/home-background1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "50% 70%",
        }}
      >
        <Stack
          component="div"
          width="100%"
          height="50vh"
          backgroundColor="rgb(0,0,0,0.6)"
          position="absolute"
        />
        <Stack
          zIndex={10}
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          <Typography
            color="#fff"
            textTransform="uppercase"
            fontFamily="Arial"
            lineHeight="2rem"
            letterSpacing="3px"
            fontSize={md ? "1.5rem" : "2rem"}
            padding="1rem"
          >
            Un savoir faire et une passion au service de vos projets
          </Typography>
          <Button
            sx={{
              padding: ".5rem 1rem",
              margin: "1rem auto",
              backgroundColor: "#fff",
              color: "#000",
              "&:hover": { color: "#fff" },
            }}
          >
            Découvrez mon univers
          </Button>
        </Stack>
      </Stack>

      {/* <Stack
        position="relative"
        direction={lg ? "column" : "row"}
        justifyContent="center"
        alignContent="center"
        alignItems="center"
      >
        <Stack width="60%" margin="-3rem 0 -20%">
          <Stack sx={{ transform: "rotate(-3deg) translate(-5%,2%)" }}>
            <Avatar
              alt="Quentin HEBERT"
              src="/medias/quentin-avatar.jpg"
              sx={{ width: "45%", height: "45%" }}
              variant="square"
            />
          </Stack>
          <Stack sx={{ transform: "rotate(11deg) translate(-6%, -86%)" }}>
            <Avatar
              alt="Quentin HEBERT"
              src="/medias/quentin-avatar.jpg"
              sx={{ width: "45%", height: "45%" }}
              variant="square"
            />
          </Stack>
        </Stack>
        <Stack
          position={md ? "" : "absolute"}
          display="flex"
          right="10%"
          top="-10%"
          width="31rem"
        >
          <Typography
            component="H2"
            backgroundColor="#87181f"
            fontFamily="xhers, sans-serif"
            textTransform="uppercase"
            padding="0 2.5rem"
            fontSize="3rem"
            color="#fff"
            fontStyle="italic"
          >
            Salut, moi c'est Quentin
          </Typography>
          <Typography
            fontFamily="Arial"
            marginTop="2rem"
            letterSpacing={1}
            lineHeight={1.25}
            fontStyle="italic"
            // fontWeight="bold"
            fontSize="1.3rem"
            textAlign="justify"
            color="#87181f"
          >
            Je suis réalisateur, cadreur et monteur indépendant. Je réalise des
            vidéos de tout types depuis maintenant une dizaine d'années.
            Mariages, portraits, documentaires, films de fiction, clips
            musicaux, publictés et films d'entreprise, j'accompagne mes clients
            dans la plus grande transparence.
          </Typography>
        </Stack>
      </Stack> */}

      <Stack
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        width="100%"
        minHeight="300px"
        direction="row"
        backgroundColor="#000"
        padding="1rem 0"
      >
        <Stack
          justifyContent="center"
          alignContent="center"
          alignItems="center"
          width="50%"
          padding="2rem"
        >
          <Typography
            component="H2"
            color="#fff"
            fontFamily="Arial"
            textTransform="uppercase"
            letterSpacing="3px"
            margin="1rem 0"
          >
            Un boîtier réflexe professionel haut de gamme
          </Typography>
          <Typography
            color="#fff"
            fontFamily="Arial"
            textTransform="uppercase"
            letterSpacing="3px"
            textAlign="left"
          >
            {gear.canon.map((canonItem) => {
              return <Typography>- {canonItem}</Typography>;
            })}
          </Typography>
        </Stack>
        <Stack
          justifyContent="center"
          alignContent="center"
          alignItems="center"
          width="50%"
          height="400px"
          padding="2rem"
          sx={{
            backgroundImage: "url(/medias/gear-canon.png)",
            backgroundPosition: "50%",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        />
      </Stack>

      <Stack
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        width="100%"
        minHeight="300px"
        direction="row"
        backgroundColor="#000"
        padding="1rem 0"
      >
        <Stack
          justifyContent="center"
          alignContent="center"
          alignItems="center"
          width="50%"
          height="400px"
          padding="2rem"
          sx={{
            backgroundImage: "url(/medias/gear-fujifilm.png)",
            backgroundPosition: "50%",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        />
        <Stack
          justifyContent="center"
          alignContent="center"
          alignItems="center"
          width="50%"
          padding="2rem"
        >
          <Typography
            component="H2"
            color="#fff"
            fontFamily="Arial"
            textTransform="uppercase"
            letterSpacing="3px"
            margin="1rem 0"
          >
            Un boîtier hybride récent et polyvalent
          </Typography>
          <Typography
            color="#fff"
            fontFamily="Arial"
            textTransform="uppercase"
            letterSpacing="3px"
            textAlign="left"
          >
            {gear.fujifilm.map((fujifilmItem) => {
              return <Typography>- {fujifilmItem}</Typography>;
            })}
          </Typography>
        </Stack>
      </Stack>

      <Footer bgColor="#8F3731" />
    </>
  );
}
