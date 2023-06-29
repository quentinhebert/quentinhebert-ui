export const defaultConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8888",
  websiteName: process.env.NEXT_PUBLIC_WEBSITE_NAME || "Quentin Hébert",
  webclientUrl:
    process.env.NEXT_PUBLIC_WEBCLIENT_URL || "http://localhost:3000",
  ftpPublicBasePath: process.env.NEXT_PUBLIC_FTP_PUBLIC_BASEPATH,
  stage: process.env.NEXT_PUBLIC_STAGE,
  googleId: process.env.NEXT_PUBLIC_GOOGLE_ID,
  facebookAppId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
}
