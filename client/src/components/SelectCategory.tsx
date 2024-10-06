import React, { useEffect, useState } from "react";
import axios from "axios";

interface SelectCategoryProps {
  selectedOption: string; // State variable to hold the selected category
  onChange: (value: string) => void; // Callback function to update the state
}

export const SelectCategory: React.FC<SelectCategoryProps> = ({ selectedOption, onChange }) => {
  const [categories, setCategories] = useState<string[]>([]); // State to store categories
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/categories");
        setCategories(response.data.map((item: { category_name: string }) => item.category_name)); // Map response to category names
      } catch (err) {
        setError("Error fetching categories");
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchCategories();
  }, []); // Fetch categories only once on component mount

  if (loading) {
    return <div>Loading categories...</div>; // Display loading message
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>; // Display error message
  }

  return (
    <div>
      <label htmlFor="category">Select Category:</label>
      <select
        id="category"
        value={selectedOption}
        onChange={(e) => onChange(e.target.value)} // Update the selected value
      >
        <option value="">Select an option</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCategory;
