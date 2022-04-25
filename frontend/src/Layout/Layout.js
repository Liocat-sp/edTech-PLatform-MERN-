import React from "react";
import { useEffect } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Cart from "../Pages/Cart";
import Couses from "../Pages/Couses";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Poll from "../Pages/Poll/Poll";
import Signup from "../Pages/signup";
import Template from "../Template";
import PublicTemplate from "../Template/PublicTemplate";

const PublicRoutes = ({}) => {
  return (
    <Template>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product/:productId" element={<Couses />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/poll" element={<Poll />} />
      </Routes>
    </Template>
  );
};

const PrivateRoutes = ({}) => {
  return (
    <PublicTemplate>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </PublicTemplate>
  );
};

const Layout = () => {
  useEffect(() => {
    if (localStorage.getItem("auth-token")) <Navigate to="/" />;
  }, [localStorage.getItem("auth-token")]);

  return (
    <div>
      {localStorage.getItem("auth-token") ? (
        <PublicRoutes />
      ) : (
        <PrivateRoutes />
      )}
    </div>
  );
};

export default Layout;
