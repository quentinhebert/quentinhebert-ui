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
};

export default unauthenticated;
