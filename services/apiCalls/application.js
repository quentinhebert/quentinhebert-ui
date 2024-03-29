import { defaultConfig } from "../../config/defaultConfig"
import { getFreshToken } from "../utils"

const application = {
  logo: {
    // Public
    getPublic: async () => {
      try {
        return await fetch(`${defaultConfig.apiUrl}/application/logo`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
      } catch (error) {
        console.error(error)
      }
    },
    // Admin only
    update: async (file) => {
      try {
        let formData = new FormData()
        formData.append("logo", file)
        return await fetch(`${defaultConfig.apiUrl}/application/logo`, {
          method: "POST",
          body: formData,
          mode: "cors",
          headers: {
            Authorization: `Bearer ${await getFreshToken()}`,
          },
        })
      } catch (err) {
        console.error(err)
      }
    },
  },
  navbar: {
    // Public
    getPublic: async () => {
      try {
        return await fetch(
          `${defaultConfig.apiUrl}/application/navbar/public`,
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
    // Admin only
    get: async () => {
      try {
        return await fetch(`${defaultConfig.apiUrl}/application/navbar`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${await getFreshToken()}`,
            "Content-Type": "application/json",
          },
        })
      } catch (err) {
        console.error(err)
      }
    },
    // Admin only
    update: async (menuItems, idsToDelete) => {
      const body = { menu_items: menuItems, ids_to_delete: idsToDelete }
      try {
        return await fetch(`${defaultConfig.apiUrl}/application/navbar`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${await getFreshToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
      } catch (err) {
        console.error(err)
      }
    },
  },
  footer: {
    // Public
    getPublic: async () => {
      try {
        return await fetch(
          `${defaultConfig.apiUrl}/application/footer/public`,
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
    // Admin only
    update: async (credits) => {
      const body = { credits }
      try {
        return await fetch(`${defaultConfig.apiUrl}/application/footer`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${await getFreshToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
      } catch (err) {
        console.error(err)
      }
    },
  },
  contact: {
    // Public
    getPublic: async () => {
      try {
        return await fetch(
          `${defaultConfig.apiUrl}/application/contact/public`,
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
    // Admin only
    get: async () => {
      try {
        return await fetch(`${defaultConfig.apiUrl}/application/contact`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${await getFreshToken()}`,
            "Content-Type": "application/json",
          },
        })
      } catch (error) {
        console.error(error)
      }
    },
    // Admin only
    update: async (contactItems) => {
      const body = {
        address: contactItems.address,
        contact: contactItems.contact,
        social_medias: contactItems.social_medias,
      }
      try {
        return await fetch(`${defaultConfig.apiUrl}/application/contact`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${await getFreshToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
      } catch (error) {
        console.error(error)
      }
    },
    // Public
    sendForm: async (clientData) => {
      try {
        const body = JSON.stringify(clientData)
        return await fetch(
          `${defaultConfig.apiUrl}/application/contact/send-form`,
          {
            method: "POST",
            body: body,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
      } catch (error) {
        console.error(error)
      }
    },
  },
  termsOfUse: {
    get: async () => {
      try {
        return await fetch(`${defaultConfig.apiUrl}/application/terms-of-use`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
      } catch (error) {
        console.error(error)
      }
    },
    // Admin only
    update: async (termsOfUse) => {
      const body = { terms_of_use: termsOfUse }
      try {
        return await fetch(`${defaultConfig.apiUrl}/application/terms-of-use`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getFreshToken()}`,
          },
          body: JSON.stringify(body),
        })
      } catch (error) {
        console.error(error)
      }
    },
  },
  termsAndConditions: {
    get: async () => {
      try {
        return await fetch(
          `${defaultConfig.apiUrl}/application/terms-and-conditions`,
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
    // Admin only
    update: async ({ terms, conditions }) => {
      const body = { terms, conditions }
      try {
        return await fetch(
          `${defaultConfig.apiUrl}/application/terms-and-conditions`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${await getFreshToken()}`,
            },
            body: JSON.stringify(body),
          }
        )
      } catch (error) {
        console.error(error)
      }
    },
  },
  QandA: {
    get: async () => {
      try {
        return await fetch(
          `${defaultConfig.apiUrl}/application/questions-and-answers`,
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
    // Admin only
    update: async (text) => {
      const body = { q_and_a: text }
      try {
        return await fetch(
          `${defaultConfig.apiUrl}/application/questions-and-answers`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${await getFreshToken()}`,
            },
            body: JSON.stringify(body),
          }
        )
      } catch (error) {
        console.error(error)
      }
    },
  },
  countries: {
    get: async () => {
      try {
        return await fetch(
          `https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json`,
          {
            method: "GET",
            mode: "cors",
          }
        )
      } catch (error) {
        console.error(error)
      }
    },
  },
  introductionVideo: {
    // Public
    get: async () => {
      try {
        return await fetch(
          `${defaultConfig.apiUrl}/application/introduction-video`,
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
    // Admin only
    update: async ({ url }) => {
      try {
        const body = JSON.stringify({ url })
        return await fetch(
          `${defaultConfig.apiUrl}/application/introduction-video`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${await getFreshToken()}`,
            },
            body,
          }
        )
      } catch (error) {
        console.error(error)
      }
    },
  },
  redirections: {
    // Public
    getOrinialUrl: async ({ id }) => {
      try {
        return await fetch(
          `${defaultConfig.apiUrl}/application/redirections/${id}`,
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
  },
}

export default application
