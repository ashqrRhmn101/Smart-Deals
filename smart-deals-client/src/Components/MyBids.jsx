import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const MyBids = () => {
  const { user } = useContext(AuthContext);
  const [bids, setBids] = useState([]);
  
    console.log(user);

  useEffect(() => {
    if(user?.email){
      fetch(`http://localhost:3000/bids?email=${user.email}`,{
        headers: {
          // authorization: `Bearer ${user.accessToken}`
          authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBids(data);
      });
    }
  }, [user?.email]);


  return (
    <div>
      <h2>My Bids : {bids.length}</h2>

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

export default MyBids;
