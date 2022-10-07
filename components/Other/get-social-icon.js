import YoutubeIcon from "../../public/medias/social_icons/youtube.svg"
import FacebookIcon from "../../public/medias/social_icons/facebook.svg"
import InstagramIcon from "../../public/medias/social_icons/instagram.svg"
import TiktokIcon from "../../public/medias/social_icons/tiktok.svg"
import LinkedinIcon from "../../public/medias/social_icons/linkedin.svg"
import SnapchatIcon from "../../public/medias/social_icons/snapchat.svg"
import PinterestIcon from "../../public/medias/social_icons/pinterest.svg"
import WhatsappIcon from "../../public/medias/social_icons/whatsapp.svg"
import VimeoIcon from "../../public/medias/social_icons/vimeo.svg"
import TwitterIcon from "../../public/medias/social_icons/twitter.svg"

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
