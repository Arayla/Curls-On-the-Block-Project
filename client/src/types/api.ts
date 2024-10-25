import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:8000",
});

// http://localhost:8000/styles
export const STYLES_ENDPOINT = "/styles";
// http://localhost:8000/categories
export const CATEGORIES_ENDPOINT = "/categories";
// http://localhost:8000/combinations;
export const COMBOS_ENDPOINT = "/combinations";

export {};
