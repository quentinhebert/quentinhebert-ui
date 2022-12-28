import PageRoot from "../Containers/page-root"
import Footer from "../Navigation/Footers/Footer"
import { motion } from "framer-motion"
import Navbar from "../Navigation/Navbars/navbar"
import HtmlHead from "../Helpers/html-head"
import { useContext, useRef } from "react"
import ScrollToTopBtn from "../Navigation/scroll-to-top"
import { Stack } from "@mui/material"
import { UserContext } from "../../contexts/UserContext"
import LoggedPagesLayout from "./LoggedPagesLayout"

export default function PagesLayout({
  children,
  navbarData,
  footerData,
  head,
}) {
  const topRef = useRef()

  const { user } = useContext(UserContext)

  if (user)
    return (
      <LoggedPagesLayout
        children={children}
        navbarData={navbarData}
        footerData={footerData}
        head={head}
      />
    )

  return (
    <>
      <Stack ref={topRef} />
      <Navbar staticData={navbarData} />

      <motion.div
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <PageRoot>
          <HtmlHead
            title={head.title}
            description={head.description}
            keywords={head.keywords}
            follow={head.follow}
            type={head.type}
            ogImg={head.ogImg}
          />

          {children}

          <Footer staticData={footerData} />

          <ScrollToTopBtn refForScroll={topRef} />
        </PageRoot>
      </motion.div>
    </>
  )
}
