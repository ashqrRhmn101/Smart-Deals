import React, { Children, use } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router";

const PrivateRouter = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  // console.log(location)

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (user) {
    return children;
  }

  return (
    <div>
      <Navigate state={location?.pathname} to="/login"></Navigate>
    </div>
  );
};

export default PrivateRouter;
