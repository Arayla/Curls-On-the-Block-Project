import { useState, useEffect } from "react";
import axios from "axios";
import InputField from "./InputField";
import { SearchParams } from "../types";

// Props passed to component
interface SearchFieldProps {
  searchParams: SearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
}

// Field for constant search parameters (not dependant on API call)
export const SearchParamFields: React.FC<SearchFieldProps> = ({
  searchParams,
  setSearchParams,
}) => {
  return (
    <>
      <InputField
        label="Select Porosity:"
        listItems={[
          "Select a value",
          "Not very",
          "Somewhat",
          "Average",
          "Above average",
          "Very",
        ]}
        selectedOption={searchParams.porosity}
        onChange={(newVal: number) => {
          setSearchParams({ ...searchParams, porosity: newVal });
        }}
      />
      <InputField
        label="Select Courseness:"
        listItems={[
          "Select a value",
          "Not very",
          "Somewhat",
          "Average",
          "Above average",
          "Very",
        ]}
        selectedOption={searchParams.courseness}
        onChange={(newVal: number) => {
          setSearchParams({ ...searchParams, courseness: newVal });
        }}
      />
      <InputField
        label="Select Thickness:"
        listItems={[
          "Select a value",
          "Not very",
          "Somewhat",
          "Average",
          "Above average",
          "Very",
        ]}
        selectedOption={searchParams.thickness}
        onChange={(newVal: number) => {
          setSearchParams({ ...searchParams, thickness: newVal });
        }}
      />
      <InputField
        label="Select Curl Type:"
        listItems={[
          "Select a value",
          "2A",
          "2B",
          "2C",
          "3A",
          "3B",
          "3C",
          "4A",
          "4B",
          "4C",
        ]}
        selectedOption={searchParams.curlType}
        onChange={(newVal: number) => {
          setSearchParams({ ...searchParams, curlType: newVal });
        }}
      />
      <InputField
        label="Select Length:"
        listItems={[
          "Select a length",
          "Short",
          "Somewhat short",
          "Average length",
          "Long",
          "Very long",
        ]}
        selectedOption={searchParams.length}
        onChange={(newVal: number) => {
          setSearchParams({ ...searchParams, length: newVal });
        }}
      />
    </>
  );
};

export default SearchParamFields;
