import React from "react";
import "./InputRange.css";

interface InputRangeProps {
  name: string;
  label: string;
  range: Array<number>;
  step: number;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

export const InputRange: React.FC<InputRangeProps> = ({
  name,
  label,
  range,
  step,
  value,
  setValue,
}) => {
  if (range.length !== 2)
    throw new Error(`Input Range ${name} Error: range must be array of size 2`);

  let key = name.toLowerCase();
  return (
    <>
      <div className="input-range-wrapper" id={`${key}-wrapper`}>
        <div className="input-range-label" id={`${key}-label`}>
          {label}
        </div>
        <div className="range-inner-wrapper">
          <input
            className="input-range"
            type="range"
            aria-labelledby={`#${key}-label`}
            id={key}
            min={range[0]}
            max={range[1]}
            value={value}
            step={step}
            onChange={(event) => {
              setValue(Number(event.target.value));
            }}
            list={`${key}-markers`}
          />
          <div className="input-range-postlabel" id={`${key}-postlabel`}>
            {value}
          </div>
        </div>
      </div>

      <datalist id={`${key}-markers`}>
        <option value="0" label="0"></option>
        <option value="1" label="1"></option>
        <option value="2" label="2"></option>
        <option value="3" label="3"></option>
        <option value="4" label="4"></option>
        <option value="5" label="5"></option>
      </datalist>
    </>
  );
};
