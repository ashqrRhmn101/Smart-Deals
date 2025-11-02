import React, { use, useRef } from "react";
import { useLoaderData, Link } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const ProductDetails = () => {
  const product = useLoaderData();
  const bidModalRef = useRef(null);
  const {user} = use(AuthContext)
  console.log(user.email)

  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  };

//   Handle Submit
const handleSubmit = () =>{

}

  const {
    _id,
    title,
    price_min,
    price_max,
    email,
    category,
    created_at,
    image,
    status,
    location,
    seller_image,
    seller_name,
    condition,
    usage,
    description,
    seller_contact,
  } = product;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-base-100">
      {/* Back Button */}
      <div className="mb-4">
        <Link
          to="/"
          className="text-sm flex items-center gap-1 text-gray-600 hover:text-indigo-600"
        >
          <span className="text-lg">←</span> Back To Products
        </Link>
      </div>

      {/* Product Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* LEFT SIDE */}
        <div>
          {/* Product Image */}
          <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img
              src={image}
              alt={title}
              className="w-full h-80 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Product Description */}
          <div className="border rounded-lg p-5">
            <h3 className="font-semibold text-lg mb-3">Product Description</h3>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <p>
                <strong>Condition:</strong> {condition}
              </p>
              <p>
                <strong>Usage:</strong> {usage}
              </p>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
          <span className="badge badge-outline mb-3 capitalize">
            {category}
          </span>

          <div className="text-2xl font-semibold text-green-600 mb-1">
            ৳{price_min} - ৳{price_max}
          </div>
          <p className="text-sm text-gray-500 mb-4">Price range</p>

          {/* Product Info */}
          <div className="border rounded-lg p-4 mb-4">
            <h3 className="font-semibold mb-2">Product Details</h3>
            <p>
              <strong>Product ID:</strong> {_id}
            </p>
            <p>
              <strong>Posted:</strong>{" "}
              {new Date(created_at).toLocaleDateString()}
            </p>
          </div>

          {/* Seller Info */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Seller Information</h3>
            <div className="flex items-center gap-3 mb-3">
              <img
                src={seller_image}
                alt={seller_name}
                className="w-12 h-12 rounded-full border object-cover"
              />
              <div>
                <p className="font-medium">{seller_name}</p>
                <p className="text-sm text-gray-500">{email}</p>
              </div>
            </div>
            <p>
              <strong>Location:</strong> {location}
            </p>
            <p>
              <strong>Contact:</strong> {seller_contact}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`badge ${
                  status === "pending"
                    ? "badge-warning"
                    : status === "sold"
                    ? "badge-error"
                    : "badge-success"
                }`}
              >
                {status}
              </span>
            </p>
          </div>

          <button
            onClick={handleBidModalOpen}
            className="btn btn-primary w-full mt-4"
          >
            I Want Buy This Product
          </button>

          {/* Open the modal using document.getElementById('ID').showModal() method */}
          {/* Modal */}
          <dialog
            ref={bidModalRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="text-xl font-semibold text-center mb-4">
                Give Seller Your Offered Price
              </h3>

              <form onSubmit={handleSubmit} method="dialog" className="space-y-4">
                {/* Buyer Name + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="label">
                      <span className="label-text">Buyer Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="input input-bordered w-full"
                      readOnly
                      defaultValue={user.displayName}
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Buyer Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Your email"
                      className="input input-bordered w-full"
                      readOnly
                      defaultValue={user.email}
                    />
                  </div>
                </div>

                {/* Buyer Image URL */}
                <div>
                  <label className="label">
                    <span className="label-text">Buyer Image URL</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://your-image-url.com"
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Offered Price */}
                <div>
                  <label className="label">
                    <span className="label-text">Place your Price</span>
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 65000"
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Contact Info */}
                <div>
                  <label className="label">
                    <span className="label-text">Contact Info</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. +8801711-223344"
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Buttons */}
                <div className="modal-action">
                  <button className="btn btn-outline btn-primary">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn bg-purple-600 text-white"
                  >
                    Submit Bid
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
