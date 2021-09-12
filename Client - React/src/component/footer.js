import React, { useContext } from "react";
import TextContext from "../context/textContext";

const Footer = () => {
  const a = useContext(TextContext);

  return (
    <>
      <footer className="footer fixed-bottom">
        <div className="col-md-12">
          <p className="text-center text-capitalize">
            MADE IN ❤️ WITH <span> </span>
            <a
              href="https://reactjs.org/"
              target="_blank"
              onClick={() => {
                a.timer();
              }}
              className="text-decoration-none text-danger bold"
            >
              {a.state.text}
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};
export default Footer;
