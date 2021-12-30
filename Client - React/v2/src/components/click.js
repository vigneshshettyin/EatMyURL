import { LinkWrapper, toastObject } from "../styles/layout-styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import intToString from "../logic/num-conv";
import makeRequest from "../api/request";
import Fade from "react-reveal/Fade";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClickSection = () => {
  const navigate = useNavigate();
  const [url, setURL] = useState("");
  const [click, setClick] = useState(0);
  const [callState, setCallState] = useState(false);

  const shortenLinkClickCount = async () => {
    if (!validator.isURL(url)) {
      toast.error("Invalid URL!", toastObject);
      return;
    }
    if (!url.includes("eatmyurl.ml")) {
      toast.error("Invalid URL!", toastObject);
      return;
    }
    let checkForShortID = url.trim();
    makeRequest("POST", "api/click", { url: checkForShortID })
      .then((res) => {
        if (res.status === 200) {
          setCallState(true);
          setClick(res.data.click);
          toast.success("Data collected successfully!", toastObject);
        }
      })
      .catch((err) => {
        toast.error("Error collecting data!", toastObject);
      });
  };

  return (
    <LinkWrapper>
      <div className="row">
        <div className="col-md-12">
          <img
            src="https://res.cloudinary.com/vigneshshettyin/image/upload/v1631588908/oia0inntihtas3ymsvgi.png"
            alt="EatMyURL Logo"
          />
        </div>
      </div>
      <h2 className="desc" style={{ color: "100%" }}>
        URL Clicks
      </h2>
      <TextField
        id="outlined-basic"
        label="URL"
        variant="outlined"
        className="URLfield"
        value={url}
        onChange={(e) => setURL(e.target.value)}
        defaultValue={url}
      />
      {callState ? (
        <Fade bottom>
          <div className="container-fluid">
            <div class="row">
              <div class="col-7">
                <h2>Your link has been visited</h2>
              </div>
              <div class="col-5">
                <h4
                  style={{
                    backgroundColor: "#DBDBDB",
                    borderRadius: "20px",
                    marginTop: "20px",
                    padding: "20px",
                    textAlign: "center",
                    color: "#5A5858",
                    fontWeight: "bold",
                  }}
                >
                  {intToString(click)} times
                </h4>
              </div>
            </div>
          </div>
        </Fade>
      ) : null}
      {!callState ? (
        <Fade bottom>
          <div className="container-fluid">
            <div class="row">
              <div class="col-12 col-sm-6 buttons-material">
                <Button
                  onClick={() => {
                    shortenLinkClickCount();
                  }}
                  style={{ width: "100%" }}
                  variant="contained"
                  size="large"
                >
                  Who’s visited my link?
                </Button>
              </div>
              <div class="col-12 col-sm-6 buttons-material">
                <Button
                  onClick={() => {
                    setCallState(false);
                    setClick(0);
                    setURL("");
                  }}
                  style={{ width: "100%" }}
                  variant="contained"
                  size="large"
                >
                  Check More?
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      ) : (
        <Fade bottom>
          <div className="container-fluid">
            <div class="row">
              <div class="col-12 col-sm-6 buttons-material">
                <Button
                  onClick={() => {
                    navigate("/");
                  }}
                  style={{ width: "100%" }}
                  variant="contained"
                  size="large"
                >
                  Let's Eat URL?
                </Button>
              </div>
              <div class="col-12 col-sm-6 buttons-material">
                <Button
                  onClick={() => {
                    setCallState(false);
                    setClick(0);
                    setURL("");
                  }}
                  style={{ width: "100%" }}
                  variant="contained"
                  size="large"
                >
                  Check More?
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      )}

      <ToastContainer closeButton={false} />
    </LinkWrapper>
  );
};

export default ClickSection;
