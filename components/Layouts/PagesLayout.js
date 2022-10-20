import PageRoot from "../ReusableComponents/page-builder/page-root"
import Footer from "../Navigation/Footers/Footer"
import HtmlHead from "../ReusableComponents/page-builder/html-head"
import { motion } from "framer-motion"
import Navbar from "../Navigation/Navbars/navbar"

export default function PagesLayout({
  children,
  navbarData,
  footerData,
  head,
}) {
  return (
    <>
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
        </PageRoot>
      </motion.div>
    </>
  )
}
