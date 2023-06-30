import { Stack } from "@mui/material"
import { Html, Head, Main, NextScript } from "next/document"
import Script from "next/script"
import { defaultConfig } from "../config/defaultConfig"

export default function Document() {
  return (
    <Html>
      <Head></Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
