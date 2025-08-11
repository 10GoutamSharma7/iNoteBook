
import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style/Signup.css';
import signupImage from '../signupimage.jpg';

export default function Signup(props) {
  const [credentials, setCredentials] = useState({ name:"", email: "", password: "", cpassword: "" });
  const navigate = useNavigate();

  const handleSubmit3 = async (e) => {
    e.preventDefault();
    const {name, email, password} = credentials;
    // API CALL
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, email, password}),
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      // Save the Auth Yoken in Local Storage
      localStorage.setItem("token", json.authtoken);
      // Redirecting to the home page
      navigate("/");
      props.showAlert("Hello :)\n iNOTEBOOK WELCOME YOU","success");
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
    <div>
      <section className="vh-100" onSubmit={handleSubmit3}>
        <div className=" container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "30px" }}>
                <div className="card-body p-md-5" id='outerdiv' style={{ borderRadius: "30px" }}>
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 d-flex flex-column justify-content-center align-items-center order-2 order-lg-1" style={{minHeight: '420px'}}>
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              // value={credentials.name}
                              onChange={onChange}
                              className="form-control"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1c"
                            >
                              Your Name
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="email"
                              name="email"
                              // value={credentials.email}
                              onChange={onChange}
                              className="form-control"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              Your Email
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="password"
                              name="password"
                              // value={credentials.password}
                              onChange={onChange}
                              className="form-control"
                              minLength={5}
                              required
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Password
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="cpassword"
                              name="cpassword"
                              // value={credentials.password}
                              onChange={onChange}
                              className="form-control"
                              minLength={5}
                              required
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4cd"
                            >
                              Repeat your password
                            </label>
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="form2Example3c"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="form2Example3"
                          >
                            I agree all statements in{" "}
                            <Link to="#!">Terms of service</Link>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Create Account
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center justify-content-center order-1 order-lg-2" style={{minHeight: '420px'}}>
                      <img
                        src={signupImage}
                        className="img-fluid"
                        alt="Signup visual"
                        style={{ borderRadius: "30px", height: '380px', width: '100%', objectFit: 'cover', boxShadow: '0 4px 24px 0 rgba(180,134,11,0.13)' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

