import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { getCart } from "../../Actions/cartAction";
import Button from "../../components/Button";

const useStyles = createUseStyles({
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  total: {
    display: "flex",
    borderTop: "1px solid #d3d3d3",
    padding: 12,
    paddingTop: 12,
    marginTop: 12,
    justifyContent: "space-between",
  },
  card: {
    margin: 12,
    display: "flex",
    width: "100%",
    height: 200,
    borderRadius: 10,
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
    transition: "200ms",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "rgba(0, 0, 0, 0.20) 0px 25px 50px -12px",
    },
  },
  cardAction: {
    width: "20%",
    borderRadius: "inherit",
    overflow: "hidden",
    marginRight: 12,
  },
  cardDetails: {
    padding: "12px 24px",
    width: "80%",
  },
  page: {
    padding: "2rem",
  },
  image: {
    objectFit: "cover",
  },
});

/**
 * Main Cart page
 */
const Cart = () => {
  const classes = useStyles();
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    async function init() {
      const data = await getCart();
      setCart(data);
      let total = 0;
      data.forEach((item) => (total += item.price));
      setAmount(total);
    }
    init();
  }, []);

  return (
    <div className={classes.page}>
      <h1>Cart Items</h1>
      <div className={classes.flex}>
        {cart?.map((item, index) => (
          <div key={index} className={classes.card}>
            <div className={classes.cardAction}>
              <img
                src={item.image}
                alt={item.title}
                className={classes.image}
              />
            </div>
            <div className={classes.cardDetails}>
              <h2>{item.title}</h2>
              <h3>Rs. {item.price}</h3>
              <p>{item.description.substring(0, 200)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={`${classes.total}`}>
        <h2>Total</h2>
        <div>
          <h2>Rs. {amount}</h2>
          <Button>Pay Now</Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;