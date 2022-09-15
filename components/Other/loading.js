import { Stack } from "@mui/material"
import Image from "next/image"
import { motion } from "framer-motion"
const logoQH = "/logos/logo-qh.png"

const LogoQH = () => <Image src={logoQH} width="100%" height="80%" />

export default function Loading() {
  return (
    <Stack
      width="100%"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0, duration: 1 }}
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LogoQH />
      </motion.div>
    </Stack>
  )
}
