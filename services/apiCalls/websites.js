import { defaultConfig } from "../../config/defaultConfig"
import { getFreshToken } from "../utils"

const websites = {
  // Public
  getAllPublic: async () => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/websites/public`, {
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
      return await fetch(`${defaultConfig.apiUrl}/websites`, {
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
  get: async (websiteId) => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/websites/${websiteId}`, {
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
      return await fetch(`${defaultConfig.apiUrl}/websites/thumbnail`, {
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
  addImage: async (image) => {
    try {
      let formData = new FormData()
      formData.append("image", image)
      return await fetch(`${defaultConfig.apiUrl}/websites/images`, {
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
  linkImages: async (website = { images, id }) => {
    const body = {
      images: website.images,
    }
    try {
      return await fetch(
        `${defaultConfig.apiUrl}/websites/${website.id}/images`,
        {
          method: "PATCH",
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
  add: async (website) => {
    const body = {
      description: website.description,
      url: website.url,
      client: website.client,
      year: website.year,
      tags: website.tags,
      thumbnail: website.thumbnail,
    }
    try {
      return await fetch(`${defaultConfig.apiUrl}/websites`, {
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
  update: async (website) => {
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
      return await fetch(`${defaultConfig.apiUrl}/websites/${body.id}`, {
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
  delete: async (website) => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/websites/${website.id}`, {
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
  sort: async (sortedWebsiteIds) => {
    try {
      const body = JSON.stringify({ sortedWebsiteIds })

      return await fetch(`${defaultConfig.apiUrl}/websites/sort`, {
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
  tags: {
    // Public
    getAll: async () => {
      try {
        return await fetch(`${defaultConfig.apiUrl}/websites/tags`, {
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
    add: async (newTag) => {
      try {
        const body = JSON.stringify({ website_tag: newTag })

        return await fetch(`${defaultConfig.apiUrl}/websites/tags`, {
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
    // Admin only
    delete: async (newTagId) => {
      try {
        return await fetch(
          `${defaultConfig.apiUrl}/websites/tags/${newTagId}`,
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
  },
  slides: {
    // Admin only
    add: async (slide) => {
      const body = {
        title: slide.title,
        description: slide.description,
      }
      try {
        return await fetch(`${defaultConfig.apiUrl}/websites/slides`, {
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
    // Public
    getAllPublic: async () => {
      try {
        return await fetch(`${defaultConfig.apiUrl}/websites/slides/public`, {
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
        return await fetch(`${defaultConfig.apiUrl}/websites/slides`, {
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
    get: async (slideId) => {
      try {
        return await fetch(
          `${defaultConfig.apiUrl}/websites/slides/${slideId}`,
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
    // Admin only
    update: async (slide) => {
      try {
        const body = {
          title: slide.title,
          description: slide.description,
        }
        return await fetch(
          `${defaultConfig.apiUrl}/websites/slides/${slide.id}`,
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
    // Admin only
    delete: async (slide) => {
      try {
        return await fetch(
          `${defaultConfig.apiUrl}/websites/slides/${slide.id}`,
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
    // Admin only
    sort: async (sortedSlideIds) => {
      try {
        const body = JSON.stringify({ sortedSlideIds })

        return await fetch(`${defaultConfig.apiUrl}/websites/slides/sort`, {
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
  },
}

export default websites
