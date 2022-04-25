import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProducts } from "../../Actions/productAction";

const useStyles = createUseStyles({
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  icon: {
    marginRight: "16px",
  },
  card: {
    marginRight: "1rem",
    width: 400,
    borderRadius: 10,
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
    transition: "200ms",
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
    },
  },
  cardAction: {
    borderRadius: "inherit",
    overflow: "hidden",
  },
  cardDetails: {
    padding: "1rem",
  },
  page: {
    padding: "2rem",
  },
  link: {
    textDecoration: "none",
    color: "#000",
  },
});

const Home = ({user}) => {
  const classes = useStyles();
  const [products, setproducts] = useState([]);

  useEffect(() => {
    async function init() {
      const data = await getProducts();
      setproducts(data);
    }
    init();
  }, []);

  return (
    <div className={classes.page}>
      <h2>Welcome, {user.name} !!</h2>
      <h1>Course</h1>
      <div className={classes.flex}>
        {products.map((item, index) => (
          <Link to={`/product/${item.id}`} className={classes.link} key={index}>
            <div className={classes.card}>
              <div className={classes.cardAction}>
                <img
                  src={item.image}
                  width="100%"
                  height="100%"
                  alt={item.title}
                />
              </div>
              <div className={classes.cardDetails}>
                <h4>{item.title}</h4>
                <p>{item.description.substring(0, 250)}...</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ userReducer }) => ({
  user: userReducer.user,
});

export default connect(mapStateToProps)(Home);

const data = [
  {
    title: "12 Class Chemistry",
    image:
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    description:
      "A syllabus is basically a tool to plan a course within a stipulated time. These include chapters like haloalkanes and haloarenes, amines, chemical kinetics, d and f block elements, aldehydes, ketones and Carboxylic acid, etc. NCERT solutions class 12 chemistry gives all-round information of practical chemistry to readers.",
    price: 5000,
    rating: 4,
    id: "6262a8107c8ffeb087652ab2",
  },
  {
    title: "12 Class Maths",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    description:
      "A syllabus is basically a tool to plan a course within a stipulated time. It not only gives an idea about the goal and objective of the course but also helps to prepare oneself beforehand and develop concepts and confidence thereby. You might be looking for a platform where you can get the Syllabus for CBSE Class 12 Maths 2021-22. The Central Board of Secondary Education (CBSE) has announced a subject-by-subject new CBSE Syllabus 2021-2022 for 9th, 10th, 11th, and 12th grades, which will be used for the CBSE Academic Session 2021-2022.",
    price: 2000,
    rating: 5,
    id: "6262aa011a012ed21c2d5987",
  },
];
