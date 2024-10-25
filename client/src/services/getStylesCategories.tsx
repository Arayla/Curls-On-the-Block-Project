import React from "react";
import { api, STYLES_ENDPOINT, CATEGORIES_ENDPOINT } from "../types";

//
// Get styles and categories to populate dropdowns. Should be set on component mount
//
export async function getStylesCategories(
  setStyles: React.Dispatch<React.SetStateAction<Array<string>>>,
  setCategories: React.Dispatch<React.SetStateAction<Array<string>>>,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> {
  // Styles
  try {
    // Fetching data from the server
    const response = await api.get(STYLES_ENDPOINT);

    // Updating the state with the fetched data
    let stringArr: Array<string> = response.data.map(
      (item: { style_name: string }) => item.style_name
    );

    stringArr.unshift("Choose a style...");
    setStyles(stringArr);
  } catch (error) {
    console.error("Error calling server for styles:", error);
  }

  // Categories
  try {
    // Fetching data from the server
    const response = await api.get(CATEGORIES_ENDPOINT);

    // Updating the state with the fetched data
    let stringArr: Array<string> = response.data.map(
      (item: { category_name: string }) => item.category_name
    );

    stringArr.unshift("Choose a category...");
    setCategories(stringArr);
  } catch (error) {
    console.error("Error calling server for categories:", error);
  }

  if (setLoading) setLoading(false);
}

export {};
