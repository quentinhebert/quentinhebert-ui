import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Link from "next/link"
import { useRouter } from "next/router"
import adminTree from "../../enums/breadcrumbs-trees/admin-tree"
import accountTree from "../../enums/breadcrumbs-trees/account-tree"
import { PANELTYPES } from "../../enums/panelTypes"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { useState } from "react"
import { useMediaQuery } from "@mui/material"
import { motion } from "framer-motion"

export default function Breadcrumbs(props) {
  const { panel } = props

  const sm = useMediaQuery((theme) => theme.breakpoints.down("sm"))

  const [isExpanded, setIsExpanded] = useState(false)

  if (!Object.values(PANELTYPES).includes(panel))
    alert("Attention, le panneau est mal configuré pour le breadcrumbs")

  let tree = []
  if (panel === PANELTYPES.ADMIN) tree = adminTree
  if (panel === PANELTYPES.ACCOUNT) tree = accountTree

  const breadcrumbs = []
  const path = []

  const { pathname } = useRouter() // get url path
  const pages = pathname.split("/") // set an array where each row is the identifier of the page (ref: admin-tree)
  pages.shift() // remove first row of the array

  for (let i = pages.length; i > 0; i--) {
    path.push(pages[pages.length - i])

    breadcrumbs.push({
      label: tree[pages[pages.length - i]],
      href: "/" + path.join("/"),
    })
  }

  const toggleExpand = () => {
    if (!sm) return
    if (!isExpanded) return setIsExpanded(true)
    return setIsExpanded(false)
  }

  return (
    <Stack
      zIndex={1}
      color="#fff"
      gap={1.5}
      sx={{
        alignItems: { xs: "", sm: "center" },
        flexDirection: { xs: "column", sm: "row" },
        paddingLeft: { xs: "auto", sm: "50px" },
        overflow: "hidden",
      }}
    >
      {breadcrumbs.map((item, key) => {
        const isCurrentPage = key + 1 === pages.length // current page === last element of the breadcrumbs
        if (!item.label) return <></>
        if (isExpanded || isCurrentPage || !sm)
          return (
            <Link href={item.href} passHref>
              <motion.div
                initial={{ opacity: sm ? 0 : 1 }}
                animate={{ opacity: 1 }}
                transition={{ delay: key / 10, duration: 0.5 }}
                key={key}
                style={{
                  zIndex: -key,
                }}
              >
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  key={key}
                  onClick={sm ? toggleExpand : () => {}}
                  sx={{
                    background: (theme) =>
                      isCurrentPage
                        ? `linear-gradient(90deg, ${theme.palette.tersary.main}, ${theme.palette.background.secondary})`
                        : "#313030",
                    padding: "8px 20px",
                    borderRadius: "30px",
                    boxShadow: "6px 0px 22px -1px rgba(0,0,0,0.5)",
                    marginLeft: { xs: "0", sm: "-50px" },
                    paddingLeft: {
                      xs: "auto",
                      sm: key !== 0 ? "60px" : "auto",
                    },
                    cursor: !isCurrentPage || sm ? "pointer" : "default",
                    color: (theme) =>
                      isCurrentPage
                        ? theme.palette.background.darkGrey
                        : "current",
                    "&:hover": {
                      background: (theme) =>
                        isCurrentPage
                          ? "current"
                          : theme.palette.background.secondary,
                      color: (theme) => theme.palette.background.darkGrey,
                    },
                  }}
                >
                  <Typography
                    className="no-select"
                    sx={{
                      fontSize: "0.8rem",
                    }}
                  >
                    {item.label}
                  </Typography>
                  {breadcrumbs.length > 1 && isCurrentPage && sm && (
                    <Stack flexGrow={1}>
                      <KeyboardArrowUpIcon
                        sx={{
                          alignSelf: "flex-end",
                          rotate: isExpanded ? "" : "180deg",
                          transition: "rotate 0.3s ease-in-out",
                        }}
                      />
                    </Stack>
                  )}
                </Stack>
              </motion.div>
            </Link>
          )
        return <></>
      })}
    </Stack>
  )
}
