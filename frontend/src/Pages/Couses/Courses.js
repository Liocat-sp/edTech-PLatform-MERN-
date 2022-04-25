import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { createUseStyles } from "react-jss";
import { useParams } from "react-router-dom";
import { addToCart } from "../../Actions/cartAction";
import { getSingleProduct } from "../../Actions/productAction";
import Button from "../../components/Button";

const useStyles = createUseStyles((theme) => ({
  courseLeft: {
    minWidth: "40vw",
    minHeight: "92vh",
    overflow: "hidden",
  },
  flex: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  page: {
    display: "flex",
  },
  pageRight: {
    padding: "1rem 2rem",
  },
  title: {
    fontSize: "3rem",
  },
  desc: {
    marginBottom: "2.5rem",
  },
  rating: {
    margin: "6px",
  },
}));

const Courses = (props) => {
  const { productId } = useParams();
  const classes = useStyles();
  const [product, setproduct] = useState({});

  useEffect(() => {
    async function init() {
      const data = await getSingleProduct(productId);
      if (data) setproduct(data);
    }
    init();
  }, [productId]);

  async function onAddToCart() {
    await addToCart(product.id);
  }

  return (
    <div className={classes.page}>
      <img
        className={classes.courseLeft}
        src={product.image}
        alt="product"
        style={{ objectFit: "cover" }}
      />
      <div className={classes.pageRight}>
        <h3>Course Details: </h3>
        <h1 className={classes.title}>{product.title}</h1>
        <div className={classes.flex}>
          {Array(product.rating)
            .fill()
            .map((item, key) => (
              <FaStar
                key={key}
                size="1.2rem"
                color="#ffc12f"
                className={classes.rating}
              />
            ))}
        </div>
        <h2>Rs. {product.price}</h2>
        <p className={classes.desc}>{product.description}</p>
        <div style={{ marginTop: "auto" }}>
          <Button onClick={onAddToCart}>Add To Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default Courses;