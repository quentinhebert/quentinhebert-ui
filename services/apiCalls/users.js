import { defaultConfig } from "../../config/defaultConfig"
import { getRefreshToken } from "../cookies"
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
        phone: userData.phone.replaceAll(" ", ""), // Format phone number from +33 6 XX XX... to +336XXXX
        type: userData.type,
        company: userData.company,
        vat_number: userData.vat_number,
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
  createOauth: async ({ userData }) => {
    try {
      const body = JSON.stringify({
        email: userData.email,
        firstname: userData.firstname,
        lastname: userData.lastname,
        phone: userData.phone,
        type: userData.type,
        company: userData.company,
        vat_number: userData.vat_number,
      })
      return await fetch(`${defaultConfig.apiUrl}/users/oauth`, {
        method: "POST",
        body,
        headers: {
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
    const body = { timezone: timezone?.label }
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
  // User and Admin
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
  // Admin only
  sendClientSignupLink: async ({ email }) => {
    try {
      const body = { email }
      return await fetch(
        `${defaultConfig.apiUrl}/users/send-client-signup-link`,
        {
          method: "POST",
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
  // Admin only
  impersonate: async ({ id }) => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/users/${id}/impersonate`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${await getFreshToken()}`,
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
    deleteAll: async (userId) => {
      try {
        return await fetch(`${defaultConfig.apiUrl}/users/${userId}/sessions`, {
          method: "DELETE",
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
  security: {
    email: {
      /* Try to access change-email page with link */
      update: async (token) => {
        try {
          return await fetch(`${defaultConfig.apiUrl}/change-email/${token}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
          })
        } catch (error) {
          console.error(error)
        }
      },
      /* Try to access email-confirmation page with link and updates DB email_confirmed=true */
      confirm: async (token) => {
        try {
          return await fetch(`${defaultConfig.apiUrl}/email-confirmation`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
        } catch (error) {
          console.error(error)
        }
      },
    },
    password: {
      update: async (user) => {
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
      // Unauthenticated
      forgotten: async ({ email }) => {
        const body = { email }
        try {
          return await fetch(`${defaultConfig.apiUrl}/password-forgotten`, {
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
      /* Try to access password forgotten page with link */
      resetAccess: async (token) => {
        try {
          return await fetch(
            `${defaultConfig.apiUrl}/reset-password-access/${token}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
        } catch (error) {
          console.error(error)
        }
      },
      /* Reset password */
      reset: async ({ password, id, token }) => {
        try {
          const encodedPassword = new Buffer.from(password).toString("base64")
          const body = { password: encodedPassword, token }
          return await fetch(
            `${defaultConfig.apiUrl}/users/${id}/password-reset`,
            {
              method: "PATCH",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
        } catch (error) {
          console.error(error)
        }
      },
    },
  },
  auth: {
    // Unauthenticated
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
    loginOauth: async ({ access_token, type }) => {
      try {
        const body = {
          access_token,
          type,
        }
        return await fetch(`${defaultConfig.apiUrl}/users/auth/login/oauth`, {
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
    logout: async () => {
      try {
        const body = {
          refresh_token: getRefreshToken(),
        }
        return await fetch(
          `${defaultConfig.apiUrl}/users/${getUser().id}/auth/logout`,
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
    getAccessToken: async () => {
      try {
        const body = {
          id: getUser().id,
          refresh_token: getRefreshToken(),
        }
        return await fetch(`${defaultConfig.apiUrl}/users/auth/new-token`, {
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
    google: {
      getInfo: async ({ googleAccessToken }) => {
        try {
          return await fetch(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleAccessToken}`,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${googleAccessToken}`,
              },
            }
          )
        } catch (error) {
          console.error(error)
        }
      },
    },
    facebook: {
      getInfo: async ({ facebookAccessToken }) => {
        try {
          return await fetch(
            `https://graph.facebook.com/v17.0/me?access_token=${facebookAccessToken}&debug=all&fields=email,first_name,last_name&format=json&method=get&pretty=0&suppress_http_code=1&transport=cors`,
            {
              method: "GET",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${facebookAccessToken}`,
              },
            }
          )
        } catch (error) {
          console.error(error)
        }
      },
    },
  },
  paymentMethod: {
    // User
    detach: async ({ payment_method = { id }, user = { id } }) => {
      try {
        const body = { payment_method }
        return await fetch(
          `${defaultConfig.apiUrl}/users/${user.id}/payment-method/detach`,
          {
            method: "DELETE",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${await getFreshToken()}`,
            },
          }
        )
      } catch (error) {
        console.error(error)
      }
    },
  },
}

export default users
