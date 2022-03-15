import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import theme from "../../../config/theme";
import Image from "next/image";
import Link from "next/link";
import FacebookIcon from "../../../public/medias/social_icons/facebook.svg";
import InstagramIcon from "../../../public/medias/social_icons/instagram.svg";
import LinkedinIcon from "../../../public/medias/social_icons/linkedin.svg";
import YoutubeIcon from "../../../public/medias/social_icons/youtube.svg";
import SecuredPaymentIcon from "../../../public/medias/warranties/secured-payment-icon.svg";
import PaypalIcon from "../../../public/medias/warranties/paypal-icon.svg";
import CreditCardIcon from "../../../public/medias/warranties/credit-card-icon.svg";
import QualityIcon from "../../../public/medias/warranties/quality-icon.svg";

const logos = [
  { url: "/", img: "/logos/logo.png" },
  { url: "/film", img: "/logos/film-logo.png" },
  { url: "/dev", img: "/logos/dev-logo.png" },
];

const Logos = (logo) => {
  return (
    <Link href={logo.url} passHref>
      <Button sx={{ "&:hover": { backgroundColor: "transparent" } }}>
        <Image src={logo.img} width="100%" height="100%" />
      </Button>
    </Link>
  );
};

const socialMedias = [
  {
    type: "youtube",
    image: YoutubeIcon,
    link: "https://www.youtube.com/narcoprod",
  },
  {
    type: "instagram",
    image: InstagramIcon,
    link: "https://www.instagram.com/tarte_a_la_courgette/",
  },
  {
    type: "facebook",
    image: FacebookIcon,
    link: "https://www.facebook.com/kioulekiou",
  },
  {
    type: "linkedin",
    image: LinkedinIcon,
    link: "#",
  },
];

const ContactPart = () => {
  const md = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Stack height="100%" justifyContent={"space-between"} gap={2}>
      <Button
        href="mailto:contact@polygones.com"
        variant="text"
        size="large"
        sx={{
          textTransform: "uppercase",
          textDecoration: "none",
          fontFamily: "Arial, sans-serif",
          color: "#FFF",
        }}
      >
        contact@polygones.com
      </Button>

      <Stack
        direction="row"
        width={"100%"}
        justifyContent={md ? "center" : "space-between"}
        spacing={2}
      >
        {socialMedias.map((social, key) => (
          <a
            key={key}
            href={social.link}
            target="_blank"
            rel="noreferrer"
            style={{ cursor: "pointer" }}
          >
            <Image src={social.image} height="40%" width="40%" />
          </a>
        ))}
      </Stack>

      <Link href="/newsletters" target="_blank" rel="noreferrer" passHref>
        <Button
          variant="outlined"
          sx={{
            color: "#fff",
            borderColor: "#fff",
          }}
        >
          Newsletter
        </Button>
      </Link>
    </Stack>
  );
};

const navigationButtons = [
  {
    name: "À propos",
    path: "/a-propos",
  },
  {
    name: "Partenaires",
    path: "/partenaires",
  },
  {
    name: "Recrutement",
    path: "/recrutement",
  },
  {
    name: "CGU",
    path: "/cgu",
  },
  {
    name: "Plan du site",
    path: "/plan-du-site",
  },
  {
    name: "Mentions légales",
    path: "/mentions-legales",
  },
];

const NavigationPart = () => {
  const md = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Grid
      container
      columns={2}
      justifyContent="center"
      alignItems="center"
      fontFamily="Arial"
      sx={{ textAlign: "center", width: { md: "50%", lg: "30rem" } }}
    >
      {navigationButtons.map((item, key) => (
        <Grid item xs={1} key={key} lineHeight={md ? "1.75rem" : "1.25rem"}>
          <Link href={item.path} underline="none">
            <Typography
              component="span"
              variant="text"
              textTransform="uppercase"
              fontSize="1rem"
              sx={{ cursor: "pointer", color: "#fff" }}
            >
              {item.name}
            </Typography>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

const warrantiesButtons = [
  {
    image: SecuredPaymentIcon,
    text: "Paiement sécurisé",
  },
  {
    image: CreditCardIcon,
    text: "Paiement par carte bancaire",
  },
  {
    image: PaypalIcon,
    text: "Paiement par PayPal",
  },
  {
    image: QualityIcon,
    text: "Un gage de qualité",
  },
];

const Warranties = () => {
  const md = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Stack
      direction={md ? "column" : "row"}
      width={"80%"}
      maxWidth={{ lg: "650px", xl: "850px" }}
      margin="4rem auto 2rem"
      justifyContent="space-between"
      gap={4}
    >
      {warrantiesButtons.map((warranty, key) => (
        <Stack alignItems="center" textAlign="center">
          <Image src={warranty.image} height="40%" width="40%" />
          <Typography
            component="div"
            color="#fff"
            fontFamily="Arial"
            textTransform="uppercase"
            fontSize=".75rem"
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            display="flex"
            sx={{ marginTop: ".5rem" }}
          >
            {warranty.text}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

const Credits = () => {
  return (
    <Stack alignItems="center" textAlign="center">
      <Typography fontSize="0.75rem" color="#fff">
        ©Polygones / 2022 – Site développé par Quentin HEBERT -{" "}
        <Link href="/about-website">En savoir plus</Link>
      </Typography>
    </Stack>
  );
};

export default function Footer(props) {
  const { bgColor } = props;
  const md = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      component="footer"
      width={"100%"}
      paddingTop={4}
      paddingBottom={4}
      sx={{
        backgroundColor: bgColor,
      }}
    >
      <Stack
        direction={md ? "column" : "row"}
        width={"80%"}
        maxWidth={{ lg: "880px", xl: "1050px" }}
        margin="auto"
        justifyContent="space-between"
        gap={4}
      >
        <Stack direction="row" justifyContent="center">
          {logos.map((logo) => {
            return Logos(logo);
          })}
        </Stack>
        <ContactPart />
        <NavigationPart />
      </Stack>
      <Warranties />
      <Credits />
    </Box>
  );
}
