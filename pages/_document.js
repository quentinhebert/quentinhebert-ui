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
                appId      : ${defaultConfig.facebookAppId},
                xfbml      : true,
                version    : 'v17.0'
              });
              FB.AppEvents.logPageView();
            };
          
            (function(d, s, id){
               var js, fjs = d.getElementsByTagName(s)[0];
               if (d.getElementById(id)) {return;}
               js = d.createElement(s); js.id = id;
               js.src = "https://connect.facebook.net/en_US/sdk.js";
               fjs.parentNode.insertBefore(js, fjs);
             }(document, 'script', 'facebook-jssdk'));`,
          }}
        ></script>
        <NextScript />
      </body>
    </Html>
  )
}
