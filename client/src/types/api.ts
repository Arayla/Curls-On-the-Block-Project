import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000",
});

// endpoint extensions
export const STYLES_ENDPOINT = "/styles";
export const CATEGORIES_ENDPOINT = "/categories";
export const COMBOS_ENDPOINT = "/combinations";
export const SEARCH_ENDPOINT = "/products/search";

export {};
