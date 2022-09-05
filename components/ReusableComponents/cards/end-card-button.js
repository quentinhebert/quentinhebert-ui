import { Button } from "@mui/material"
import Link from "next/link"

export default function EndCardButton(props) {
  const { href, text } = props

  return (
    <Link href={href} passHref>
      <Button variant="outlined" color="secondary">
        {text}
      </Button>
    </Link>
  )
}
