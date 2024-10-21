import React, { useState, useEffect } from "react";
// import { SelectCategory } from "../components/SelectCategory";
// import { SelectStyles } from "../components/SelectStyle";
// import StyleCategorySelector from "../components/SelectCombo";
// import { QueryButton } from "../components/QueryButton";
import SearchParamForm from "../components/SearchParamForm";
import { SearchParams, Product } from "../types";

function App() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    searchType: 0,
    porosity: 0,
    courseness: 0,
    thickness: 0,
    curlType: 0,
    length: 0,
    category: "",
    style: "",
  });
  // const [categoryVal, setCategoryVal] = useState<string>(""); // Single category for product-based search
  // const [styleVal, setStyleVal] = useState<string>(""); // For style selection
  // const [selectorType, setSelectorType] = useState<string>(""); // To differentiate between style or product based search
  // const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Multiple categories for style-based search

  const [products, setProducts] = useState<Array<Product>>([]);

  const handleSelectorChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    // setSelectorType(event.target.value);
    // if (event.target.value === "style") {
    //   setStyleVal(""); // Reset style value when changing selector
    //   setSelectedCategories([]); // Clear selected categories when switching to style-based search
    // } else {
    //   setCategoryVal(""); // Reset category when switching to product-based search
    // }
  };

  // const isAllSelected = () => {
  //   if (selectorType === "category") {
  //     return (
  //       // Check if any value in searchParams is 0
  //       Object.values(searchParams).some((value) => value === 0) &&
  //       categoryVal !== "" // category must be chosen
  //     );
  //   } else if (selectorType === "style") {
  //     return styleVal !== "" && selectedCategories.length > 0; // Check if style and categories are selected
  //   }
  //   return false;
  // };

  // const handleCategoryChange = (categories: string[]) => {
  //   setSelectedCategories(categories); // Handle multiple categories for style-based search
  // };

  // useEffect(() => {
  //   console.log("Updated styleVal:", styleVal); // Log updated styleVal
  // }, [styleVal]);

  // useEffect(() => {
  //   console.log("Selected categories:", selectedCategories); // Log selected categories
  // }, [selectedCategories]);

  const showProds = (products: Array<Product>) => {
    let str: string = "";
    for (const product of products) {
      str += JSON.stringify(product) + ",";
    }
    return str;
  };

  return (
    <div>
      {/* Input selectors */}
      <div>
        <SearchParamForm
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          setResults={setProducts}
        />
      </div>

      {products.length !== 0 && <div>{showProds(products)}</div>}
    </div>
  );
}

export default App;
