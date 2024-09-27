import React, { useEffect, useState } from "react";
import axios from "axios";

interface QueryButtonProps {
  porosityVal: number;
  courseVal: number;
  thicknessVal: number;
  curlTypeVal: number;
  lengthVal: number;
  categoryVal: string; // This will be a comma-separated string, like "Gel, Mousse"
}

export const QueryButton: React.FC<QueryButtonProps> = ({
  porosityVal,
  courseVal,
  thicknessVal,
  curlTypeVal,
  lengthVal,
  categoryVal,
}) => {
  const [results, setResults] = React.useState<any[]>([]); // Store results from all categories
  const [error, setError] = React.useState<string | null>(null);

  const handleClick = async () => {
    console.log("Button clicked");

    const categories = categoryVal.split(",").map(category => category.trim()); // Split by comma and remove extra spaces

    setResults([]); // Clear previous results
    setError(null); // Clear any previous errors

    // Iterate over each category and make separate API calls
    for (const category of categories) {
      const requestData = {
        porosity_val: porosityVal,
        course_val: courseVal,
        density_val: thicknessVal,
        length_val: lengthVal,
        curl_val: curlTypeVal,
        category_val: category, // Pass each category separately
        max_price: 200, // Set your max price
        max_po: 200, // Set your max price per ounce
      };

      console.log("Requesting data for category:", category);
      console.log(requestData);

      try {
        const response = await axios.post("http://localhost:8000/products/search", requestData);
        
        // Append new results to the existing results array
        setResults(prevResults => [...prevResults, ...response.data]);
        setError(null);
      } catch (err) {
        const errorMessage = (err as Error).message || "Error fetching products";
        setError(errorMessage);
        setResults([]); // Clear results if there's an error
        break; // Stop if an error occurs
      }
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Execute SQL Query</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {results.map((result, index) => (
          <li key={index}>{JSON.stringify(result)}</li>
        ))}
      </ul>
    </div>
  );
};

export default QueryButton;
