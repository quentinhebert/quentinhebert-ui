import { defaultConfig } from "../../config/defaultConfig"
import { getFreshToken } from "../utils"

const references = {
  /* Get public category videos for a given category */
  getAllPublic: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/references/public`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
  getAll: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/references`, {
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
  get: async (referenceId) => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/references/${referenceId}`, {
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
  addLogo: async (logo) => {
    try {
      let formData = new FormData()
      formData.append("logo", logo)
      return await fetch(`${defaultConfig.apiUrl}/references/logo`, {
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
  add: async (reference) => {
    const body = {
      type: reference.type,
      label: reference.label,
      logo_id: reference.logo.id,
    }
    try {
      return await fetch(`${defaultConfig.apiUrl}/references`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${await getFreshToken()}`,
          "Content-Type": "application/json",
        },
      })
    } catch (err) {
      console.error(err)
    }
  },
  update: async (reference) => {
    const body = {
      id: reference.id,
      logo: { id: reference.logo.id },
      label: reference.label,
      type: reference.type.id,
    }
    try {
      return await fetch(`${defaultConfig.apiUrl}/references/${reference.id}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${await getFreshToken()}`,
          "Content-Type": "application/json",
        },
      })
    } catch (err) {
      console.error(err)
    }
  },
  delete: async (reference) => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/references/${reference.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${await getFreshToken()}`,
          "Content-Type": "application/json",
        },
      })
    } catch (err) {
      console.error(err)
    }
  },
  sort: async (sortedReferenceIds) => {
    try {
      const body = JSON.stringify({ sortedReferenceIds })

      return await fetch(`${defaultConfig.apiUrl}/references/sort`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${await getFreshToken()}`,
          "Content-Type": "application/json",
        },
        body: body,
      })
    } catch (err) {
      console.error(err)
    }
  },
}

export default references
