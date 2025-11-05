import React from "react";
import AllProductsCard from "./AllProductsCard";
// import { Link } from "react-router";

const allProducts = fetch("http://localhost:3000/products").then(res => res.json())

const AllProducts = () => {
  // const products = use(allProducts);
  // console.log(products);

  return (
    <div>

    <AllProductsCard allProducts={allProducts}/>

      {/* <div>
        All Product Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4">
          {products.map((product) => (
            <AllProductsCard key={product._id} product={product} />
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default AllProducts;
