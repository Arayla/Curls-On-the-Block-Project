import React from "react";

interface SelectPorosityProps {
  selectedOption: number; // State variable to hold the selected value
  onChange: (value: number) => void; // Callback function to update the state
}

export const SelectPorosity: React.FC<SelectPorosityProps> = ({ selectedOption, onChange }) => {
  return (
    <div>
      <label htmlFor="porosity">Select Porosity:</label>
      <select
        id="porosity"
        value={selectedOption}
        onChange={(e) => onChange(Number(e.target.value))} // Convert value to number
      >
        <option value={0}>Select an option</option>
        <option value={1}>Not Very</option>
        <option value={2}>Somewhat</option>
        <option value={3}>Average</option>
        <option value={4}>Above Average</option>
        <option value={5}>Very</option>
      </select>
    </div>
  );
};

export default SelectPorosity;
