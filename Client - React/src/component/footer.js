import React, { useContext } from "react";
import TextContext from "../context/textContext";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

const Footer = () => {
  const a = useContext(TextContext);

  return (
    <>
      <footer className="footer fixed-bottom">
        <div className="col-lg-12">
          <p className="text-center">
            <FacebookShareButton className="m-1" url={window.location.href}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <LinkedinShareButton className="m-1" url={window.location.href}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <WhatsappShareButton className="m-1" url={window.location.href}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <EmailShareButton className="m-1" url={window.location.href}>
              <EmailIcon size={32} round />
            </EmailShareButton>
          </p>
        </div>
        <div className="col-md-12">
          <p className="text-center text-capitalize">
            MADE IN ❤️ WITH
            <span
              className="footer-text"
              onClick={() => {
                a.timer();
              }}
            >
              {a.state.text}
            </span>
          </p>
        </div>
      </footer>
    </>
  );
};
export default Footer;
