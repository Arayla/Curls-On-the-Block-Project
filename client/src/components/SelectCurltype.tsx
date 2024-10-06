import React from "react";

interface SelectCurlTypeProps {
  selectedOption: number; // State variable to hold the selected value
  onChange: (value: number) => void; // Callback function to update the state
}

export const SelectCurlType: React.FC<SelectCurlTypeProps> = ({ selectedOption, onChange }) => {
  return (
    <div>
      <label htmlFor="curlType">Select Curl Type:</label>
      <select
        id="curlType"
        value={selectedOption}
        onChange={(e) => onChange(Number(e.target.value))} // Convert value to number
      >
        <option value={0}>Select an option</option>
        <option value={1}>2A</option>
        <option value={2}>2B</option>
        <option value={3}>2C</option>
        <option value={4}>3A</option>
        <option value={5}>3B</option>
        <option value={6}>3C</option>
        <option value={7}>4A</option>
        <option value={8}>4B</option>
        <option value={9}>4C</option>
      </select>
    </div>
  );
};

export default SelectCurlType;
