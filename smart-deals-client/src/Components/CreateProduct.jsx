import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";

const CreateProduct = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const handleCreateAProduct = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const image = e.target.pImage.value;
    const price_min = e.target.price_min.value;
    const price_max = e.target.price_max.value;
    console.log(title, image, price_min, price_max);

    const newProduct = {
      title,
      image,
      price_min,
      price_max,
      email: user.email,
      seller_name: user.displayName,
    };

    axios.post("http://localhost:3000/products", newProduct).then((data) => {
      console.log(data.data);
      if (data.data.insertedId) {
        Swal.fire({
          title: "Your Product has been created",
          icon: "success",
          draggable: true,
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="card shadow-xl bg-white">
          <div className="card-body">
            <h2 className="card-title text-3xl font-bold text-purple-700">
              Create A Product
            </h2>
            <form onSubmit={handleCreateAProduct} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title (e.g. Yamaha Fz Guitar for Sale)"
                className="input input-bordered w-full"
              />

              <select className="select select-bordered w-full">
                <option disabled selected>
                  Select a Category
                </option>
                <option>Electronics</option>
                <option>Musical Instruments</option>
                <option>Books</option>
                <option>Others</option>
              </select>

              <div className="flex gap-4">
                <input
                  type="number"
                  name="price_min"
                  placeholder="Min Price You want to Sale ($)"
                  className="input input-bordered w-full"
                />
                <input
                  type="number"
                  name="price_max"
                  placeholder="Max Price You want to Sale ($)"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="flex gap-6 items-center">
                <label className="label cursor-pointer">
                  <span className="label-text">Brand New</span>
                  <input
                    type="radio"
                    name="condition"
                    className="radio checked:bg-purple-500"
                    defaultChecked
                  />
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text">Used</span>
                  <input
                    type="radio"
                    name="condition"
                    className="radio checked:bg-purple-500"
                  />
                </label>
              </div>

              <input
                type="text"
                placeholder="Product Usage time (e.g. 1 year 3 month)"
                className="input input-bordered w-full"
              />
              <input
                type="url"
                name="pImage"
                placeholder="Your Product Image URL (https://...)"
                className="input input-bordered w-full"
              />

              <input
                type="text"
                placeholder="Seller Name (e.g. Artisan Roasters)"
                className="input input-bordered w-full"
              />
              <input
                type="email"
                placeholder="Seller Email"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Seller Contact (e.g. +1-555-1234)"
                className="input input-bordered w-full"
              />
              <input
                type="url"
                placeholder="Seller Image URL (https://...)"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Location (City, Country)"
                className="input input-bordered w-full"
              />

              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Simple Description about your Product"
              ></textarea>

              {/* Submit Button */}
              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full py-3 rounded-md text-white font-medium bg-gradient-to-r from-[#7A2EFF] to-[#C861FF] hover:opacity-95"
                  //   disabled={loading}
                >
                  {/* {loading ? "Creating..." : "Create A Product"} */}
                  Create A Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
