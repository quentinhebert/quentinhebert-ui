import { Stack } from "@mui/material"
import { Html, Head, Main, NextScript } from "next/document"
import Script from "next/script"

export default function Document() {
  return (
    <Html>
      <Head>
        <Script src="/facebook-init.js" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
