import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Link from "next/link"
import { useRouter } from "next/router"
import adminTree from "../../enums/breadcrumbs-trees/admin-tree"
import accountTree from "../../enums/breadcrumbs-trees/account-tree"
import dashboardTree from "../../enums/breadcrumbs-trees/dashboard-tree"
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
  if (panel === PANELTYPES.DASHOBARD) tree = dashboardTree

  let breadcrumbs = []
  const path = []

  const { pathname, asPath } = useRouter() // get url path
  const pages = pathname.split("/") // set an array where each row is the identifier of the page (ref: admin-tree)
  const pagesWithQueryParams = asPath.split("/") // set an array where each row is the identifier of the page (ref: admin-tree)
  pages.shift() // remove first row of the array
  pagesWithQueryParams.shift() // remove first row of the array

  for (let i = pages.length; i > 0; i--) {
    if (
      !!tree[pages[pages.length - i]]?.label &&
      !!tree[pages[pages.length - i]]?.href
    )
      breadcrumbs.push({
        label: tree[pages[pages.length - i]].label,
        href: tree[pages[pages.length - i]].href,
      })
    else {
      path.push(pages[pages.length - i])
      breadcrumbs.push({
        label: tree[pages[pages.length - i]],
        href: "/" + path.join("/"),
      })
    }
    if (
      !!tree[pagesWithQueryParams[pagesWithQueryParams.length - i]]?.label &&
      !!tree[pagesWithQueryParams[pagesWithQueryParams.length - i]]?.href
    )
      breadcrumbs.push({
        label:
          tree[pagesWithQueryParams[pagesWithQueryParams.length - i]].label,
        href: tree[pagesWithQueryParams[pagesWithQueryParams.length - i]].href,
      })
  }
  // Remode duplicated elements
  breadcrumbs = breadcrumbs.filter(
    (value, index, self) =>
      index ===
      self.findIndex(
        (t) => (t.href === value.href && t.label === value.label) || t === value
      )
  )

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
        if (!item.label) return <Stack key={key} display="none"></Stack>

        if (isExpanded || isCurrentPage || !sm)
          return (
            <Link href={item.href} passHref key={key}>
              <motion.div
                initial={{ opacity: sm ? 0 : 1 }}
                animate={{ opacity: 1 }}
                transition={{ delay: key / 10, duration: 0.5 }}
                style={{
                  zIndex: breadcrumbs.length - key,
                  position: "relative",
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
                    "&:hover": {
                      background: (theme) =>
                        isCurrentPage
                          ? "current"
                          : theme.palette.background.secondary,
                    },
                  }}
                >
                  <Typography
                    className="no-select"
                    sx={{
                      color: "#fff",
                      filter: "drop-shadow(3px 4px 10px rgba(0,0,0,0.87))",
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
