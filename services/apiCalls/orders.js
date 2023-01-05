import { defaultConfig } from "../../config/defaultConfig"
import { getFreshToken } from "../utils"

const orders = {
  // Admin only
  generateQuotation: async ({ id }) => {
    // Id is from order (not quotation)
    try {
      return await fetch(`${defaultConfig.apiUrl}/orders/${id}/quotations`, {
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
  // Admin only
  sendPaymentLink: async ({ id, email }) => {
    const body = { email }
    try {
      return await fetch(`${defaultConfig.apiUrl}/orders/${id}/payment-link`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await getFreshToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
    } catch (err) {
      console.error(err)
    }
  },
  // Admin only
  assignClient: async ({ id, clientId }) => {
    const body = { client_id: clientId }
    try {
      return await fetch(`${defaultConfig.apiUrl}/orders/${id}/assign-client`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${await getFreshToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
    } catch (err) {
      console.error(err)
    }
  },
  // Public
  autoAssign: async ({ id }) => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/orders/${id}/auto-assign`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${await getFreshToken()}`,
          "Content-Type": "application/json",
        },
      })
    } catch (err) {
      console.error(err)
    }
  },
  // Public
  view: async ({ id, email, auth }) => {
    let headers = {
      "Content-Type": "application/json",
    }
    if (auth)
      headers = {
        Authorization: `Bearer ${await getFreshToken()}`,
        "Content-Type": "application/json",
      }
    console.log("headers", headers)
    const body = { email }
    try {
      return await fetch(`${defaultConfig.apiUrl}/orders/${id}/view`, {
        method: "PUT",
        headers,
        body: JSON.stringify(body),
      })
    } catch (err) {
      console.error(err)
    }
  },
  // Admin only
  create: async (
    quotation = {
      label,
      items,
      date,
      delivery_date,
      duration,
      validity_end_date,
      payment_options,
      payment_conditions,
      additional_mentions,
    },
    items
  ) => {
    const body = { ...quotation, items }
    try {
      return await fetch(`${defaultConfig.apiUrl}/orders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await getFreshToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
    } catch (err) {
      console.error(err)
    }
  },
  // Admin only
  save: async (
    body = {
      id,
      label,
      status,
      items,
      date,
      delivery_date,
      duration,
      validity_end_date,
      payment_options,
      payment_conditions,
      deposit,
      balance,
      additional_mentions,
      no_vat,
      payment_delay_penalties,
    }
  ) => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/orders/${body.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${await getFreshToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
    } catch (err) {
      console.error(err)
    }
  },
  // Admin only
  delete: async (order) => {
    const { id } = order
    try {
      return await fetch(`${defaultConfig.apiUrl}/orders/${id}`, {
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
      email: invoiceAddress.email,
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
