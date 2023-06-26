import { defaultConfig } from "../../config/defaultConfig"
import { getFreshToken } from "../utils"

const clients = {
  // Users self
  get: async ({ id }) => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/clients/${id}`, {
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
  create: async (
    props = {
      email,
      firstname,
      lastname,
      vat_number,
      company,
      phone,
      line1,
      line2,
      postal_code,
      city,
      region,
      country,
    }
  ) => {
    try {
      const body = JSON.stringify(props)
      return await fetch(`${defaultConfig.apiUrl}/clients`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await getFreshToken()}`,
          "Content-Type": "application/json",
        },
        body,
      })
    } catch (err) {
      console.error(err)
    }
  },
  // Admin only
  search: async ({ string }) => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/clients/search/${string}`, {
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
          details: address.details || "",
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
