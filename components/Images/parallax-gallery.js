import { Stack } from "@mui/material"
import { Parallax, ParallaxProvider } from "react-scroll-parallax"
import ScaleUpOnHoverStack from "../Animation/scale-up-on-hover-stack"

export default function ParallaxGallery(props) {
  return (
    <ParallaxProvider>
      <Stack
        className="row no-select"
        marginY="-20vw"
        gap="2vw"
        marginX="2vw"
        position="relative"
        height="90vw"
      >
        <FadeOverlay
          top
          background={(theme) =>
            `linear-gradient(${theme.palette.background.black} 20%, transparent 100%)`
          }
        />
        <FadeOverlay
          bottom
          background={(theme) =>
            `linear-gradient(transparent 0%, ${theme.palette.background.black} 80%)`
          }
        />

        <Stack width="33.3%">
          <Parallax
            className="column full-width"
            speed={30}
            style={{ display: "flex", gap: "2vw" }}
          >
            <Img src="/medias/sunset.png" />
            <Img src="/medias/cover.jpg" />
            <Img src="/medias/beach.jpg" />
            <Img src="/medias/bridge.jpg" />
          </Parallax>
        </Stack>

        <Stack width="33.3%">
          <Parallax
            className="column full-width"
            speed={-15}
            style={{ display: "flex", gap: "2vw" }}
          >
            <Img src="/medias/IMG_1902.JPG" />
            <Img src="/medias/aalh.jpg" />
            <Img src="/medias/P1060719.jpg" />
            <Img src="/medias/IMG_1902.JPG" />
          </Parallax>
        </Stack>

        <Stack width="33.3%">
          <Parallax
            className="column full-width"
            speed={-50}
            style={{ display: "flex", gap: "2vw", pointerEvents: "none" }}
          >
            <Img src="/medias/sunset.png" />
            <Img src="/medias/IMG_1899.JPG" />
            <Img src="/medias/sunset.png" />
            <Img src="/medias/lilliput.JPG" />
            <Img src="/medias/sunset.png" />
            <Img src="/medias/IMG_1899.JPG" />
          </Parallax>
        </Stack>
      </Stack>
    </ParallaxProvider>
  )
}

function Img({ src }) {
  return (
    <ScaleUpOnHoverStack>
      <Stack
        component="img"
        src={src}
        width="100%"
        sx={{ borderRadius: "20px" }}
        className="no-select"
      />
    </ScaleUpOnHoverStack>
  )
}

function FadeOverlay({ top, bottom, background }) {
  const topOrBottom = !!top ? "top" : !!bottom ? "bottom" : "top"

  return (
    <Stack
      sx={{
        position: "absolute",
        width: "100%",
        [topOrBottom]: "19vw",
        background,
        height: "20%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  )
}
