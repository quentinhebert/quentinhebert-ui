import { defaultConfig } from "../../config/defaultConfig";
import { getRefreshToken } from "../cookies";
import { getFreshToken, getUser } from "../utils";

const users = {
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
      console.log(err);
    }
  },
  getAccessToken: async () => {
    try {
      const body = {
        email: getUser().email,
        refresh_token: getRefreshToken(),
      };
      return await fetch(`${defaultConfig.apiUrl}/new-token`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log(err);
    }
  },
  get: async (id) => {
    try {
      return await fetch(`${defaultConfig.apiUrl}/users/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await getFreshToken()}`,
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log(err);
    }
  },
  resendConfirmEmail: async (token) => {
    try {
      const payload = { token };
      return await fetch(`${defaultConfig.apiUrl}/users/resend-confirm-email`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log(err);
    }
  },
};

export default users;
