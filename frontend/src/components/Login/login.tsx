import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../store/userAction";
import { AppDispatch } from "../../store/index";
import "./login.scss";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  // @ts-ignore: Property '...' does not exist on type 'void'
  const { loading, loggedIn, success, error } = useSelector(
    // @ts-ignore: Property '...' does not exist on type 'void'
    (state) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate("/dashboard");
    }
  }, [navigate, loggedIn]);

  function handleSubmit(e: any) {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    dispatch(userLogin(data));
  }

  return (
    <div className="login">
      <h4>Enter your email and password to continue.</h4>
      <form onSubmit={handleSubmit}>
        <TextField
          helperText="Please enter your email"
          id=""
          label="email"
          color="success"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id=""
          label="password"
          helperText="Please enter your password"
          color="success"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
