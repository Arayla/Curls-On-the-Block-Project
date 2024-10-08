// interface for actual parameters of search
export interface SearchParams {
  searchType: number;
  porosity: number;
  courseness: number;
  thickness: number;
  curlType: number;
  length: number;
  category: string;
  style: string;
}

// Constants
export const SEARCH_NOT_SPECIFIED = 0;
export const SEARCH_STYLES = 1;
export const SEARCH_CATEGORIES = 2;

export {};
