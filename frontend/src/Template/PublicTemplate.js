import React from "react";
import { createUseStyles } from "react-jss";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const useStyles = createUseStyles({
  appBar: {
    padding: "0px 34px ",
    width: "100%",
    height: "8vh",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  link: {
    textDecoration: "none",
    color: "#000",
  },
});

const PublicTemplate = ({ children }) => {
  const classes = useStyles();

  return (
    <div>
      <header className={`${classes.appBar} ${classes.flex}`}>
        <nav>
          <Link to="/" className={classes.link}>
            <img
              src="https://www.pw.live/version12/assets/img/Group18923.png"
              alt="pw"
              width="70%"
              height="70%"
            />
          </Link>
        </nav>
        <div></div>
      </header>
      <div>{children}</div>
    </div>
  );
};

export default PublicTemplate;
