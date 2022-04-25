import React, { useReducer } from "react";
import Input from "../../components/Input";

import { createUseStyles } from "react-jss";
import { INPUT_CHANGE } from "../../constants";
import { userLogin } from "../../Actions/userAction";

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
 * Main Login page component
 */
const Login = ({}) => {
  const classes = useStyle();
  const [state, dispatch] = useReducer(reducer, init);

  function inputChange(id, e) {
    dispatch({ type: INPUT_CHANGE, key: id, val: e.target.value });
  }

  async function handelLogin() {
    const result = await userLogin(state.phoneNumber, state.password);
    if (result) window.location = "/";
  }

  return (
    <div className={classes.page}>
      <div className={classes.pageForm}>
        <h1>Sign in</h1>
        <div className={classes.pageF}>
          <Input
            label="Phone Number"
            type="number"
            onChange={(val) => {
              inputChange("phoneNumber", val);
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
        <button className={classes.btn} onClick={handelLogin}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
