import { useEffect, useRef } from "react"
import { Stack } from "@mui/material"
import { useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const data = [
  {
    url: "https://www.youtube.com/embed/AatbVWu-6ww",
    teaser: "https://www.youtube.com/embed/Inig-aZCo90",
  },
  {
    url: "https://www.youtube.com/embed/M4m6F8ez4F8",
    teaser: "https://www.youtube.com/embed/SjOjxoweaRs",
  },
  {
    url: "https://www.youtube.com/embed/NCgr84pfGR4",
    teaser: "https://www.youtube.com/embed/Zp4JYZd8bz0",
  },
]

export default function VideoList({ ...props }) {
  const {} = props

  /********** SCROLL UTILS **********/
  const TopRef = useRef(null)

  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const variants = (key) => ({
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: key / 10,
      },
    },
    hidden: { opacity: 0 },
  })
  const controls = useAnimation()
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  /********** RENDER **********/
  return (
    <>
      <Stack
        ref={TopRef}
        sx={{
          scrollMarginTop: "80px",
        }}
      />

      <Stack ref={ref} width="100%" maxWidth="800px" margin="auto" gap="1rem">
        {data?.map((item, key) => (
          <motion.div
            key={key}
            initial="hidden"
            variants={variants(key)}
            animate={controls}
            style={{
              width: "100%",
              display: "flex",
              gap: "1rem",
            }}
          >
            <Stack width="100%" height="100%">
              <iframe
                width="100%"
                height="50%"
                src={item.url}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
                style={{
                  aspectRatio: "16/9",
                  borderRadius: "20px",
                }}
              ></iframe>
            </Stack>
            <Stack width="100%" height="100%">
              <iframe
                width="100%"
                src={item.teaser}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
                style={{
                  aspectRatio: "16/9",
                  borderRadius: "20px",
                }}
              ></iframe>
            </Stack>
          </motion.div>
        ))}
      </Stack>
    </>
  )
}
