import React, { useState, useEffect } from "react";
import { SelectPorosity } from "../components/select_porosity";
import { SelectCourse } from "../components/select_course";
import { SelectThickness } from "../components/select_thickness";
import { SelectCurlType } from "../components/select_curltype";
import { SelectLength } from "../components/select_length";
import { SelectCategory } from "../components/select_category";
import { SelectStyles } from "../components/select_style";
import StyleCategorySelector from "../components/select_combo"; // Ensure this is the correct import
import { QueryButton } from "../components/query_button";

function App() {
  const [porosityVal, setPorosityVal] = useState<number>(0);
  const [courseVal, setCourseVal] = useState<number>(0);
  const [thicknessVal, setThicknessVal] = useState<number>(0);
  const [curlTypeVal, setCurlTypeVal] = useState<number>(0);
  const [lengthVal, setLengthVal] = useState<number>(0);
  const [categoryVal, setCategoryVal] = useState<string>(""); // Single category for product-based search
  const [styleVal, setStyleVal] = useState<string>(""); // For style selection
  const [selectorType, setSelectorType] = useState<string>(""); // To differentiate between style or product based search
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Multiple categories for style-based search

  const handleSelectorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
        porosityVal !== 0 &&
        courseVal !== 0 &&
        thicknessVal !== 0 &&
        curlTypeVal !== 0 &&
        lengthVal !== 0 &&
        categoryVal !== ""
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
      <SelectPorosity selectedOption={porosityVal} onChange={setPorosityVal} />
      <SelectCourse selectedOption={courseVal} onChange={setCourseVal} />
      <SelectThickness selectedOption={thicknessVal} onChange={setThicknessVal} />
      <SelectCurlType selectedOption={curlTypeVal} onChange={setCurlTypeVal} />
      <SelectLength selectedOption={lengthVal} onChange={setLengthVal} />

      {/* Search type selector */}
      <div>
        <label htmlFor="selector">Choose a search type:</label>
        <select id="selector" value={selectorType} onChange={handleSelectorChange}>
          <option value="">Select an option</option>
          <option value="category">Product Based</option>
          <option value="style">Style Based</option>
        </select>
      </div>

      {/* Category based search */}
      {selectorType === "category" && (
        <SelectCategory selectedOption={categoryVal} onChange={setCategoryVal} />
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
        <QueryButton
          porosityVal={porosityVal}
          courseVal={courseVal}
          thicknessVal={thicknessVal}
          curlTypeVal={curlTypeVal}
          lengthVal={lengthVal}
          categoryVal={selectorType === "category" ? categoryVal : selectedCategories.join(", ")} // Pass categories based on selection type
        />
      )}

      {/* Warning if not all fields are selected */}
      {!isAllSelected() && (
        <div style={{ color: 'red' }}>Please fill out all fields.</div>
      )}
    </div>
  );
}

export default App;
