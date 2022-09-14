import { Button, Stack } from "@mui/material"
import Link from "next/link"

export default function EndCardButton(props) {
  const { href, text } = props

  return (
    <Stack height="100%" justifyContent="end">
      <Link href={href} passHref>
        <Button variant="outlined" color="secondary">
          {text}
        </Button>
      </Link>
    </Stack>
  )
}
