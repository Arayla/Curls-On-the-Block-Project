import "./App.css";
import React, { useState, useEffect } from "react";
import { SearchParamForm, ProductContainer, InputRange } from "../components";
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
  const [products, setProducts] = useState<Array<Product>>([]);
  const [test, setTest] = useState<number>(1);

  const ShowProducts = (products: Array<Product>) => {
    const productContainers: Array<JSX.Element> = [];

    products.forEach((product) => {
      productContainers.push(<ProductContainer product={product} />);
    });

    return productContainers;
  };

  return (
    <>
      {/* Input selectors */}
      <div className="search-param-wrapper">
        <InputRange
          name="test"
          label="Select value:"
          range={[0, 5]}
          step={1}
          value={test}
          setValue={setTest}
        />
        <SearchParamForm
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          setResults={setProducts}
        />
      </div>

      {products.length !== 0 && ShowProducts(products)}
    </>
  );
}

export default App;
