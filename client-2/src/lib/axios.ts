import axios from "axios";

export const api = axios.create({
  baseURL: process.env.STRAPI_BASE_URL,
  headers: {
    // Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export const clientApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_BASE_URL,
  headers: {
    // Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    "Content-Type": "application/json",
  },
});
