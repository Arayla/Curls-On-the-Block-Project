import React, { useState, useEffect } from "react";
import { SearchParamForm, ProductContainer } from "../components";
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
    ingredientFilter: [],
  });
  const [products, setProducts] = useState<Array<Product>>([]);

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
      <div>
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
