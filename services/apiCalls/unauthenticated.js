import { defaultConfig } from "../../config/defaultConfig"

const unauthenticated = {
  /* Try to access email-confirmation page with link and updates DB email_confirmed=true */
  emailConfirm: async (token) => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/email-confirmation`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
  /* Try to access change-email page with link */
  changeEmail: async (token) => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/change-email/${token}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
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
  /* Get public category videos for a given category */
  getReferences: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/references`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
  getWebsiteTags: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/website-tags`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
  getWebsiteSlides: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/websites/slides`, {
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
