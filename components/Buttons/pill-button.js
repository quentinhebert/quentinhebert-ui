import { Box, Button } from "@mui/material"
import { useAnimation, motion } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import NextLink from "../Helpers/next-link"

export default function PillButton({ href, ...props }) {
  if (!!href)
    return (
      <NextLink href={href}>
        <Btn {...props} />
      </NextLink>
    )
  return <Btn {...props} />
}

function Btn({
  width,
  background,
  padding,
  color,
  margin,
  textTransform,
  onClick,
  animDelay,
  fontSize,
  preventTransitionOut,
  preventTransition,
  border,
  boxShadow,
  scaleUpOnHover,
  borderRadius,
  fontFamily,
  disabled,
  gap,
  display,
  sx,
  ...props
}) {
  /********** ANIMATION **********/
  const [ref, inView] = useInView()
  const variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, delay: animDelay || 0 },
    },
    hidden: { opacity: 0, y: -5 },
  }
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else if (!preventTransitionOut && !preventTransition) {
      controls.start("hidden")
    }
  }, [controls, inView])

  let hover = {
    background:
      (!disabled && background) || ((theme) => theme.palette.secondary.main),
    opacity: !disabled && 0.8,
    transform: !disabled && scaleUpOnHover ? "scale(1.05)" : "",
  }

  if (!!sx && sx["&:hover"]) hover = { ...hover, ...sx["&:hover"] }

  return (
    <Box margin={margin || 0} width={width || "auto"} ref={ref}>
      <motion.div
        initial={preventTransition ? "visible" : "hidden"}
        variants={variants}
        animate={controls}
        style={{ width: "100%" }}
      >
        <Button
          variant="contained"
          disabled={disabled}
          sx={{
            background: background || ((theme) => theme.palette.secondary.main),
            color: color || "#000",
            fontWeight: "bold",
            fontSize: fontSize || { xs: "0.9rem", md: "1rem" },
            borderRadius: borderRadius || "30px",
            border: border || "",
            padding: padding || { xs: ".5rem 1.25rem", md: ".5rem 2rem" },
            boxShadow: boxShadow || "5px 10px 30px 5px rgb(0,0,0,0.3)",
            textTransform: textTransform || "initial",
            transition: "transform 0.2s ease-in-out",
            fontFamily: fontFamily || "",
            gap: gap || 0,
            width: width || "100%",
            display: display || "inline-flex",
            minWidth: "0px !important",
            ...sx,
            "&:hover": hover,
          }}
          onClick={onClick || (() => {})}
          {...props}
        />
      </motion.div>
    </Box>
  )
}
