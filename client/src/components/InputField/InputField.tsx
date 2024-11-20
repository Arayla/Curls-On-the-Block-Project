import React from "react";

interface InputFieldProps {
  label: string;
  listItems: string[];
  selectedOption: number;
  onChange: (value: number) => void;
}

// Input field with dropdowns. Best way to change is to connect react setter and input the react state as selectedOption.
export const InputField: React.FC<InputFieldProps> = ({
  label,
  listItems,
  selectedOption,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor="course">{label}</label>
      <select
        id="course"
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

export default InputField;
