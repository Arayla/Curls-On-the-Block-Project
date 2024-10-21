import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:8000",
});

// http://localhost:8000/styles
// http://localhost:8000/categories
export const STYLES_ENDPOINT = "/styles";
export const CATEGORIES_ENDPOINT = "/categories";

export {};
