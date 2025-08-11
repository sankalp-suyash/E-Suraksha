// import React from 'react'
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function ProtectedRoutes(props) {
  const { component: Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let userLogin = sessionStorage.getItem("user_logged_in");
    console.log("userLogin", userLogin);
    if (!userLogin) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Component />
    </div>
  );
}
ProtectedRoutes.propTypes = {
  component: PropTypes.elementType.isRequired,
};
