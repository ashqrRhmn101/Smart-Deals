import React from 'react';
import { Link } from 'react-router';

const ProductsCard = ({product}) => {
    // console.log(product)

    const { title, image, price_min, price_max, condition, usage, _id } = product;

    return (
        <div>
            <div className="border rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Product Image */}
      <div className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Product Info */}
      <div className="mt-3 text-center space-y-1">
        <h2 className="font-semibold text-gray-800 text-sm leading-snug">
          {title}{" "}
          <span className="text-gray-500 text-xs">
            [ {condition === "used" ? "Used" : "Fresh"}{" "}
            {usage ? `| ${usage}` : ""} ]
          </span>
        </h2>

        <p className="text-[#7A2EFF] font-semibold text-sm">
          ${price_min} - {price_max}
        </p>

        {/* View Details Button */}
        <Link
          to={`/productDetails/${_id}`}
          className="btn w-full border border-[#7A2EFF] text-[#7A2EFF] rounded-md py-1 mt-1 text-sm hover:bg-[#7A2EFF] hover:text-white transition-all duration-300"
        >
          <button className="">View Details</button>
        </Link>
      </div>
    </div>
        </div>
    );
};

export default ProductsCard;