import * as React from "react"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import adminTree from "../../Navigation/Admin/admin-tree"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Breadcrumbs() {
  const tree = adminTree
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
      flexDirection="row"
      alignItems="center"
      gap={1.5}
    >
      {breadcrumbs.map((item, key) => {
        const isCurrentPage = key + 1 === pages.length // current page === last element of the breadcrumbs
        return (
          <Stack flexDirection="row" alignItems="center" gap={1.5}>
            <Link
              key={key}
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
            {!isCurrentPage && <Typography>{">"}</Typography>}
          </Stack>
        )
      })}
    </Stack>
  )
}
