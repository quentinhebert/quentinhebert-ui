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
        <script
          dangerouslySetInnerHTML={{
            __html: `window.fbAsyncInit = function() {
        FB.init({
          appId  : ${defaultConfig.facebookAppId},
          status : true, // check login status
          cookie : true, // enable cookies to allow the server to access the session
          xfbml  : true,  // parse XFBML
          version: v17.0
        });
      };

      (function() {
        var e = document.createElement('script');
        e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
        e.async = true;
        document.getElementById('fb-root').appendChild(e);
      }());`,
          }}
        ></script>
        <div id="fb-root"></div>
        <NextScript />
      </body>
    </Html>
  )
}
