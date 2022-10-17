import apiCall from "./apiCalls/apiCall"

export const fetchers = {
  footer: async () => {
    const res = await apiCall.unauthenticated.getFooter()
    const jsonRes = await res.json()
    return jsonRes
  },
  websiteContact: async () => {
    const res = await apiCall.unauthenticated.getWebsiteContact()
    const jsonRes = await res.json()
    return jsonRes
  },
  films: async () => {
    const res = await apiCall.unauthenticated.getAllFilms()
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
