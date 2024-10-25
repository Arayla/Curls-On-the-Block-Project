import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import {
  SearchParams,
  SEARCH_NOT_SPECIFIED,
  SEARCH_CATEGORIES,
  SEARCH_STYLES,
} from "../types";
import {
  Search,
  getCombinationsForStyle,
  getStylesCategories,
} from "../services";
import { Product } from "../types";

// Props passed to component
interface SearchFormProps {
  searchParams: SearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
  setResults: React.Dispatch<React.SetStateAction<Product[]>>;
}

// Field for constant search parameters (not dependant on API call)
export const SearchParamForm: React.FC<SearchFormProps> = ({
  searchParams,
  setSearchParams,
  setResults,
}) => {
  const [categories, setCategories] = useState<Array<string>>(["Loading..."]);
  const [styles, setStyles] = useState<Array<string>>(["Loading..."]);
  const [combos, setCombos] = useState<Array<string>>([]);
  const [allSelected, setAllSelected] = useState<boolean>(false);

  // useEffect hook to call the server when the component mounts
  useEffect(() => {
    // console.log("Getting styles and categories...");
    getStylesCategories(setStyles, setCategories);
  }, [searchParams.searchType]);

  // call the server for combos when styles is changed
  useEffect(() => {
    setSearchParams({ ...searchParams, category: "" });
    getCombinationsForStyle(searchParams.style, setCombos);
  }, [searchParams.style]);

  useEffect(() => {
    setAllSelected(isAllSelected());
  }, [searchParams]);

  // Convenience function which will use the user's input index to set the state of a string property in searchParams
  const setStringParamFromInputIdx = (
    propToSet: keyof SearchParams,
    strArr: Array<string>,
    newIdx: number
  ) => {
    let newStr;
    if (newIdx === 0) {
      // Base option
      newStr = "";
    } else {
      newStr = strArr[newIdx];
    }
    // Setter fxn
    setSearchParams({ ...searchParams, [propToSet]: newStr });
  };

  // Checks if everything is selected
  const isAllSelected = () => {
    if (searchParams.searchType === SEARCH_CATEGORIES) {
      return (
        // check if everything is selected
        searchParams.porosity !== 0 &&
        searchParams.courseness !== 0 &&
        searchParams.thickness !== 0 &&
        searchParams.curlType !== 0 &&
        searchParams.length !== 0 &&
        searchParams.category !== ""
      );
    } else if (searchParams.searchType === SEARCH_STYLES) {
      return searchParams.style !== "" && searchParams.category !== ""; // Check if style and categories are selected
    }

    return false;
  };

  // Handle submission
  const handleSubmit = () => {
    Search(searchParams, setResults, categories);
  };

  return (
    <>
      <div className="search-param-form">
        {/* ----- Static List Fields ----- */}
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

        {/* ----- Lists From API Calls ----- */}
        {/* Search by Category */}
        {searchParams.searchType === SEARCH_CATEGORIES && (
          <InputField
            label="Select Category:"
            listItems={categories}
            selectedOption={categories.indexOf(searchParams.category)}
            onChange={(newIdx: number) => {
              setStringParamFromInputIdx("category", categories, newIdx);
            }}
          />
        )}
        {/* Search by Styles */}
        {searchParams.searchType === SEARCH_STYLES && (
          <InputField
            label="Select Style:"
            listItems={styles}
            selectedOption={styles.indexOf(searchParams.style)}
            onChange={(newIdx: number) => {
              setStringParamFromInputIdx("style", styles, newIdx);
            }}
          />
        )}
        {searchParams.style !== "" && (
          <InputField
            label="Select Category Combo:"
            listItems={combos}
            selectedOption={combos.indexOf(searchParams.category)}
            onChange={(newIdx: number) => {
              setStringParamFromInputIdx("category", combos, newIdx);
            }}
          />
        )}

        {/* Button only shows when search is ready */}
        {allSelected && (
          <button type="submit" onClick={handleSubmit}>
            Search
          </button>
        )}
      </div>
    </>
  );
};

export default SearchParamForm;
