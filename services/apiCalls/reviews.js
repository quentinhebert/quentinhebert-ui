import { defaultConfig } from "../../config/defaultConfig"
import { getFreshToken } from "../utils"

const reviews = {
  // Admin only
  create: async ({ user_id }) => {
    try {
      const body = JSON.stringify({ user_id })
      return await fetch(`${defaultConfig.apiUrl}/reviews`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await getFreshToken()}`,
          "Content-Type": "application/json",
        },
        body,
      })
    } catch (error) {
      console.error(error)
    }
  },
  // Admin only
  update: async ({ id, visible, editable }) => {
    try {
      const body = JSON.stringify({ visible, editable })
      return await fetch(`${defaultConfig.apiUrl}/reviews/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${await getFreshToken()}`,
          "Content-Type": "application/json",
        },
        body,
      })
    } catch (error) {
      console.error(error)
    }
  },
  post: async ({ id, label, description, grade }) => {
    try {
      const body = JSON.stringify({ label, description, grade })
      return await fetch(`${defaultConfig.apiUrl}/reviews/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      })
    } catch (error) {
      console.error(error)
    }
  },
  get: async ({ id }) => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/reviews/${id}`, {
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
  getAll: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/reviews`, {
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
  getAllPublic: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/reviews/public`, {
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
  delete: async ({ id }) => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/reviews/${id}`, {
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
}

export default reviews
