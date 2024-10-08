import { useState, useEffect } from "react";
import axios from "axios";
import InputField from "./InputField";
import {
  SearchParams,
  SEARCH_NOT_SPECIFIED,
  SEARCH_CATEGORIES,
  SEARCH_STYLES,
} from "../types";

// Props passed to component
interface SearchFieldProps {
  searchParams: SearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
}

async function callServer(
  endpoint: string,
  setDropdown: React.Dispatch<React.SetStateAction<Array<string>>>
): Promise<void> {
  try {
    // Fetching data from the server
    const response = await axios.get(endpoint, {
      params: {
        table: "styles",
      },
    });

    // Updating the state with the fetched data
    let stringArr: Array<string> = response.data.map(
      (item: { category_name: string; style_name: string }) =>
        item.category_name ? item.category_name : item.style_name
    );
    setDropdown(stringArr);
  } catch (error) {
    console.error("Error calling server:", error);
  }
}

// Field for constant search parameters (not dependant on API call)
export const SearchParamFields: React.FC<SearchFieldProps> = ({
  searchParams,
  setSearchParams,
}) => {
  const [categories, setCategories] = useState<Array<string>>(["Loading..."]);
  const [styles, setStyles] = useState<Array<string>>(["Loading..."]);

  // useEffect hook to call the server when the component mounts
  useEffect(() => {
    callServer("http://localhost:8000/styles", setStyles);
    callServer("http://localhost:8000/categories", setCategories);
  }, [searchParams.searchType]);

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
      <InputField
        label="Select a Search Type:"
        listItems={["Select a search type", "Style based", "Product based"]}
        selectedOption={searchParams.searchType}
        onChange={(newVal: number) => {
          setSearchParams({ ...searchParams, searchType: newVal });
        }}
      />

      {searchParams.searchType === SEARCH_CATEGORIES && (
        <InputField
          label="Select Category:"
          listItems={categories}
          selectedOption={categories.indexOf(searchParams.category)}
          onChange={(newVal: number) => {
            setSearchParams({ ...searchParams, category: categories[newVal] });
          }}
        />
      )}
      {searchParams.searchType === SEARCH_STYLES && (
        <InputField
          label="Select Style:"
          listItems={styles}
          selectedOption={styles.indexOf(searchParams.style)}
          onChange={(newVal: number) => {
            setSearchParams({ ...searchParams, style: styles[newVal] });
          }}
        />
      )}
    </>
  );
};

export default SearchParamFields;
