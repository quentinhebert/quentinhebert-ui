const YoutubeIcon = "/medias/social_icons/youtube.svg"
const FacebookIcon = "/medias/social_icons/facebook.svg"
const InstagramIcon = "/medias/social_icons/instagram.svg"
const TiktokIcon = "/medias/social_icons/tiktok.svg"
const LinkedinIcon = "/medias/social_icons/linkedin.svg"
const SnapchatIcon = "/medias/social_icons/snapchat.svg"
const PinterestIcon = "/medias/social_icons/pinterest.svg"
const WhatsappIcon = "/medias/social_icons/whatsapp.svg"
const VimeoIcon = "/medias/social_icons/vimeo.svg"
const TwitterIcon = "/medias/social_icons/twitter.svg"

export default function getSocialIcon(type) {
  switch (type) {
    case "youtube_url":
      return YoutubeIcon
    case "facebook_url":
      return FacebookIcon
    case "instagram_url":
      return InstagramIcon
    case "tiktok_url":
      return TiktokIcon
    case "linkedin_url":
      return LinkedinIcon
    case "snapchat_url":
      return SnapchatIcon
    case "pinterest_url":
      return PinterestIcon
    case "whatsapp_url":
      return WhatsappIcon
    case "vimeo_url":
      return VimeoIcon
    case "twitter_url":
      return TwitterIcon
    default:
      return ""
  }
}
