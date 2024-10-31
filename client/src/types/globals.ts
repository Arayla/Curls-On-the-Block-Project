// interface matching product json returned by server
export interface Product {
  product_id: number;
  full_product_name: string;
  brand: string;
  category_name: string;
  price_per_container: number;
  price_per_oz: number;
  porosity_score: number;
  course_score: number;
  density_score: number;
  length_score: number;
  curl_type: number;
}

// interface for parameters of search
export interface SearchParams {
  searchType: number;
  porosity: number;
  courseness: number;
  thickness: number;
  curlType: number;
  length: number;
  category: string;
  style: string;
  ingredientFiler: string[];
}

// Constants
export const SEARCH_NOT_SPECIFIED = 0;
export const SEARCH_STYLES = 1;
export const SEARCH_CATEGORIES = 2;

export {};
