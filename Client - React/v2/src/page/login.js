import React, { useState } from "react";
import { Bounce, Zoom } from "react-reveal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Navbar from "./dashboard";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const Navigate = useNavigate();
  const SubmitHandler = async (e) => {
    e.preventDefault();
    //First check if password and cpassword are same
    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }

    alert("Login done");

    setemail("");
    setpassword("");

    //Login done,direct to home page
    Navigate("/");
  };
  return (
    <>
      <Navbar l2={true} />
      <div className="container signup1">
        <div className="signup row">
          {/*Entry part */}
          <h1 className="text-center header ">Login</h1>
          <br />
          <div className="col-md-6 col-lg-6 col-12 d-flex justify-content-center ">
            <Bounce>
              <form action="POST" className="inputsection mt-5">
                <div className="inputwrap mt-3">
                  <TextField
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
                <div className="inputwrap mt-3">
                  <TextField
                    label="Enter your password"
                    variant="outlined"
                    className="URLfield container-fluid"
                    onChange={(e) => setpassword(e.target.value)}
                    value={password}
                    type="password"
                    required
                  />
                </div>

                <div className="btnwrap mt-3">
                  <Button
                    style={{ width: "100%" }}
                    onClick={SubmitHandler}
                    variant="contained"
                    size="large"
                    className=""
                  >
                    Login
                  </Button>
                </div>
                <div className="btnwrap mt-3 mb-3">
                  <Link to={{ pathname: "/signup" }} className="text-center">
                    New user ? Sign up
                  </Link>
                </div>
              </form>
            </Bounce>
          </div>
          {/*Image Part */}
          <div className="col-md-6 col-lg-6 col-12 d-flex justify-content-center flexer mm">
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
      {/* <Footer/> */}
    </>
  );
};

export default Login;
