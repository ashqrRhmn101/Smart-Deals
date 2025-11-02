import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignInUser = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then((result) => {
        console.log(result);
        navigate("/");
        e.target.reset();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col bg-amber-100">
          <div className="card bg-base-100 w-[500px] max-w-sm shrink-0 shadow-2xl">
            <h1 className="text-5xl font-bold text-center">Login now!</h1>
            <div className="card-body">
              <form onSubmit={handleSignInUser}>
                <fieldset className="fieldset">
                  {/* Email */}
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input"
                    name="email"
                    placeholder="Email"
                  />
                  {/* Password */}
                  <label className="label">Password</label>
                  <input
                    type="password"
                    className="input"
                    name="password"
                    placeholder="Password"
                  />
                  <div>
                    <a className="link link-hover">Forgot password?</a>
                  </div>
                  <button className="btn btn-neutral mt-4">Register</button>
                </fieldset>
                <h2 className="font-semibold">
                  No account <Link to="/register"><span className="text-blue-500 font-bold">Register</span></Link>
                </h2>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
