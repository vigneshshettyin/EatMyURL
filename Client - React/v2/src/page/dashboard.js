import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
const Navbar = ({ l1, l2, l3 }) => {
  //To handle interface
  const [title, settitle] = useState("Auth");
  //To tell whcuh path should be directed to
  const [taketo, settaketo] = useState("/login");
  //To change path and name of button with interface
  const Shift = () => {
    var ele = document.getElementById("navbar");
    console.log(ele.classList);
    if (ele.classList) {
      if (ele.classList.contains("active")) {
        settitle("Feed Url");
        settaketo("/");
      } else {
        settitle("Auth");
        settaketo("/login");
      }
    }
  };
  useEffect(() => {
    Shift();
  }, []);
  return (
    <div className="row navwrap">
      <div
        className={`text-center ${
          l2 ? "active" : ""
        } col-md-1 col-lg-1 col-3 navbtn`}
        id="navbar"
      >
        <Link to={taketo} className="link">
          {title}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
