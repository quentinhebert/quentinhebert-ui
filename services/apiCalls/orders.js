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
  // Admin only
  getAll: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/orders`, {
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
  getCheckoutClientSecret: async ({
    order,
    invoiceAddress,
    deliveryAddress,
  }) => {
    const { id } = order
    const invoice_address = {
      fullname: invoiceAddress.fullname,
      phone: invoiceAddress.phone,
      line1: invoiceAddress.line1,
      line2: invoiceAddress.line2,
      postal_code: invoiceAddress.postalCode,
      city: invoiceAddress.city,
      region: invoiceAddress.region,
      country: invoiceAddress.country,
    }
    const delivery_address = {
      fullname: deliveryAddress.fullname,
      phone: deliveryAddress.phone,
      line1: deliveryAddress.line1,
      line2: deliveryAddress.line2,
      postal_code: deliveryAddress.postalCode,
      city: deliveryAddress.city,
      region: deliveryAddress.region,
      country: deliveryAddress.country,
      details: deliveryAddress.details || "",
    }
    const body = { invoice_address, delivery_address }
    try {
      return await fetch(
        `${defaultConfig.apiUrl}/orders/${id}/create-payment-intent`,
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
