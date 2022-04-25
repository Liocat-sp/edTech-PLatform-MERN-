import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  btn: {
    width: "fit-content",
    borderRadius: "10px 12px",
    padding: "12px 1rem",
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

const Button = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.btn} {...props}>
      {children}
    </div>
  );
};

export default Button;
