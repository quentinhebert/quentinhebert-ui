import { defaultConfig } from "../../config/defaultConfig"
import { getFreshToken } from "../utils"

const events = {
  // Admin only
  getAllByUser: async ({ userId }) => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/events/users/${userId}`, {
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
  getDateEventsByUser: async ({ date, userId }) => {
    try {
      return await fetch(
        `${defaultConfig.apiUrl}/events/users/${userId}/date/${date}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${await getFreshToken()}`,
            "Content-Type": "application/json",
          },
        }
      )
    } catch (err) {
      console.error(err)
    }
  },
  get: async ({ id }) => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/events/${id}`, {
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
  create: async ({ event }) => {
    const body = event
    try {
      return await fetch(`${defaultConfig.apiUrl}/events`, {
        method: "POST",
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
  update: async ({ event }) => {
    const body = event
    try {
      return await fetch(`${defaultConfig.apiUrl}/events/${event.id}`, {
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
  delete: async ({ id }) => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/events/${id}`, {
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
}

export default events
