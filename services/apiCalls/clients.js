import { defaultConfig } from "../../config/defaultConfig"
import { getFreshToken } from "../utils"

const clients = {
  addresses: {
    // Client and Admin
    getAll: async (client) => {
      try {
        return await fetch(
          `${defaultConfig.apiUrl}/clients/${client.id}/addresses`,
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
    // Client and Admin
    add: async ({ client, address }) => {
      try {
        const body = {
          fullname: address.fullname,
          phone: address.phone,
          line1: address.line1,
          line2: address.line2,
          postal_code: address.postalCode,
          city: address.city,
          region: address.region,
          country: address.country,
          details: address.details,
        }
        return await fetch(
          `${defaultConfig.apiUrl}/clients/${client.id}/addresses`,
          {
            method: "POST",
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
    // Client and Admin
    update: async ({ client, address }) => {
      try {
        const body = {
          fullname: address.fullname,
          phone: address.phone,
          line1: address.line1,
          line2: address.line2,
          postal_code: address.postalCode,
          city: address.city,
          region: address.region,
          country: address.country,
          details: address.details,
        }
        return await fetch(
          `${defaultConfig.apiUrl}/clients/${client.id}/addresses/${address.id}`,
          {
            method: "PUT",
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
    // Client and Admin
    delete: async ({ client, address }) => {
      try {
        return await fetch(
          `${defaultConfig.apiUrl}/clients/${client.id}/addresses/${address.id}`,
          {
            method: "DELETE",
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
  },
}

export default clients