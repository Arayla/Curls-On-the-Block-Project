import "./Dropdown.css";
import React from "react";

interface DropdownProps {
  name: string;
  label: string;
  listItems: string[];
  selectedOption: number;
  onChange: (value: number) => void;
}

// Input field with dropdowns. Best way to change is to connect react setter and input the react state as selectedOption.
export const Dropdown: React.FC<DropdownProps> = ({
  name,
  label,
  listItems,
  selectedOption,
  onChange,
}) => {
  let key = name.toLowerCase();

  return (
    <div className="dropdown-wrapper" id={`${key}-wrapper`}>
      <label htmlFor={`${key}-dropdown`}>{label}</label>
      <select
        id={`${key}-dropdown`}
        value={selectedOption}
        onChange={(selected) => onChange(Number(selected.target.value))}
      >
        {listItems.map((item, index) => (
          <option key={index} value={index}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
