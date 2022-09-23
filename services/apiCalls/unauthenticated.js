import { defaultConfig } from "../../config/defaultConfig"
import { getFreshToken } from "../utils"

const unauthenticated = {
  /* LOGIN */
  login: async ({ email, password }) => {
    try {
      const encodedPassword = new Buffer.from(password).toString("base64")
      const body = {
        email,
        password: encodedPassword,
      }
      return await fetch(`${defaultConfig.apiUrl}/login`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
  /* Send password forgotten request to given email address */
  passwordForgotten: async ({ userData }) => {
    const body = { email: userData.email }
    try {
      return await fetch(`${defaultConfig.apiUrl}/password-forgotten`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
  /* Try to access password forgotten page with link */
  passwordResetAccess: async (token) => {
    try {
      return await fetch(
        `${defaultConfig.apiUrl}/reset-password-access/${token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    } catch (error) {
      console.error(error)
    }
  },
  /* Reset password */
  passwordReset: async ({ password, id, token }) => {
    try {
      const encodedPassword = new Buffer.from(password).toString("base64")
      const body = { password: encodedPassword, token }
      return await fetch(`${defaultConfig.apiUrl}/users/${id}/password-reset`, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
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
  /* Get public film types */
  getFilmTypes: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/film-types`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
  /* Get public film gear */
  getFilmGear: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/film-gear`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
  /* Get public film gear */
  getFilmRoles: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/film-roles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
  /* Get public categories for website homepage */
  getWorkPageData: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/workpage`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
  /* Get public categories for website homepage */
  sendContactForm: async (clientData) => {
    try {
      const body = JSON.stringify(clientData)
      return await fetch(`${defaultConfig.apiUrl}/contact-form`, {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
  /* Get public category videos for a given category */
  getCategoryVideos: async (categoryId) => {
    try {
      return await fetch(
        `${defaultConfig.apiUrl}/categories/${categoryId}/videos`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    } catch (error) {
      console.error(error)
    }
  },
  /* Get all public categories' videos */
  getCategoriesVideos: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/categories/videos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
  /* Get public category with given id */
  getCategoryVideo: async (videoId) => {
    try {
      return await fetch(
        `${defaultConfig.apiUrl}/categories/videos/${videoId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
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
  /* Get reference with given id */
  getReference: async (referenceId) => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/references/${referenceId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
  getNavbar: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/navbar`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
  getFooter: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/footer`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
  getWebsiteContact: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/website-contact`, {
        method: "GET",
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
}

export default unauthenticated
