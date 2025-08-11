'use no memo';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
  
export default function Login(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleSubmit2 = async (e) => {

    e.preventDefault();

    // API CALL
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      // Save the Auth Yoken in Local Storage
      localStorage.setItem("token", json.authtoken);
      // Redirecting to the home page
      navigate("/");
      props.showAlert("Dear Daizy, WELCOME YOU","success");
    }

    else {
      props.showAlert("Invalid Credentials","danger");
    }
  };

  const onChange = (event) => {
    // Here ...note means add or overwrite if the name has the following input value
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };


  return (
      <form className="vh-100 gradient-custom" onSubmit={handleSubmit2}>
        <div className="container py-1 h-60" >
          <div className="row d-flex justify-content-center align-items-center h-60" >
            <div className="col-12 col-md-8 col-lg-6 col-xl-5" >
              <div
                className="card text-white"
                style={{ backgroundColor: "#f97794", borderRadius: "30px" }}
              >
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-3">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-70 mb-5">
                      Please enter your login and password!
                    </p>

                    <div
                      data-mdb-input-init
                      className="form-outline form-white mb-4"
                    >
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control form-control-lg"
                        value={credentials.email}
                        onChange={onChange}
                      />
                      <label className="form-label" htmlFor="typeEmailX">
                        Email
                      </label>
                    </div>

                    <div
                      data-mdb-input-init
                      className="form-outline form-white mb-4"
                    >
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control form-control-lg"
                        value={credentials.password}
                        onChange={onChange}
                      />
                      <label className="form-label" htmlFor="typePasswordX">
                        Password
                      </label>
                    </div>

                    <Link className="text-white-50" to="#!">
                      <p className="text-white-70-bold mb-5 pb-lg-2">
                        Forgot password?
                      </p>
                    </Link>

                    <button
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                    >
                      Login
                    </button>

                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <Link to="#!" className="text-white">
                        <i className="fab fa-facebook-f fa-lg"></i>
                      </Link>
                      <Link to="#!" className="text-white">
                        <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                      </Link>
                      <Link to="#!" className="text-white">
                        <i className="fab fa-google fa-lg"></i>
                      </Link>
                    </div>
                  </div>

                  <div>
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-white-50 fw-bold">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
  );
}
