import { Component, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "./Layout/RootLayout.jsx";
import Home from "./Components/Home.jsx";
import AllProducts from "./Components/AllProducts.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import Register from "./Components/Register.jsx";
import MyProducts from "./Components/MyProducts.jsx";
import MyBids from "./Components/MyBids.jsx";
import ProductDetails from "./Components/ProductDetails.jsx";
import Login from "./Components/Login.jsx";
import AllProductsCard from "./Components/AllProductsCard.jsx";
import PrivateRouter from "./Provider/PrivateRouter.jsx";
import CreateProduct from "./Components/CreateProduct.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/allProduct",
        Component: AllProducts,
      },

      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/myProducts",
        // Component: MyProducts,
        element: (
          <PrivateRouter>
            <MyProducts />
          </PrivateRouter>
        ),
      },
      {
        path: "/myBids",
        // Component: MyBids,
        element: (
          <PrivateRouter>
            <MyBids />
          </PrivateRouter>
        ),
      },
      {
        path: "/productDetails/:id",
        element: (
          <PrivateRouter>
            <ProductDetails />
          </PrivateRouter>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/products/${params.id}`),
        // Component: ProductDetails,
      },
      {
        path: "/createProduct",
        element: (
          <PrivateRouter>
            <CreateProduct />
          </PrivateRouter>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
