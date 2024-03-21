import ArrowButton from "../Buttons/arrow-button"
import { useEffect, useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

import { Autoplay, Navigation } from "swiper/modules"
import { Stack } from "@mui/material"

export default function AutoPlaySlider({ Items }) {
  const [loop, setLoop] = useState(false)
  useEffect(() => {
    setLoop(true)
  }, [])

  const swiperRef = useRef(null)
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)

  return (
    <>
      <Swiper
        ref={swiperRef}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center !important",
          justifyContent: "center !important",
        }}
        wrapperClass="alignItemsCenter"
        loop={loop}
        slidesPerView={1}
        autoplay={{
          delay: 10000,
          disableOnInteraction: true,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current
          swiper.params.navigation.nextEl = navigationNextRef.current
        }}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        modules={[Autoplay, Navigation]}
      >
        {Items.map((Item, key) => (
          <SwiperSlide key={key}>
            <SwiperSlideContent>
              <Item />
            </SwiperSlideContent>
          </SwiperSlide>
        ))}

        {/* SLIDER CONTROLS */}
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          padding={{ xs: "2%", md: "5%" }}
          sx={{
            width: { xs: "100%", md: "90%", lg: "70%" },
            height: "100%",
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translate(-50%, 0)",
            zIndex: 1000,
            pointerEvents: "none",
          }}
        >
          <Stack ref={navigationPrevRef}>
            <ArrowButton left />
          </Stack>
          <Stack ref={navigationNextRef}>
            <ArrowButton right />
          </Stack>
        </Stack>
      </Swiper>
    </>
  )
}

function SwiperSlideContent({ ...props }) {
  return (
    <Stack
      sx={{
        width: { sm: "100%", md: "80%", lg: "50%" },
        height: "100%",
        margin: "auto",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem",
      }}
      {...props}
    />
  )
}
