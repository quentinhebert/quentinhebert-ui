import { defaultConfig } from "../../config/defaultConfig"
import { getRefreshToken } from "../auth"
import { getFreshToken, getUser } from "../utils"

const users = {
  // Admin only
  getAll: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/users`, {
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
  // Admin allowed
  create: async ({ userData }) => {
    try {
      const encodedPassword = new Buffer.from(userData.password).toString(
        "base64"
      )
      const payload = {
        email: userData.email,
        password: encodedPassword,
        firstname: userData.firstname,
        lastname: userData.lastname,
        phone: userData.phone,
        type: userData.type,
      }
      return await fetch(`${defaultConfig.apiUrl}/users`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          Authorization: `Bearer ${await getFreshToken()}`,
          "Content-Type": "application/json",
        },
      })
    } catch (err) {
      console.error(err)
    }
  },
  // Admin allowed
  get: async (id) => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/users/${id}`, {
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
  // Admin allowed
  update: async (user) => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/users/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify(user),
        headers: {
          Authorization: `Bearer ${await getFreshToken()}`,
          "Content-Type": "application/json",
        },
      })
    } catch (err) {
      console.error(err)
    }
  },
  // Admin allowed
  delete: async (id) => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/users/${id}`, {
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
  updateAvatar: async (payload) => {
    const { formData, user } = payload
    try {
      return await fetch(
        `${defaultConfig.apiUrl}/users/${user.id}/update-avatar`,
        {
          method: "POST",
          body: formData,
          mode: "cors",
          headers: {
            Authorization: `Bearer ${await getFreshToken()}`,
          },
        }
      )
    } catch (err) {
      console.error(err)
    }
  },
  updateTimeZone: async (userId, timezone) => {
    const body = { timezone: timezone.label }
    try {
      return await fetch(`${defaultConfig.apiUrl}/users/${userId}/timezone`, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${await getFreshToken()}`,
          "Content-Type": "application/json",
        },
      })
    } catch (err) {
      console.error(err)
    }
  },
  resendConfirmEmail: async ({ email, token }) => {
    try {
      const payload = { email }
      return await fetch(`${defaultConfig.apiUrl}/users/resend-confirm-email`, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
          Authorization: `Bearer ${token || (await getFreshToken())}`,
          "Content-Type": "application/json",
        },
      })
    } catch (err) {
      console.error(err)
    }
  },
  sessions: {
    get: async (userId) => {
      try {
        return await fetch(`${defaultConfig.apiUrl}/users/${userId}/sessions`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${await getFreshToken()}`,
          },
        })
      } catch (err) {
        console.error(err)
      }
    },
    delete: async (userId, sessionId) => {
      try {
        return await fetch(
          `${defaultConfig.apiUrl}/users/${userId}/sessions/${sessionId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${await getFreshToken()}`,
            },
          }
        )
      } catch (err) {
        console.error(err)
      }
    },
  },
  auth: {
    login: async ({ email, password }) => {
      try {
        const encodedPassword = new Buffer.from(password).toString("base64")
        const body = {
          email,
          password: encodedPassword,
        }
        return await fetch(`${defaultConfig.apiUrl}/users/auth/login`, {
          method: "PUT",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        })
      } catch (error) {
        console.error(error)
      }
    },
    updatePassword: async (user) => {
      try {
        const encodedPassword = new Buffer.from(user.password).toString(
          "base64"
        )
        const encodedNewPassword = new Buffer.from(user.newPassword).toString(
          "base64"
        )
        const payload = {
          password: encodedPassword,
          new_password: encodedNewPassword,
        }
        return await fetch(
          `${defaultConfig.apiUrl}/users/${user.id}/update-password`,
          {
            method: "PATCH",
            body: JSON.stringify(payload),
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
    getAccessToken: async () => {
      try {
        const body = {
          id: getUser().id,
          refresh_token: getRefreshToken(),
        }
        return await fetch(`${defaultConfig.apiUrl}/new-token`, {
          method: "PUT",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        })
      } catch (err) {
        console.error(err)
      }
    },
    logout: async () => {
      try {
        const body = {
          refresh_token: getRefreshToken(),
        }
        return await fetch(
          `${defaultConfig.apiUrl}/users/${getUser().id}/logout`,
          {
            method: "PUT",
            body: JSON.stringify(body),
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

export default users
