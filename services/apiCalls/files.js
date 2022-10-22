import { defaultConfig } from "../../config/defaultConfig"
import { getFreshToken } from "../utils"

const files = {
  // Admin only
  getAll: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/files`, {
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
  delete: async (image) => {
    const { id } = image
    try {
      return await fetch(`${defaultConfig.apiUrl}/files/${id}`, {
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

export default files
