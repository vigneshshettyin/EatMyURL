import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
const Navbar = ({l1,l2,l3}) => {
  return (
    <div className="row navwrap">
        <div className={"hello"}></div>
      <div className={`text-center ${l1?"active":""} col-md-1 col-lg-1 col-3 navbtn `}>
        <Link to={{ pathname: "/signup" }} className="link">
          Signup
        </Link>
      </div>
      <div className={`text-center ${l2?"active":""} col-md-1 col-lg-1 col-3 navbtn`}>
        <Link to="/login" className="link">
          Login
        </Link>
      </div>
      <div className={`text-center ${l3?"active":""} col-md-1 col-lg-1 col-4 navbtn`}>
        <Link to="/" className="link">
          Feed URL
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
