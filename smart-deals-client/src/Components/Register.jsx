import React, { use, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router";

const Register = () => {
  const { setUser, createUser } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email, password);

    // // Reset
    setLoading(true);

    // createUser
    createUser(email, password)
      .then((result) => {
        // console.log(result);
        setUser(result);
        setLoading(false);
        navigate(`${location.state ? location.state : "/"}`);
        // navigate("/");
        e.target.reset();
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  };

  if (loading) {
    return <h1>Loading..........</h1>;
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col bg-amber-100">
        <div className="card bg-base-100 w-[500px] max-w-sm shrink-0 shadow-2xl">
          <h1 className="text-5xl font-bold text-center">Register now!</h1>
          <div className="card-body">
            <form onSubmit={handleRegister}>
              <fieldset className="fieldset">
                {/* Name */}
                <label className="label">Name</label>
                <input
                  type="text"
                  className="input"
                  name="name"
                  placeholder="Your Name"
                  required
                />
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
                Already have an account{" "}
                <Link to="/login">
                  <span className="text-blue-500 font-bold">Login</span>
                </Link>
              </h2>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
