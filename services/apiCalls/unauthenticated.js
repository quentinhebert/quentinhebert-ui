import { defaultConfig } from "../../config/defaultConfig";

const unauthenticated = {
  login: async ({ email, password }) => {
    try {
      const encodedPassword = new Buffer.from(password).toString("base64");
      const body = {
        email,
        password: encodedPassword,
      };
      return await fetch(`${defaultConfig.apiUrl}/login`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
    }
  },
  /* Send password forgotten request to given email address */
  passwordForgotten: async ({ userData }) => {
    const body = { email: userData.email };
    try {
      return await fetch(`${defaultConfig.apiUrl}/password-forgotten`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
    }
  },
  /* Try to access password forgotten page with link */
  passwordResetAccess: async (token) => {
    try {
      return await fetch(
        `${defaultConfig.apiUrl}/reset-password-access/${token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  },
  /* Reset password */
  passwordReset: async ({ password, id, token }) => {
    try {
      const encodedPassword = new Buffer.from(password).toString("base64");
      const body = { password: encodedPassword, token };
      return await fetch(`${defaultConfig.apiUrl}/users/${id}/password-reset`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
    }
  },
  /* Try to access email-confirmation page with link */
  emailConfirmationAccess: async ({ token }) => {
    try {
      const body = {
        token: token,
      };
      return await fetch(`${defaultConfig.apiUrl}/email-confirmation-access`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
    }
  },
};

export default unauthenticated;
