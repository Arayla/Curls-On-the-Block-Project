import React from "react";

interface InputFieldProps {
  defaultText: string;
  listItems: string[];
  selectedOption: number;
  onChange: (value: number) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  defaultText,
  listItems,
  selectedOption,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor="course">{defaultText}</label>
      <select
        id="course"
        value={selectedOption}
        onChange={(selected) => onChange(Number(selected.target.value))}
      >
        {listItems.map((item, index) => (
          <option value={index}>{item}</option>
        ))}
      </select>
    </div>
  );
};

export default InputField;
