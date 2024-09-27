import React, { useEffect, useState } from "react";
import axios from "axios";

interface SelectStyleProps {
  selectedOption: string; // State variable to hold the selected style
  onChange: (value: string) => void; // Callback function to update the state
}

export const SelectStyles: React.FC<SelectStyleProps> = ({ selectedOption, onChange }) => {
  const [styles, setStyles] = useState<string[]>([]); // State to store styles
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const response = await axios.get("http://localhost:8000/styles"); // Fetch from /styles endpoint
        setStyles(response.data.map((item: { style_name: string }) => item.style_name)); // Map response to style names
      } catch (err) {
        setError("Error fetching styles");
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchStyles();
  }, []); // Fetch styles only once on component mount

  if (loading) {
    return <div>Loading styles...</div>; // Display loading message
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>; // Display error message
  }

  return (
    <div>
      <label htmlFor="style">Select Style:</label>
      <select
        id="style"
        value={selectedOption}
        onChange={(e) => onChange(e.target.value)} // Update the selected value
      >
        <option value="">Select an option</option>
        {styles.map((style, index) => (
          <option key={index} value={style}>
            {style}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectStyles;
