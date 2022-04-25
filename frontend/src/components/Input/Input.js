import React from "react";
import { createUseStyles } from "react-jss";

const useStyle = createUseStyles((theme) => ({
  inputMain: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 12,
  },
  label: {
    width: "100%",
    marginBottom: "1rem",
  },
  input: {
    maxWidth: 450,
    width: "100%",
    padding: "8px 12px",
    borderRadius: 3,
    outline: "none",
    fontSize: "1.2rem",
    border: "1.2px solid rgba(0, 0, 0, 0.2)",
    "&:focus": {
      border: "1.2px solid #42C2FF",
      boxShadow: "rgba(66, 194, 255, 0.2) -4px 9px 20px -6px",
    },
  },
}));

const Input = ({
  id,
  label,
  type,
  onChange,
  value,
  placeHolder,
  onKeyPress,
  style,
}) => {
  const classes = useStyle();
  return (
    <div className={classes.inputMain} style={{ ...style }}>
      <label className={classes.label} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className={classes.input}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeHolder}
        onKeyPress={onKeyPress}
      ></input>
    </div>
  );
};

export default Input;
