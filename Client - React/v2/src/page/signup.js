import React, { useState } from "react";
import { Bounce, Zoom } from "react-reveal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./dashboard";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { toastObject } from "../styles/layout-styles";

const Signup = () => {
  const Navigate = useNavigate();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const SubmitHandler = async (e) => {
    e.preventDefault();
    //First check if password and cpassword are same
    if (!name || !email || !password || !cpassword) {
      alert("Please fill all the fields");
      return;
    }
    if (password !== cpassword) {
      toast.error("Password should match with confirm password");
      return;
    }

    try {
      //Call API for signup
      const { data } = await axios.post("/api/user/signup", {
        name,
        email,
        password,
      });
      //Notify user and ask him to login
      toast.success("Registartion Done!", toastObject);
      localStorage.setItem("User", JSON.stringify(data));
      setTimeout(() => {
        Navigate("/login");
      }, 3000);
    } catch (e) {
      //Notifu user about errors if any
      toast.error(
        "Unable to Sign up,Try using strong password, make sure you hadn't registered before"
      );
      return;
    }
    setname("");
    setemail("");
    setpassword("");
    setcpassword("");
  };
  return (
    <>
      <Navbar l1={true} />
      <div className="container signup1">
        <div className="signup row">
          {/*Entry part */}
          <h1 className="text-center header ">Sign-Up</h1>
          <br />
          <div className="col-md-6 col-lg-6 col-12 d-flex justify-content-center ">
            <Bounce>
              <form action="POST" className="inputsection">
                <div className="inputwrap">
                  <TextField
                    id="outlined-basic"
                    label="Enter your name"
                    variant="outlined"
                    className="URLfield container-fluid"
                    value={name}
                    placeholder="Enter your name"
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>
                <div className="inputwrap">
                  <TextField
                    id="outlined-basic"
                    label="Enter your email"
                    variant="outlined"
                    className="URLfield container-fluid"
                    onChange={(e) => setemail(e.target.value)}
                    placeholder="Enter your email"
                    value={email}
                    type="email"
                    required
                  />
                </div>
                <div className="inputwrap">
                  <TextField
                    id="outlined-basic"
                    label="Enter your password"
                    variant="outlined"
                    className="URLfield container-fluid"
                    onChange={(e) => setpassword(e.target.value)}
                    value={password}
                    type="password"
                    required
                  />
                </div>
                <div className="inputwrap">
                  <TextField
                    id="outlined-basic"
                    label="Reenter your password"
                    variant="outlined"
                    className="URLfield container-fluid"
                    onChange={(e) => setcpassword(e.target.value)}
                    value={cpassword}
                    type="password"
                    required
                  />
                </div>
                <div className="btnwrap">
                  <Button
                    style={{ width: "100%" }}
                    onClick={SubmitHandler}
                    variant="contained"
                    size="large"
                    className=""
                  >
                    Signup
                  </Button>
                </div>
                <div className="btnwrap mt-3 mb-3">
                  <Link to={{ pathname: "/login" }} className="text-center">
                    registered ? Log in
                  </Link>
                </div>
              </form>
            </Bounce>
          </div>
          {/*Image Part */}
          <div className="col-md-6 col-lg-6 col-12 d-flex justify-content-center flexer">
            <Zoom>
              <img
                src="https://res.cloudinary.com/vigneshshettyin/image/upload/v1631588908/oia0inntihtas3ymsvgi.png"
                alt=""
                className="img-fluid logo"
              />
            </Zoom>
          </div>
        </div>
      </div>
      <ToastContainer closeButton={false} />
      {/* <Footer/> */}
    </>
  );
};

export default Signup;
