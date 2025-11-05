import React, { use } from 'react';
import ProductsCard from './ProductsCard';

const AllProductsCard = ({allProducts}) => {

  const products = use(allProducts);
    // console.log(products)

    return (
        <div>
            <h1>All Products: {products.length}</h1>
            <div>
        {/* All Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4">
          {products.map((product) => (
            <ProductsCard key={product._id} product={product} />
          ))}
        </div>
      </div>
        </div>
    );
};

export default AllProductsCard;