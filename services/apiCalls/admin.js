import { defaultConfig } from "../../config/defaultConfig"
import { getFreshToken } from "../utils"

const admin = {
  /************* USERS *************/
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
  /************* WEBSITE *************/
  getNavbar: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/admin/navbar`, {
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
  updateNavbar: async (menuItems, idsToDelete) => {
    const body = { menu_items: menuItems, ids_to_delete: idsToDelete }
    try {
      return await fetch(`${defaultConfig.apiUrl}/admin/navbar`, {
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
  updateFooter: async (credits) => {
    const body = { credits }
    try {
      return await fetch(`${defaultConfig.apiUrl}/admin/footer`, {
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
  getWebsiteContact: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/admin/website-contact`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await getFreshToken()}`,
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
  updateWebsiteContact: async (contactItems) => {
    const body = {
      address: contactItems.address,
      contact: contactItems.contact,
      social_medias: contactItems.social_medias,
    }
    try {
      return await fetch(`${defaultConfig.apiUrl}/admin/website-contact`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${await getFreshToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
    } catch (error) {
      console.error(error)
    }
  },
  /************* DEPRECATED *************/
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
  /************* FILMS *************/
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
  /************* REFERENCES *************/
  getAllReferences: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/admin/references`, {
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
  getReference: async (referenceId) => {
    console.debug("apiCall", referenceId)
    try {
      return await fetch(
        `${defaultConfig.apiUrl}/admin/references/${referenceId}`,
        {
          method: "GET",
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
  addReferenceLogo: async (logo) => {
    try {
      let formData = new FormData()
      formData.append("logo", logo)
      return await fetch(`${defaultConfig.apiUrl}/admin/references/logo`, {
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
  addReference: async (reference) => {
    const body = {
      type: reference.type,
      label: reference.label,
      logo_id: reference.logo.id,
    }
    try {
      return await fetch(`${defaultConfig.apiUrl}/admin/references`, {
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
  updateReference: async (reference) => {
    const body = {
      id: reference.id,
      logo: { id: reference.logo.id },
      label: reference.label,
      type: reference.type.id,
    }
    try {
      return await fetch(
        `${defaultConfig.apiUrl}/admin/references/${reference.id}`,
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
  sortReferences: async (sortedReferenceIds) => {
    try {
      const body = JSON.stringify({ sortedReferenceIds })

      return await fetch(`${defaultConfig.apiUrl}/admin/references/sort`, {
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
  /************* WEBSITES *************/
  getAllWebsites: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/admin/websites`, {
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
  getWebsite: async (websiteId) => {
    try {
      return await fetch(
        `${defaultConfig.apiUrl}/admin/websites/${websiteId}`,
        {
          method: "GET",
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
  addWebsiteThumbnail: async (thumbnail) => {
    try {
      let formData = new FormData()
      formData.append("thumbnail", thumbnail)
      return await fetch(`${defaultConfig.apiUrl}/admin/websites/thumbnail`, {
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
  addWebsite: async (website) => {
    const body = {
      description: website.description,
      url: website.url,
      client: website.client,
      year: website.year,
      tags: website.tags,
      thumbnail: website.thumbnail,
    }
    try {
      return await fetch(`${defaultConfig.apiUrl}/admin/websites`, {
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
  updateWebsite: async (website) => {
    const body = {
      id: website.id,
      description: website.description,
      url: website.url,
      client: website.client,
      year: website.year,
      tags: website.tags,
      thumbnail: website.thumbnail,
    }
    try {
      return await fetch(`${defaultConfig.apiUrl}/admin/websites/${body.id}`, {
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
  deleteWebsite: async (website) => {
    try {
      return await fetch(
        `${defaultConfig.apiUrl}/admin/websites/${website.id}`,
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
  sortWebsites: async (sortedWebsiteIds) => {
    try {
      const body = JSON.stringify({ sortedWebsiteIds })

      return await fetch(`${defaultConfig.apiUrl}/admin/websites/sort`, {
        method: "PATCH",
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
  addWebsiteTag: async (newTag) => {
    try {
      const body = JSON.stringify({ website_tag: newTag })

      return await fetch(`${defaultConfig.apiUrl}/admin/websites/tags`, {
        method: "POST",
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
  deleteWebsiteTag: async (newTagId) => {
    try {
      return await fetch(
        `${defaultConfig.apiUrl}/admin/websites/tags/${newTagId}`,
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
  addWebsiteSlide: async (slide) => {
    const body = {
      title: slide.title,
      description: slide.description,
    }
    try {
      return await fetch(`${defaultConfig.apiUrl}/admin/websites/slides`, {
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
  getAllWebsiteSlides: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/admin/websites/slides`, {
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
  getWebsiteSlide: async (slideId) => {
    try {
      return await fetch(
        `${defaultConfig.apiUrl}/admin/websites/slides/${slideId}`,
        {
          method: "GET",
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
  updateWebsiteSlide: async (slide) => {
    try {
      const body = {
        title: slide.title,
        description: slide.description,
      }
      return await fetch(
        `${defaultConfig.apiUrl}/admin/websites/slides/${slide.id}`,
        {
          method: "PUT",
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
  deleteWebsiteSlide: async (slide) => {
    try {
      return await fetch(
        `${defaultConfig.apiUrl}/admin/websites/slides/${slide.id}`,
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
  sortWebsiteSlides: async (sortedSlideIds) => {
    try {
      const body = JSON.stringify({ sortedSlideIds })

      return await fetch(`${defaultConfig.apiUrl}/admin/websites/slides/sort`, {
        method: "PATCH",
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
  updateLogo: async (file) => {
    try {
      let formData = new FormData()
      formData.append("logo", file)
      return await fetch(`${defaultConfig.apiUrl}/admin/application/logo`, {
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
}

export default admin
