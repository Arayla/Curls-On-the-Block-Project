import React from "react";

interface SelectLengthProps {
  selectedOption: number;
  onChange: (value: number) => void;
}

export const SelectLength: React.FC<SelectLengthProps> = ({ selectedOption, onChange }) => {
  return (
    <div>
      <label htmlFor="length">Select Length:</label>
      <select
        id="length"
        value={selectedOption}
        onChange={(e) => onChange(Number(e.target.value))}
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

export default SelectLength;
