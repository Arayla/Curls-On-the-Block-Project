import React, { useState, useEffect } from "react";
import { SelectCategory } from "../components/SelectCategory";
import { SelectStyles } from "../components/SelectStyle";
import StyleCategorySelector from "../components/SelectCombo";
import { QueryButton } from "../components/QueryButton";
import SearchParamFields from "../components/SearchParamFields";
import { SearchParams } from "../types";

function App() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    porosity: 0,
    courseness: 0,
    thickness: 0,
    curlType: 0,
    length: 0,
  });
  const [categoryVal, setCategoryVal] = useState<string>(""); // Single category for product-based search
  const [styleVal, setStyleVal] = useState<string>(""); // For style selection
  const [selectorType, setSelectorType] = useState<string>(""); // To differentiate between style or product based search
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Multiple categories for style-based search

  const handleSelectorChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectorType(event.target.value);
    if (event.target.value === "style") {
      setStyleVal(""); // Reset style value when changing selector
      setSelectedCategories([]); // Clear selected categories when switching to style-based search
    } else {
      setCategoryVal(""); // Reset category when switching to product-based search
    }
  };

  const isAllSelected = () => {
    if (selectorType === "category") {
      return (
        // Check if any value in searchParams is 0
        Object.values(searchParams).some((value) => value === 0) &&
        categoryVal !== "" // category must be chosen
      );
    } else if (selectorType === "style") {
      return styleVal !== "" && selectedCategories.length > 0; // Check if style and categories are selected
    }
    return false;
  };

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories); // Handle multiple categories for style-based search
  };

  useEffect(() => {
    console.log("Updated styleVal:", styleVal); // Log updated styleVal
  }, [styleVal]);

  useEffect(() => {
    console.log("Selected categories:", selectedCategories); // Log selected categories
  }, [selectedCategories]);

  return (
    <div>
      {/* Input selectors */}
      <SearchParamFields
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      {/* Search type selector */}
      <div>
        <label htmlFor="selector">Choose a search type:</label>
        <select
          id="selector"
          value={selectorType}
          onChange={handleSelectorChange}
        >
          <option value="">Select an option</option>
          <option value="category">Product Based</option>
          <option value="style">Style Based</option>
        </select>
      </div>

      {/* Category based search */}
      {selectorType === "category" && (
        <SelectCategory
          selectedOption={categoryVal}
          onChange={setCategoryVal}
        />
      )}

      {/* Style based search */}
      {selectorType === "style" && (
        <>
          <SelectStyles selectedOption={styleVal} onChange={setStyleVal} />
          {styleVal && (
            <StyleCategorySelector
              onCategoryChange={handleCategoryChange}
              styleVal={styleVal}
            />
          )}
        </>
      )}

      {/* Render query button when all values are selected */}
      {isAllSelected() && (
        <div>all selected</div>
        // <QueryButton
        //   porosityVal={porosityVal}
        //   courseVal={courseVal}
        //   thicknessVal={thicknessVal}
        //   curlTypeVal={curlTypeVal}
        //   lengthVal={lengthVal}
        //   categoryVal={
        //     selectorType === "category"
        //       ? categoryVal
        //       : selectedCategories.join(", ")
        //   } // Pass categories based on selection type
        // />
      )}

      {/* Warning if not all fields are selected */}
      {!isAllSelected() && (
        <div style={{ color: "red" }}>Please fill out all fields.</div>
      )}
    </div>
  );
}

export default App;
