import ArrowButton from "../Buttons/arrow-button"
import { useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import theme from "../../config/theme"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Box, Stack } from "@mui/material"

export default function AutoPlaySlider({ Items }) {
  const swiperRef = useRef(null)
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)

  const pagination = {
    clickable: true,
    el: ".swiper-pagination",
    renderBullet: function (index, className) {
      return `
      <span class="${className}"
        style="background: ${theme.palette.secondary.main};box-shadow: 0 0 10px 3px ${theme.palette.secondary.main};"
      ></span>`
    },
  }

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
        loop={true}
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
        pagination={pagination}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {Items.map((Item, key) => (
          <SwiperSlide key={key}>
            <SwiperSlideContent>
              <Item />
            </SwiperSlideContent>
          </SwiperSlide>
        ))}

        <div class="swiper-pagination"></div>

        {/* SLIDER CONTROLS */}
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          padding={{ xs: "2%", md: "5%" }}
          sx={{
            display: { xs: "none", md: "flex" },
            width: { xs: "100%", md: "100%", lg: "85%", xl: "70%" },
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
        width: { sm: "100%", md: "80%", lg: "70%", xl: "50%" },
        height: "100%",
        margin: "auto",
        alignItems: "center",
        justifyContent: "center",
        padding: {
          xs: "2rem 1.5rem 4rem",
          md: "2rem 4rem 4rem",
        },
      }}
      {...props}
    />
  )
}
