import { defaultConfig } from "../../config/defaultConfig";
import { getRefreshToken } from "../cookies";
import { getFreshToken, getUser } from "../utils";

const admin = {
  create: async ({ userData }) => {
    try {
      const encodedPassword = new Buffer.from(userData.password).toString(
        "base64"
      );
      const payload = {
        email: userData.email,
        password: encodedPassword,
        firstname: userData.firstname,
        lastname: userData.lastname,
        phone: userData.phone,
        type: userData.type,
      };
      return await fetch(`${defaultConfig.apiUrl}/users`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          Authorization: `Bearer ${await getFreshToken()}`,
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error(err);
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
      });
    } catch (err) {
      console.error(err);
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
      });
    } catch (err) {
      console.error(err);
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
      });
    } catch (err) {
      console.error(err);
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
      );
    } catch (err) {
      console.error(err);
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
      );
    } catch (err) {
      console.error(err);
    }
  },
};

export default admin;
