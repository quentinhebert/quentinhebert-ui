import { defaultConfig } from "../../config/defaultConfig"
import { getFreshToken } from "../utils"

const films = {
  // Public
  getAllPublic: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/films/public`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
  // Admin only
  getAll: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/films`, {
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
      return await fetch(`${defaultConfig.apiUrl}/films/${filmId}`, {
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
      return await fetch(`${defaultConfig.apiUrl}/films/thumbnail`, {
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
      return await fetch(`${defaultConfig.apiUrl}/films`, {
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
      return await fetch(`${defaultConfig.apiUrl}/films/${film.id}`, {
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
      return await fetch(`${defaultConfig.apiUrl}/films/${body.id}`, {
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

      return await fetch(`${defaultConfig.apiUrl}/films/sort`, {
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
  types: {
    // Public
    get: async () => {
      try {
        return await fetch(`${defaultConfig.apiUrl}/films/types`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
      } catch (error) {
        console.error(error)
      }
    },
  },
  gear: {
    // Admin only
    getAll: async () => {
      try {
        return await fetch(`${defaultConfig.apiUrl}/films/gear`, {
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
    // Admin only
    get: async ({ id }) => {
      try {
        return await fetch(`${defaultConfig.apiUrl}/films/gear/${id}`, {
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
    // Admin only
    addImage: async (image) => {
      try {
        let formData = new FormData()
        formData.append("image", image)
        return await fetch(`${defaultConfig.apiUrl}/films/gear/image`, {
          method: "POST",
          body: formData,
          mode: "cors",
          headers: {
            Authorization: `Bearer ${await getFreshToken()}`,
          },
        })
      } catch (error) {
        console.error(error)
      }
    },
    // Admin only
    add: async (gear) => {
      const body = {
        image: gear.image,
        label: gear.label,
        description: gear.description,
      }
      try {
        return await fetch(`${defaultConfig.apiUrl}/films/gear`, {
          method: "POST",
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
    // Admin only
    update: async (gear) => {
      const body = {
        id: gear.id,
        label: gear.label,
        description: gear.description,
        image: gear.image,
      }
      try {
        return await fetch(`${defaultConfig.apiUrl}/films/gear/${body.id}`, {
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
    delete: async ({ id }) => {
      try {
        return await fetch(`${defaultConfig.apiUrl}/films/gear/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${await getFreshToken()}`,
            "Content-Type": "application/json",
          },
        })
      } catch (error) {
        console.error(error)
      }
    },
    // Admin only
    sort: async (sortedIds) => {
      try {
        const body = JSON.stringify({ sortedIds })

        return await fetch(`${defaultConfig.apiUrl}/films/gear/sort`, {
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
  },
  roles: {
    // Public
    get: async () => {
      try {
        return await fetch(`${defaultConfig.apiUrl}/films/roles`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
      } catch (error) {
        console.error(error)
      }
    },
  },
}

export default films
