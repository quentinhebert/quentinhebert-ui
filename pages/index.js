import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navigation/Navbars/navbar";
import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import theme from "../config/theme";
import photo1 from "../public/medias/home-photo1.jpg";
import photo2 from "../public/medias/home-photo2.jpg";
import VideocamIcon from "@mui/icons-material/Videocam";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import Footer from "../components/Navigation/Footers/Footer";

const images = [
  {
    image: photo1,
    domain: "Filmmaker",
    jobs: "Réalisateur Cadreur Monteur",
    url: "/film",
    icon: <VideocamIcon />,
  },
  {
    image: photo2,
    domain: "Developper",
    jobs: ["Développeur Full-Stack Front/Back JS"],
    url: "/dev",
    icon: <PersonalVideoIcon />,
  },
];

export default function Home() {
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Head>
        <title>Polygones</title>
        <meta
          name="description"
          content="Société de développeurs et filmmakers"
        />
        <link href="http://fonts.cdnfonts.com/css/xhers" rel="stylesheet" />
        <link href="http://fonts.cdnfonts.com/css/luxerie" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Stack
        justifyContent="center"
        alignItems="center"
        margin="1rem auto"
        marginTop={md ? "2rem" : "8rem"}
      >
        <Typography
          component="H1"
          variant="text"
          fontFamily="Arial, sans-serif"
          fontWeight="light"
          textTransform="uppercase"
        >
          Que cherchez-vous ?
        </Typography>
      </Stack>
      <Box
        display={"flex"}
        justifyContent="center"
        paddingTop="2rem"
        marginBottom={md ? "2rem" : "8rem"}
        sx={{ backgroundColor: "white" }}
      >
        <ImageList
          cols={sm ? 1 : 2}
          gap={15}
          rowHeight={md ? "600px" : "800px"}
          sx={{
            width: { xs: "70%", sm: "70%", md: "70%" },
            maxWidth: { lg: "880px", xl: "1050px" },
          }}
        >
          {images.map((item, key) => (
            <Link href={item.url}>
              <ImageListItem
                key={key}
                sx={{ "& :hover": { cursor: "pointer" } }}
              >
                <Image src={item.image} alt={item.name} />
                <ImageListItemBar
                  title={item.jobs}
                  position="bottom"
                  sx={{
                    background: "rgba(0,0,0,0.6)",
                    height: "100%",
                    textAlign: "center",
                    textTransform: "uppercase",
                    transition: "all 0.2s",
                    "& .MuiImageListItemBar-title": {
                      fontSize: ".6rem",
                      fontWeight: "300",
                      letterSpacing: "2px",
                      marginTop: "4rem",
                    },
                    "&:hover": {
                      transition: "all 0.2s",
                      background: "transparent",
                    },
                  }}
                />
                <ImageListItemBar
                  title={item.icon}
                  position="bottom"
                  sx={{
                    background: "transparent",
                    height: "100%",
                    textAlign: "center",
                    textTransform: "uppercase",
                    transition: "all 0.2s",
                    "& .MuiImageListItemBar-title": {
                      fontWeight: "300",
                      letterSpacing: "2px",
                      marginBottom: "6rem",
                    },
                  }}
                />
                <ImageListItemBar
                  title={item.domain}
                  position="bottom"
                  sx={{
                    background: "transparent",
                    height: "100%",
                    textAlign: "center",
                    textTransform: "uppercase",
                    transition: "all 0.2s",
                    "& .MuiImageListItemBar-title": {
                      fontSize: "1.5rem",
                      fontWeight: "300",
                      letterSpacing: "2px",
                    },
                    "&:hover": {
                      transition: "all 0.2s",
                      background: "rgba(0,0,0,0.7)",
                    },
                  }}
                />
              </ImageListItem>
            </Link>
          ))}
        </ImageList>
      </Box>
      <Footer bgColor={(theme) => theme.palette.background.main} />
    </>
  );
}
