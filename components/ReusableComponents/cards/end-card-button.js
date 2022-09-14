import { Button, Stack } from "@mui/material"
import Link from "next/link"

export default function EndCardButton(props) {
  const { href, text, onClick } = props

  return (
    <Stack height="100%" justifyContent="end">
      {href ? (
        <Link href={href} passHref>
          <Button variant="outlined" color="secondary">
            {text}
          </Button>
        </Link>
      ) : (
        <Button variant="outlined" color="secondary" onClick={onClick}>
          {text}
        </Button>
      )}
    </Stack>
  )
}
