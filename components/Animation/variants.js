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
    x: -10,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1 },
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
