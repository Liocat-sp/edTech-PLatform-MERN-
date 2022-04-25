import React, { useReducer } from "react";
import Input from "../../components/Input";

import { createUseStyles } from "react-jss";
import { INPUT_CHANGE } from "../../constants";
import { userSignup } from "../../Actions/userAction";

const useStyle = createUseStyles((theme) => ({
  page: {
    padding: "12px 24px",
    width: "100%",
  },
  pageForm: {
    width: 500,
    margin: "0 auto",
  },
  btn: {
    maxWidth: 450,
    width: "100%",
    borderRadius: "6px",
    padding: "1rem",
    background: "#000",
    color: "#fff",
    outline: "none",
    border: "none",
    cursor: "pointer",
    "&:hover": {
      boxShadow:
        "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;",
    },
  },
}));

const init = {
  phoneNumber: "",
  password: "",
  name: "",
  email: "",
};

const reducer = (state, action) => {
  const { type, key, val } = action;
  switch (type) {
    case INPUT_CHANGE:
      return {
        ...state,
        [key]: val,
      };
  }
};

/**
 * Main Sign up page component
 */
const SignUp = ({}) => {
  const classes = useStyle();
  const [state, dispatch] = useReducer(reducer, init);

  function inputChange(id, e) {
    dispatch({ type: INPUT_CHANGE, key: id, val: e.target.value });
  }

  async function handlerSubmit() {
    const result = await userSignup(
      state.name,
      state.phoneNumber,
      state.password,
      state.email
    );
    if (result) window.location = "/";
  }

  return (
    <div className={classes.page}>
      <div className={classes.pageForm}>
        <h1>Sign Up</h1>
        <div className={classes.pageF}>
          <Input
            label="Phone Number"
            type="number"
            onChange={(val) => {
              inputChange("phoneNumber", val);
            }}
          />
          <Input
            label="Name"
            type="text"
            onChange={(val) => {
              inputChange("name", val);
            }}
          />
          <Input
            label="Email"
            type="text"
            onChange={(val) => {
              inputChange("email", val);
            }}
          />
          <Input
            label="Password"
            type="password"
            onChange={(val) => {
              inputChange("password", val);
            }}
          />
        </div>
        <button className={classes.btn} onClick={handlerSubmit}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
