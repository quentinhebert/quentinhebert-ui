import { defaultConfig } from "../../config/defaultConfig"
import { getFreshToken } from "../utils"

const dashboard = {
  // Admin only
  notifications: {
    get: async () => {
      try {
        return await fetch(`${defaultConfig.apiUrl}/dashboard/notifications`, {
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
  },
  balance: {
    get: async () => {
      try {
        return await fetch(`${defaultConfig.apiUrl}/dashboard/balance`, {
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
  },
  payments: {
    // Admin only
    getPerMonth: async ({ month, year }) => {
      try {
        return await fetch(
          `${defaultConfig.apiUrl}/dashboard/payments/${year}/${month}`,
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
    downloadMonthReport: async ({ month, year }) => {
      try {
        return await fetch(
          `${defaultConfig.apiUrl}/dashboard/payments-reports/${year}/${month}`,
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
  },
  payouts: {
    initiate: async () => {
      try {
        return await fetch(`${defaultConfig.apiUrl}/dashboard/payouts`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${await getFreshToken()}`,
            "Content-Type": "application/json",
          },
        })
      } catch (err) {
        console.error(err)
      }
    },
    getLast: async () => {
      try {
        return await fetch(`${defaultConfig.apiUrl}/dashboard/payouts/last`, {
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
  },
  kpi: {
    get: async () => {
      try {
        return await fetch(`${defaultConfig.apiUrl}/dashboard/kpi`, {
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
  },
  prospects: {
    // Admin only
    get: async ({ id }) => {
      try {
        return await fetch(
          `${defaultConfig.apiUrl}/dashboard/prospects/${id}`,
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
    getAll: async () => {
      try {
        return await fetch(`${defaultConfig.apiUrl}/dashboard/prospects`, {
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
    add: async (
      payload = {
        firstname,
        lastname,
        phone,
        email,
        budget,
        company,
        website,
        services,
      }
    ) => {
      const body = JSON.stringify(payload)
      try {
        return await fetch(`${defaultConfig.apiUrl}/dashboard/prospects`, {
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
    update: async (
      payload = {
        id,
        firstname,
        lastname,
        phone,
        email,
        budget,
        company,
        website,
        services,
        opened,
      }
    ) => {
      const body = JSON.stringify(payload)
      try {
        return await fetch(
          `${defaultConfig.apiUrl}/dashboard/prospects/${payload.id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${await getFreshToken()}`,
              "Content-Type": "application/json",
            },
            body,
          }
        )
      } catch (err) {
        console.error(err)
      }
    },
    // Admin only
    markAsOpened: async (
      payload = {
        id,
        opened,
      }
    ) => {
      const body = JSON.stringify(payload)
      try {
        return await fetch(
          `${defaultConfig.apiUrl}/dashboard/prospects/${payload.id}/open`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${await getFreshToken()}`,
              "Content-Type": "application/json",
            },
            body,
          }
        )
      } catch (err) {
        console.error(err)
      }
    },
    // Admin only
    delete: async ({ id }) => {
      try {
        return await fetch(
          `${defaultConfig.apiUrl}/dashboard/prospects/${id}`,
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
    // Admin only
    getComments: async (prospect = { id }) => {
      try {
        return await fetch(
          `${defaultConfig.apiUrl}/dashboard/prospects/${prospect.id}/comments`,
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
    postComment: async ({ prospectId, description }) => {
      try {
        const body = JSON.stringify({ description })
        return await fetch(
          `${defaultConfig.apiUrl}/dashboard/prospects/${prospectId}/comment`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${await getFreshToken()}`,
              "Content-Type": "application/json",
            },
            body,
          }
        )
      } catch (err) {
        console.error(err)
      }
    },
    // Admin only
    deleteComment: async ({ id }) => {
      try {
        return await fetch(
          `${defaultConfig.apiUrl}/dashboard/prospects/comment/${id}`,
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

export default dashboard
