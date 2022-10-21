import apiCall from "./apiCalls/apiCall"

export const fetchers = {
  navbar: async () => {
    const res = await apiCall.application.navbar.getPublic()
    const jsonRes = await res.json()
    return jsonRes
  },
  footer: async () => {
    const res = await apiCall.application.footer.get()
    const jsonRes = await res.json()
    return jsonRes
  },
  websiteContact: async () => {
    const res = await apiCall.application.contact.getPublic()
    const jsonRes = await res.json()
    return jsonRes
  },
  films: async () => {
    const res = await apiCall.films.getAllPublic()
    const jsonRes = await res.json()
    return jsonRes
  },
  websites: async () => {
    const res = await apiCall.websites.getAllPublic()
    const jsonRes = await res.json()
    return jsonRes
  },
  websiteSlides: async () => {
    const res = await apiCall.websites.slides.getAllPublic()
    const jsonRes = await res.json()
    return jsonRes
  },
  services: async () => {
    const res = await apiCall.unauthenticated.getMyServices()
    const jsonRes = await res.json()
    return jsonRes
  },
}

const prepareProps = async (componentNames) => {
  let data = {}
  let notFound = false
  await Promise.all(
    componentNames.map(async (componentName) => {
      const result = await fetchers[componentName]()
      if (result.statusCode === 400 || result.statusCode === 404)
        notFound = true
      data[componentName] = result
    })
  )
  return { props: data, notFound, revalidate: 60 }
}

export default prepareProps
