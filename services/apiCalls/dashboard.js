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
