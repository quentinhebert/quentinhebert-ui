import { defaultConfig } from "../../config/defaultConfig"
import { getFreshToken } from "../utils"

const orders = {
  // Client user and Admin
  get: async (order) => {
    const { id } = order
    try {
      return await fetch(`${defaultConfig.apiUrl}/orders/${id}`, {
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
  getAllByClient: async (client) => {
    const { id } = client
    try {
      return await fetch(`${defaultConfig.apiUrl}/orders/client/${id}`, {
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
  getCheckoutClientSecret: async (order) => {
    const { id } = order
    try {
      return await fetch(
        `${defaultConfig.apiUrl}/orders/${id}/create-payment-intent`,
        {
          method: "POST",
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
  cancelPaymentIntent: async ({ orderId, clientSecret }) => {
    try {
      const body = { client_secret: clientSecret }
      return await fetch(
        `${defaultConfig.apiUrl}/orders/${orderId}/payment-intent`,
        {
          method: "DELETE",
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
}

export default orders
