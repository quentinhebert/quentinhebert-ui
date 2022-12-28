import PageRoot from "../Containers/page-root"
import Footer from "../Navigation/Footers/Footer"
import { motion } from "framer-motion"
import Navbar from "../Navigation/Navbars/navbar"
import HtmlHead from "../Helpers/html-head"
import { useRef } from "react"
import ScrollToTopBtn from "../Navigation/scroll-to-top"
import { Stack } from "@mui/material"
import { VerticalMenuBar } from "../Navigation/Navbars/vertical-menu-bar"

export default function LoggedPagesLayout({
  children,
  navbarData,
  footerData,
  head,
}) {
  const topRef = useRef()

  return (
    <Stack width="100%" className="row" ref={topRef}>
      <VerticalMenuBar />

      <Stack
        sx={{
          width: { xs: "100%", md: "calc(100% - 55px)" },
          marginLeft: { xs: "0", md: "55px" },
        }}
      >
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
      </Stack>
    </Stack>
  )
}
