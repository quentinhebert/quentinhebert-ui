export const isYoutube = (path) => {
  let response = false
  const acceptedBaseUrls = [
    "https://www.youtube.com",
    "https://youtu.be",
    "youtu.be",
    "www.youtube.com",
    "youtube.com",
  ]

  acceptedBaseUrls.map((url) => {
    if (path.indexOf(url) === 0) response = true
  })

  return response
}

export const isVimeo = (path) => {
  let response = false
  const acceptedBaseUrls = ["https://vimeo.com", "vimeo.com"]

  acceptedBaseUrls.map((url) => {
    if (path.indexOf(url) === 0) response = true
  })

  return response
}
