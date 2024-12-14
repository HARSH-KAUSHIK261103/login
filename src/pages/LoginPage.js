import React, { useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/users");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="main">
      {/* NAVBAR CREATION */}

      {/* LOGIN FORM CREATION */}
      <div className="background"></div>
      <div className="container">
        <div className="item">
          <h2 className="logo">
            <i className="bx bxl-xing"></i>
          </h2>
          <div className="text-item">
            <h2>
              Assignment <br />
              <span>Login Page</span>
            </h2>
            <p>submitted by HARSH KAUSHIK</p>
          </div>
        </div>

        {/* Login Section */}
        <div className="login-section">
          <div className="form-box login">
            <form onSubmit={handleLogin}>
              <h2>Sign In</h2>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <div className="input-box">
                <span className="icon">
                  <i className="bx bxs-envelope"></i>
                </span>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-box">
                <span className="icon">
                  <i className="bx bxs-lock-alt"></i>
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="remember-password">
                <label>
                  <input type="checkbox" />
                  Remember Me
                </label>
                <a href="#">Forget Password</a>
              </div>

              <button className="btn" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
