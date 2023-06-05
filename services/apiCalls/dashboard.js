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
}

export default dashboard
