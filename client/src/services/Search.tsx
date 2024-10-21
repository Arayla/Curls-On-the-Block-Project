import React, { useEffect, useState } from "react";
import axios from "axios";
import { SearchParams, Product, SEARCH_CATEGORIES } from "../types";

interface QueryButtonProps {
  porosityVal: number;
  courseVal: number;
  thicknessVal: number;
  curlTypeVal: number;
  lengthVal: number;
  categoryVal: string; // This will be a comma-separated string, like "Gel, Mousse"
}

// interface SearchParams {
//     searchType: number;
//     porosity: number;
//     courseness: number;
//     thickness: number;
//     curlType: number;
//     length: number;
//     category: string;
//     style: string;
// }

export async function Search(
  searchParams: SearchParams,
  setResults: React.Dispatch<React.SetStateAction<Product[]>>,
  listCategories: Array<string>
) {
  //   const [results, setResults] = React.useState<any[]>([]); // Store results from all categories
  //   const [error, setError] = React.useState<string | null>(null);

  // const categories = searchParams.category.split(",").map(category => category.trim()); // Split by comma and remove extra spaces

  // setResults([]); // Clear previous results
  // setError(null); // Clear any previous errors

  const requestData = {
    porosity_val: searchParams.porosity,
    course_val: searchParams.courseness,
    density_val: 1,
    length_val: searchParams.length,
    curl_val: searchParams.curlType,
    category_val: searchParams.category, // Pass each category separately
    max_price: 200, // Set your max price
    max_po: 200, // Set your max price per ounce
  };

  // Search categories only takes one
  if (searchParams.searchType === SEARCH_CATEGORIES)
    listCategories = [searchParams.category];
  console.log(listCategories);

  let results: Array<string> = [];

  // Iterate over each category and make separate API calls
  for (const category of listCategories) {
    requestData.category_val = category;

    console.log("Requesting data for category:", category);
    // console.log(requestData);

    try {
      const response = await axios.post(
        "http://localhost:8000/products/search",
        requestData
      );

      // Append new results to the existing results array
      results.push(response.data);
      setResults(response.data);
      // setError(null);
    } catch (err) {
      const errorMessage = (err as Error).message || "Error fetching products";
      // setError(errorMessage);
      console.log("Error fetching results: ", err);
      setResults([]); // Clear results if there's an error
      break; // Stop if an error occurs
    }
  }

  setResults(results);
}

// return (
// <div>
//   <button onClick={handleClick}>Execute SQL Query</button>
//   {error && <div style={{ color: "red" }}>{error}</div>}
//   <ul>
//     {results.map((result, index) => (
//       <li key={index}>{JSON.stringify(result)}</li>
//     ))}
//   </ul>
// </div>
// );

export default Search;