import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import baseUrl from "../../../util/baseUrl";
import Button from "../Button/Button.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    if (response.status === 200) {
      console.log("login successful");
      let data = await response.json();
      console.log(data);
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("userId", data.userId);
      window.localStorage.setItem("username", data.username);
      navigate("/");
    } else {
      setErrorMessage("Email or Password incorrect,\nplease try again");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="top"></div>
        <div className="bottom"></div>
        <div className="center">
          <div className="loginform">
            <form onSubmit={handleLoginSubmit}>
              <h1>Login</h1>
              <input
                id="login-email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
              <input
                id="login-password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <Button
                id="login-submit"
                type="submit"
                aria-label="Login"
                className="btn"
              >
                Login
              </Button>
            </form>
          </div>
          <br></br>
          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}
          <h2>&nbsp;</h2>
        </div>
      </div>
    </>
  );
};

export default Login;
