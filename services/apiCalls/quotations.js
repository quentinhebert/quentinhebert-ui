import { defaultConfig } from "../../config/defaultConfig"
import { getFreshToken } from "../utils"

const files = {
  // Admin only
  create: async ({ label, status, items }) => {
    const body = { label, status, items }
    try {
      return await fetch(`${defaultConfig.apiUrl}/quotations`, {
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
  // Admin only
  save: async ({ label, status, items, id }) => {
    const body = { label, status, items }
    try {
      return await fetch(`${defaultConfig.apiUrl}/quotations/${id}`, {
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
  // Admin only
  get: async ({ id }) => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/quotations/${id}`, {
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
  getAll: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/quotations`, {
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
  delete: async ({ id }) => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/quotations/${id}`, {
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
  // Admin only
  send: async ({ id, email }) => {
    const body = { email }
    try {
      return await fetch(`${defaultConfig.apiUrl}/quotations/${id}/send`, {
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
  // Public
  view: async ({ id, email, auth }) => {
    let headers = {
      "Content-Type": "application/json",
    }
    if (auth)
      headers = {
        Authorization: `Bearer ${await getFreshToken()}`,
        "Content-Type": "application/json",
      }
    const body = { email }
    try {
      return await fetch(`${defaultConfig.apiUrl}/quotations/${id}/view`, {
        method: "PUT",
        headers,
        body: JSON.stringify(body),
      })
    } catch (err) {
      console.error(err)
    }
  },
  // Public
  accept: async (
    props = {
      firstname,
      lastname,
      email,
      phone,
      line1,
      line2,
      postal_code,
      city,
      region,
      country,
    },
    { id }
  ) => {
    const body = props
    try {
      return await fetch(`${defaultConfig.apiUrl}/quotations/${id}/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
    } catch (err) {
      console.error(err)
    }
  },
  // Admin only
  assignClient: async ({ id, clientId }) => {
    const body = { client_id: clientId }
    try {
      return await fetch(
        `${defaultConfig.apiUrl}/quotations/${id}/assign-client`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${await getFreshToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      )
    } catch (err) {
      console.error(err)
    }
  },
  requests: {
    // Admin only
    getAll: async () => {
      try {
        return await fetch(`${defaultConfig.apiUrl}/quotations/requests`, {
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
    get: async ({ id }) => {
      try {
        return await fetch(
          `${defaultConfig.apiUrl}/quotations/requests/${id}`,
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
    // Admin only
    setOpened: async ({ id, opened }) => {
      const body = { opened }
      try {
        return await fetch(
          `${defaultConfig.apiUrl}/quotations/requests/${id}/opened`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${await getFreshToken()}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        )
      } catch (err) {
        console.error(err)
      }
    },
  },
}

export default files
