import { defaultConfig } from "../../config/defaultConfig"
import { getFreshToken } from "../utils"

const films = {
  // Admin only
  getAll: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/admin/films`, {
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
  get: async (filmId) => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/admin/films/${filmId}`, {
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
  addThumbnail: async (thumbnail) => {
    try {
      let formData = new FormData()
      formData.append("thumbnail", thumbnail)
      return await fetch(`${defaultConfig.apiUrl}/admin/films/thumbnail`, {
        method: "POST",
        body: formData,
        mode: "cors",
        headers: {
          Authorization: `Bearer ${await getFreshToken()}`,
        },
      })
    } catch (err) {
      console.error(err)
    }
  },
  // Admin only
  add: async (film) => {
    const body = {
      title: film.title,
      description: film.description,
      url: film.url,
      type: film.type,
      client: film.client,
      year: film.year,
      gear: film.gear,
      roles: film.roles,
      thumbnail: film.thumbnail,
    }
    try {
      return await fetch(`${defaultConfig.apiUrl}/admin/films`, {
        method: "POST",
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
  // Admin only
  delete: async (film) => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/admin/films/${film.id}`, {
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
  // Admin only
  update: async (film) => {
    const body = {
      id: film.id,
      title: film.title,
      description: film.description,
      url: film.url,
      type: film.type,
      client: film.client,
      year: film.year,
      gear: film.gear,
      roles: film.roles,
      thumbnail: film.thumbnail,
    }
    try {
      return await fetch(`${defaultConfig.apiUrl}/admin/films/${body.id}`, {
        method: "PUT",
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
  // Admin only
  sort: async (sortedFilmIds) => {
    try {
      const body = JSON.stringify({ sortedFilmIds })

      return await fetch(`${defaultConfig.apiUrl}/admin/films/sort`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${await getFreshToken()}`,
          "Content-Type": "application/json",
        },
        body: body,
      })
    } catch (err) {
      console.error(err)
    }
  },
}

export default films
