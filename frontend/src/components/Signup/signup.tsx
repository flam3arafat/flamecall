import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/userAction";
import { AppDispatch } from "../../store/index";
import "./signup.scss";
import TextField from "@mui/material/TextField";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const { loading, loggedIn, error, success } = useSelector(
    // @ts-ignore: Property '...' does not exist on type 'void'
    (state) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();

  function handleSubmit(e: any) {
    e.preventDefault();
    const data = {
      email,
      first_name,
      last_name,
      password,
    };

    dispatch(registerUser(data));
  }

  return (
    <div className="signup">
      <h4>Enter your details to signup.</h4>
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
          label="first name"
          helperText="Please enter your first name"
          color="success"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          id=""
          label="last name"
          helperText="Please enter your last name"
          color="success"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
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
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
