import * as React from "react";
import Box from "@mui/material/Box";
import {
  ImageListItem,
  ImageList,
  ImageListItemBar,
  useMediaQuery,
} from "@mui/material";
import theme from "../../config/theme";
import Image from "next/image";
import Link from "next/link";

export default function TwoRowSquareGallery(props) {
  const { images } = props;
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  return (
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
            <ImageListItem key={key} sx={{ "& :hover": { cursor: "pointer" } }}>
              <Image src={item.image} alt={item.alt} />
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
              {item.icon ? (
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
              ) : null}
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
  );
}
