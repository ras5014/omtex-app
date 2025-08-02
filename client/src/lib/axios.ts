import axios from "axios";

export const api = axios.create({
  baseURL: process.env.STRAPI_URL || "http://localhost:1337/api",
  headers: {
    // Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    "Content-Type": "application/json",
  },
});
