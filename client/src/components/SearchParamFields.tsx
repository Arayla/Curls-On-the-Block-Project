import { useState, useEffect } from "react";
import axios from "axios";
import InputField from "./InputField";

interface SearchParamFieldProps {}

export const SearchParamFields: React.FC<SearchParamFieldProps> = ({}) => {
  const [porosity, setPorosity] = useState<number>(0);

  return (
    <>
      <InputField
        defaultText="Select Porosity:"
        listItems={[
          "Select a value",
          "Not very",
          "Somewhat",
          "Average",
          "Above average",
          "Very",
        ]}
        selectedOption={porosity}
        onChange={setPorosity}
      />
    </>
  );

  {
    /* <SelectPorosity selectedOption={porosityVal} onChange={setPorosityVal} />
      <SelectCourse selectedOption={courseVal} onChange={setCourseVal} />
      <SelectThickness
        selectedOption={thicknessVal}
        onChange={setThicknessVal}
      />
      <SelectCurlType selectedOption={curlTypeVal} onChange={setCurlTypeVal} />
      <SelectLength selectedOption={lengthVal} onChange={setLengthVal} /> */
  }
};

export default SearchParamFields;
