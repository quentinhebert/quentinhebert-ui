import { defaultConfig } from "../../config/defaultConfig"
import { getFreshToken } from "../utils"

const application = {
  logo: {
    get: async () => {
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
    update: async (file) => {
      try {
        let formData = new FormData()
        formData.append("logo", file)
        return await fetch(`${defaultConfig.apiUrl}/admin/application/logo`, {
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
    getPublic: async () => {
      try {
        return await fetch(`${defaultConfig.apiUrl}/navbar/public`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
      } catch (error) {
        console.error(error)
      }
    },
    get: async () => {
      try {
        return await fetch(`${defaultConfig.apiUrl}/navbar`, {
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
    update: async (menuItems, idsToDelete) => {
      const body = { menu_items: menuItems, ids_to_delete: idsToDelete }
      try {
        return await fetch(`${defaultConfig.apiUrl}/admin/navbar`, {
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
    get: async () => {
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
    update: async (credits) => {
      const body = { credits }
      try {
        return await fetch(`${defaultConfig.apiUrl}/admin/footer`, {
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
    update: async (contactItems) => {
      const body = {
        address: contactItems.address,
        contact: contactItems.contact,
        social_medias: contactItems.social_medias,
      }
      try {
        return await fetch(`${defaultConfig.apiUrl}/admin/website-contact`, {
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
  },
}

export default application
