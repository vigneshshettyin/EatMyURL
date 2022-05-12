import React, { useState } from "react";
import { Bounce, Zoom } from "react-reveal";

const Signup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const SubmitHandler = (e) => {
    e.preventDefault();
    //First check if password and cpassword are same
    if (!name || !email || !password || !cpassword) {
      alert("Please fill all the fields");
      return;
    }
    if (password !== cpassword) {
      alert("Password should match confirm password");
      return;
    }
    alert("Signup done");
    //Call API to signup

    setname("")
    setemail("")
    setpassword("")
    setcpassword("")
  };
  return (
    <>
      <div className="container">
        <div className="signup row">
          {/*Entry part */}
          <h6 className="text-center header ">Sign-Up</h6>
          <br />
          <div className="col-md-6 col-lg-6 col-12 d-flex justify-content-center ">
            <Bounce>
              <form action="POST" className="inputsection">
                <div className="inputwrap">
                  <label htmlFor="name">Name</label>
                  <br />
                  <input
                    type="text"
                    name="name"
                    required
                    onChange={(e) => setname(e.target.value)}
                    placeholder="Enter your name"
                    value={name}
                  />
                </div>
                <div className="inputwrap">
                  <label htmlFor="email">Email</label>
                  <br />
                  <input
                    type="emailt"
                    name="email"
                    required
                    onChange={(e) => setemail(e.target.value)}
                    placeholder="Enter your email"
                    value={email}
                  />
                </div>
                <div className="inputwrap">
                  <label htmlFor="password">Password</label>
                  <br />
                  <input
                    type="password"
                    name="password"
                    required
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder="Enter your password"
                    value={password}
                  />
                </div>
                <div className="inputwrap">
                  <label htmlFor="cpassword">CPassword</label>
                  <br />
                  <input
                    type="password"
                    name="cpassword"
                    required
                    onChange={(e) => setcpassword(e.target.value)}
                    placeholder="Confirm your password"
                    value={cpassword}
                  />
                </div>
                <div className="btnwrap" onClick={SubmitHandler}>
                  <button className="text-center btn">Sign-up</button>
                </div>
              </form>
            </Bounce>
          </div>
          {/*Image Part */}
          <div className="col-md-6 col-lg-6 col-12 ">
            <Zoom>
              <img
                src="https://res.cloudinary.com/vigneshshettyin/image/upload/v1631588908/oia0inntihtas3ymsvgi.png"
                alt=""
                className="img-fluid"
              />
            </Zoom>
            <h6 className="text-center">
              <strong>Signup and get your URL eaten by us</strong>
            </h6>
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default Signup;
