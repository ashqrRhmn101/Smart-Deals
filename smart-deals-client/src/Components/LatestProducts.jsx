import React, { use } from "react";
import Product from "./Product";

const LatestProducts = ({ latestProducts }) => {
  const products = use(latestProducts);
  // console.log(products)

  return (
    <div className="my-10 text-center">
      {/* Section Title */}
      <h2 className="text-2xl [#7A2EFF]">
        <span className="text-[#7A2EFF] font-bold mb-6">Recent Products</span>
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      {/* Show All Button */}
      <div className="mt-6">
        <button className="btn btn-outline border-[#7A2EFF] text-[#7A2EFF] hover:bg-[#7A2EFF] hover:text-white btn-sm">
          Show All
        </button>
      </div>
    </div>
  );
};

export default LatestProducts;
