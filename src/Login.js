import { useState } from "react";
import validator from "validator";

const Login = () => {
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [pwdErrorMessage, setPwdErrorMessage] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var token = undefined;

  const validateEmailInput = (e) => {
    const val = e.target.value;
    if (!validator.isEmail(val))
      setEmailErrorMessage("Please enter a valid email");
    else setEmailErrorMessage("");

    setEmail(val);
  };

  const validatePasswordInput = (e) => {
    const pwd = e.target.value;
    if (!pwd || pwd.length < 1)
      setPwdErrorMessage("Please enter atleast 1 character");
    else setPwdErrorMessage("");

    setPassword(pwd);
  };

  const doLogin = async () => {
    const res = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email, //"eve.holt@reqres.in",
        password: password, //"cityslicka",
      }),
    });
    const json = await res.json();
    // Response token is received. We can set this token request header in subsequent API requests
    token = json.token;

    if (token) {
      setLoginMessage("Login Successful !");
      document.getElementById("alertSuccess").hidden = false;
      document.getElementById("alertError").hidden = true;
    } else {
      setLoginMessage("Login Failed !");
      document.getElementById("alertError").hidden = false;
      document.getElementById("alertSuccess").hidden = true;
    }
  };

  return (
    <>
      <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
        <div
          id="alertSuccess"
          className="alert alert-success"
          data-testid="alertSuccess"
          role="alert"
          hidden={true}
        >
          {loginMessage}
        </div>
        <div
          id="alertError"
          data-testid="alertError"
          className="alert alert-danger"
          role="alert"
          hidden={true}
        >
          {loginMessage}
        </div>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            data-testid="emailInput"
            placeholder="Enter email"
            onChange={(e) => validateEmailInput(e)}
          ></input>
          <span style={{ fontWeight: "bold", color: "red" }}>
            {emailErrorMessage}
          </span>
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="inputPassword"
            data-testid="inputPassword"
            className="form-control"
            placeholder="Enter password"
            aria-describedby="passwordHelpBlock"
            onChange={(e) => validatePasswordInput(e)}
          ></input>
          <span style={{ fontWeight: "bold", color: "red" }}>
            {pwdErrorMessage}
          </span>
          <div id="passwordHelpBlock" className="form-text">
            Your password must be atleast 1 character long.
          </div>
        </div>
        <div className="col-12">
          <button
            id="btnLogin"
            data-testid="btnLogin"
            type="submit"
            className="btn btn-primary"
            disabled={emailErrorMessage || pwdErrorMessage}
            onClick={doLogin}
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};
export default Login;
