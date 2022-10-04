import { defaultConfig } from "../../config/defaultConfig"
import { getRefreshToken } from "../cookies"
import { getFreshToken, getUser } from "../utils"

const admin = {
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
  getAllUsers: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/admin/users`, {
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
  getUser: async (id) => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/admin/users/${id}`, {
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
  updateUser: async (user) => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/admin/users/${user.id}`, {
        method: "PUT",
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
  resendUserConfirmEmail: async (user) => {
    try {
      return await fetch(
        `${defaultConfig.apiUrl}/admin/users/${user.id}/resend-confirm-email`,
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
  getAllFilms: async () => {
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
  getFilm: async (filmId) => {
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
  uploadCategoryThumbnail: async (payload) => {
    const { formData, category } = payload
    try {
      return await fetch(
        `${defaultConfig.apiUrl}/admin/categories/${category.id}/thumbnail`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${await getFreshToken()}`,
          },
        }
      )
    } catch (err) {
      console.error(err)
    }
  },
  updateCategory: async (category) => {
    const body = JSON.stringify({
      bg_video_url: category.bg_video_url,
      catch_phrase_primary: category.catch_phrase_primary,
      catch_phrase_secondary: category.catch_phrase_secondary,
      header_title: category.header_title,
      id: category.id,
      label: category.label,
      slug: category.slug,
      thumbnail_id: category.thumbnail_id,
      url: category.url,
    })
    try {
      return await fetch(
        `${defaultConfig.apiUrl}/admin/categories/${category.id}/thumbnail`,
        {
          method: "PUT",
          body: body,
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
  updateCategoryVideo: async (categoryVideo) => {
    const body = {
      id: categoryVideo.id,
      title: categoryVideo.title,
      description: categoryVideo.description,
      url: categoryVideo.url,
      thumbnail_id: categoryVideo.thumbnail_id,
      category_id: categoryVideo.category_id,
    }
    try {
      return await fetch(
        `${defaultConfig.apiUrl}/admin/categories/${body.category_id}/video/${body.id}`,
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
  addFilmThumbnail: async (thumbnail) => {
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
  addFilm: async (film) => {
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
  deleteFilm: async (film) => {
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
  updateFilm: async (film) => {
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
  updateReference: async (reference) => {
    const body = [
      { key: "id", value: reference.id },
      { key: "name", value: reference.name },
      { key: "new_logo", value: reference.new_logo },
    ]
    try {
      let formData = new FormData()
      body.map((item) => {
        return formData.append(item.key, item.value)
      })
      for (var p of formData) {
        console.log(p)
      }

      return await fetch(
        `${defaultConfig.apiUrl}/admin/references/${reference.id}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${await getFreshToken()}`,
          },
        }
      )
    } catch (err) {
      console.error(err)
    }
  },
  addReference: async (reference) => {
    const body = [
      { key: "name", value: reference.name },
      { key: "logo", value: reference.logo },
    ]
    try {
      let formData = new FormData()
      body.map((item) => {
        return formData.append(item.key, item.value)
      })
      return await fetch(`${defaultConfig.apiUrl}/admin/references`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${await getFreshToken()}`,
        },
      })
    } catch (err) {
      console.error(err)
    }
  },
  deleteReference: async (reference) => {
    try {
      return await fetch(
        `${defaultConfig.apiUrl}/admin/references/${reference.id}`,
        {
          method: "DELETE",
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
  sortFilms: async (sortedFilmIds) => {
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

export default admin
