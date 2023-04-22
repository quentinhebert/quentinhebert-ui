import { defaultConfig } from "../../config/defaultConfig"
import { getFreshToken } from "../utils"

const services = {
  getAll: async ({ auth }) => {
    try {
      let headers = {
        "Content-Type": "application/json",
      }
      if (!!auth) headers.Authorization = `Bearer ${await getFreshToken()}`

      return await fetch(`${defaultConfig.apiUrl}/my-services`, {
        method: "GET",
        headers,
      })
    } catch (error) {
      console.error(error)
    }
  },
  // Admin Only
  update: async ({ id, name, service_items }) => {
    const body = { id, name, service_items }
    try {
      return await fetch(`${defaultConfig.apiUrl}/my-services/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${await getFreshToken()}`,
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
  // Admin Only
  add: async (service = { name: { fr, en } }) => {
    const body = service
    try {
      return await fetch(`${defaultConfig.apiUrl}/my-services`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${await getFreshToken()}`,
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
  // Admin Only
  delete: async ({ id }) => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/my-services/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${await getFreshToken()}`,
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
  // Admin Only
  sort: async (sortedServiceIds) => {
    const body = { sortedServiceIds }
    try {
      return await fetch(`${defaultConfig.apiUrl}/my-services/sort`, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${await getFreshToken()}`,
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
}

export default services
