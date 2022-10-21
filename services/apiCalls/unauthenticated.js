import { defaultConfig } from "../../config/defaultConfig"

const unauthenticated = {
  getMyServices: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/my-services`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
}

export default unauthenticated
