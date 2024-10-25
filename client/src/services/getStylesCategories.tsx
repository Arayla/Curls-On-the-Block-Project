import { useState } from "react";
import axios from "axios";
import { STYLES_ENDPOINT, CATEGORIES_ENDPOINT } from "../types";

//
// Get styles and categories to populate dropdowns. Should be set on component mount
//
export async function getStylesCategories(
  setStyles: React.Dispatch<React.SetStateAction<Array<string>>>,
  setCategories: React.Dispatch<React.SetStateAction<Array<string>>>
): Promise<void> {
  //   const [loading, setLoading] = useState(true);
  //   let otherIsLoading = true;

  // Styles
  try {
    // Fetching data from the server
    // This needs to be swapped to api.get and call with https but idk why that isnt working
    const response = await axios.get("http://localhost:8000/styles", {
      params: {
        table: "styles",
      },
    });

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
    const response = await axios.get("http://localhost:8000/categories", {
      params: {
        table: "categories",
      },
    });

    // Updating the state with the fetched data
    let stringArr: Array<string> = response.data.map(
      (item: { category_name: string }) => item.category_name
    );

    stringArr.unshift("Choose a category...");
    setCategories(stringArr);
  } catch (error) {
    console.error("Error calling server for categories:", error);
  }
}

export {};
