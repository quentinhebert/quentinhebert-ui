import * as React from "react"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import adminTree from "../../../enums/breadcrumbs-trees/admin-tree"
import Link from "next/link"
import { useRouter } from "next/router"
import { PANELTYPES } from "../../../enums/panelTypes"
import accountTree from "../../../enums/breadcrumbs-trees/account-tree"

export default function Breadcrumbs(props) {
  const { panel } = props

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

  return (
    <Stack
      zIndex={1}
      color="#fff"
      alignItems="center"
      gap={1.5}
      sx={{
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      {breadcrumbs.map((item, key) => {
        const isCurrentPage = key + 1 === pages.length // current page === last element of the breadcrumbs
        if (!item.label) return <></>
        return (
          <Stack flexDirection="row" alignItems="center" gap={1.5} key={key}>
            <Link
              href={item.href}
              passHref
              style={{
                cursor: !isCurrentPage ? "pointer" : "default",
              }}
            >
              <Typography
                component={!isCurrentPage ? "a" : "div"}
                className={!isCurrentPage ? "cool-button" : "no-select"}
                sx={{
                  cursor: !isCurrentPage ? "pointer" : "default",
                  "&:hover": {
                    color: !isCurrentPage
                      ? (theme) => theme.palette.text.secondary
                      : null,
                  },
                }}
              >
                {item.label}
              </Typography>
            </Link>
            {!isCurrentPage && breadcrumbs[key + 1].label && (
              <Typography>{">"}</Typography>
            )}
          </Stack>
        )
      })}
    </Stack>
  )
}
