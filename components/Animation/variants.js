import { ease } from "../Animation/eases"

export const moveLeftVariants = {
  hidden: {
    opacity: 0,
    x: 10,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1 },
  },
}
export const moveRightVariants = {
  hidden: {
    opacity: 0,
    x: "-5%",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease },
  },
}
export const moveDownVariants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1 },
  },
}
export const fadeVariant = {
  hidden: {
    opacity: 0,
    transition: { duration: 1, ease },
  },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease },
  },
}
export const zoomInVariant = {
  hidden: {
    opacity: 0,
    scale: 0,
    transition: { duration: 0.75 },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75 },
  },
}
