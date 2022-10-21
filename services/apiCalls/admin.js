import { defaultConfig } from "../../config/defaultConfig"
import { getFreshToken } from "../utils"

const admin = {
  /************* USERS *************/
  sendUserPasswordForgotten: async (user) => {
    try {
      return await fetch(
        `${defaultConfig.apiUrl}/admin/users/${user.id}/password-forgotten`,
        {
          method: "PATCH",
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
  /************* FILES *************/
  getFiles: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/admin/files`, {
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
  deleteFile: async (image) => {
    const { id } = image
    try {
      return await fetch(`${defaultConfig.apiUrl}/admin/files/${id}`, {
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

export default admin
