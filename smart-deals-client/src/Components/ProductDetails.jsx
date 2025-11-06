import React, { useEffect, useRef, useState } from "react";
import { useLoaderData, Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const product = useLoaderData();
  const bidModalRef = useRef(null);
  const { user } = useContext(AuthContext);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${product._id}`,{
      headers: {
        authorization: `Bearer ${user.accessToken}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Bids for Products", data);
        setBids(data);
      });
  }, [product._id]);

  // handleBidModalOpen
  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bid.value;
    const phone = e.target.phone.value;
    console.log(_id, name, email, bid,phone);
    // bidModalRef.current.close(); 

    const newBid = {
      product: _id,
      buyer_name: name,
      buyer_email: email,
      buyer_image: user?.photoURL || "",
      bid_price: bid,
      buyer_contact: phone,
      status: "pending",
    };

    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            title: "Drag me!",
            icon: "success",
            draggable: true,
          });
          // add the new bid to the state
          newBid._id = data.insertedId;
          const newBids = [...bids, newBid];
          newBids.sort((a, b) => b.bid_price - a.bid_price);
          setBids(newBids);
        }
      });
  };

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
  // console.log(product)

  return (
    <div>
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
              <h3 className="font-semibold text-lg mb-3">
                Product Description
              </h3>
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

            {/* Open Modal Button */}
            <button
              onClick={handleBidModalOpen}
              className="btn btn-primary w-full mt-4"
            >
              I Want Buy This Product
            </button>

            {/* Modal */}
            <dialog
              ref={bidModalRef}
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <h3 className="text-xl font-semibold text-center mb-4">
                  Give Seller Your Offered Price
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Buyer Name + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="label">
                        <span className="label-text">Buyer Name</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="input input-bordered w-full"
                        readOnly
                        value={user?.displayName || ""}
                      />
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text">Buyer Email</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="input input-bordered w-full"
                        readOnly
                        value={user?.email || ""}
                      />
                    </div>
                  </div>

                  {/* Buyer Image URL */}
                  <div>
                    <label className="label">
                      <span className="label-text">Buyer Image URL</span>
                    </label>
                    <input
                      //type="url"
                      placeholder="https://your-image-url.com"
                      className="input input-bordered w-full"
                    />
                  </div>

                  {/* Bid Offered Price */}
                  <div>
                    <label className="label">
                      <span className="label-text">Place your Price</span>
                    </label>
                    <input
                      type="number"
                      name="bid"
                      className="input input-bordered w-full"
                      placeholder="e.g. 65000"
                      required
                    />
                  </div>

                  {/* Contact Info */}
                  <div>
                    <label className="label">
                      <span className="label-text">Contact Info</span>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="e.g. +8801711-223344"
                      className="input input-bordered w-full"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="modal-action justify-between">
                    <button
                      type="button"
                      className="btn btn-outline btn-primary"
                      onClick={() => bidModalRef.current.close()}
                    >
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

      {/* Bids for the Products */}
      <div className="bg-gray-50 p-6 rounded-xl shadow-md mt-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Bids For This Product:{" "}
          <span className="text-purple-600 font-bold text-3xl">
            {bids.length.toString().padStart(2, "0")}
          </span>
        </h2>

        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Table Head */}
            <thead>
              <tr className="text-gray-600 border-b">
                <th>SL No</th>
                <th>Buyer</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Bid Price</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {bids.length > 0 ? (
                bids.map((bid, index) => (
                  <tr key={bid._id} className="hover:bg-gray-100">
                    <td>{index + 1}</td>

                    {/* Buyer Info */}
                    <td className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-10 h-10 rounded-full">
                          <img
                            src={bid.buyer_image}
                            alt={bid.buyer_name}
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {bid.buyer_name}
                        </h3>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="text-gray-700">{bid.buyer_email}</td>

                    {/* Contact */}
                    <td className="text-gray-700">{bid.buyer_contact}</td>

                    {/* Bid Price */}
                    <td className="font-semibold text-green-600">
                      ${bid.bid_price}
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          bid.status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : bid.status === "accepted"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {bid.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="btn btn-xs bg-green-100 text-green-700 border border-green-300 hover:bg-green-200">
                          Accept Offer
                        </button>
                        <button className="btn btn-xs bg-red-100 text-red-700 border border-red-300 hover:bg-red-200">
                          Reject Offer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 py-5">
                    No Bids Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
