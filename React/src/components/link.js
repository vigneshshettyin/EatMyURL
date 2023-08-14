import { LinkWrapper, toastObject } from "../styles/layout-styles";
import validator from "validator";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Fade from "react-reveal/Fade";
import IconButton from "@mui/material/IconButton";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import Tooltip from "@mui/material/Tooltip";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { useState } from "react";
import QRCode from "qrcode.react";
import makeRequest from "../api/request";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect } from "react";
const LinkSection = () => {
  const navigate = useNavigate();

  const [shortID, setShortID] = useState("");
  const [longURL, setLongURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [callState, setCallState] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("shortLinks")) {
      localStorage.setItem("shortLinks", JSON.stringify([]));
      // console.log("shortLinks created");
    }
  }, []);

  const downloadQRCode = () => {
    // Generate download with use canvas and stream
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${nanoid(5)}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const shortenLink = async () => {
    if (!validator.isURL(longURL)) {
      toast.error("Invalid URL!", toastObject);
      return;
    }
    let checkForShortID = shortID.trim();
    if (checkForShortID.length === 0) {
      setLoading(true);
      makeRequest("POST", "api/new", { url: longURL })
        .then((res) => {
          if (res.status === 200) {
            setCallState(true);
            setShortURL(res.data.shortID);
            localStorage.setItem(
              "shortLinks",
              JSON.stringify([
                ...JSON.parse(localStorage.getItem("shortLinks")),
                res.data,
              ])
            );
            toast.success("Shortened URL successfully created!", toastObject);
            setLoading(false);
          }
        })
        .catch((err) => {
          // console.log(err);
          toast.error("Error creating shortened URL!", toastObject);
          setLoading(false);
        });
    } else if (checkForShortID.length > 2) {
      setLoading(true);
      makeRequest("POST", "api/new-custom", { url: longURL, shortID: shortID })
        .then((res) => {
          if (res.status === 200) {
            setCallState(true);
            setShortURL(res.data.shortID);
            localStorage.setItem(
              "shortLinks",
              JSON.stringify([
                ...JSON.parse(localStorage.getItem("shortLinks")),
                res.data,
              ])
            );
            toast.success("Shortened URL successfully created!", toastObject);
            setLoading(false);
          }
        })
        .catch((err) => {
          // console.log(err);
          toast.error("Error creating shortened URL!", toastObject);
        });
      return;
    } else {
      toast.error("Short ID must be 3 characters or more!", toastObject);
    }
  };
  return (
    <LinkWrapper className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <img
            draggable="false"
            src="https://res.cloudinary.com/vigneshshettyin/image/upload/v1631588908/oia0inntihtas3ymsvgi.png"
            alt="EatMyURL Logo"
          />
        </div>
      </div>
      <h2 className="desc" style={{ color: "100%" }}>
        Shorten URL
      </h2>

      {!callState ? (
        <div className="container-fluid">
          <div class="row">
            <div class="col-md-8">
              <TextField
                className="container-fluid mt-2 mb-2"
                id="outlined-basic"
                value={longURL}
                onChange={(e) => setLongURL(e.target.value)}
                defaultValue={longURL}
                label="Long URL"
                variant="outlined"
              />
            </div>
            <div class="col-12 col-md-4 border-1">
              <TextField
                onChange={(e) => setShortID(e.target.value)}
                value={shortID}
                defaultValue={shortID}
                className="container-fluid mt-2 mb-2"
                id="outlined-basic"
                label="Short ID"
                variant="outlined"
              />
            </div>
          </div>
        </div>
      ) : (
        <Fade bottom>
          <div className="container-fluid">
            <div class="row">
              <div class="col-md-12">
                <TextField
                  className="container-fluid mt-2 mb-2"
                  id="outlined-basic"
                  aria-readonly="true"
                  value={shortURL}
                  label="Short URL"
                  variant="outlined"
                />
              </div>
            </div>
          </div>
        </Fade>
      )}

      {callState ? (
        <Fade bottom>
          <div className="container-fluid">
            <div class="row">
              <div class="col-3 buttons-material">
                <Tooltip placement="top" title="Copy To Clipboard">
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(shortURL);
                      toast.success(
                        "Short URL Copied to Clipboard 📋",
                        toastObject
                      );
                    }}
                    aria-label="ContentPasteOutlinedIcon"
                    size="large"
                  >
                    <ContentPasteOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </div>

              <div class="col-3 buttons-material">
                <Tooltip placement="top" title="Generate QR Code">
                  <IconButton
                    onClick={() => {
                      downloadQRCode();
                    }}
                    aria-label="QrCode2Icon"
                    size="large"
                  >
                    <QrCode2Icon />
                  </IconButton>
                </Tooltip>
              </div>

              <div class="col-3 buttons-material">
                <Tooltip placement="top" title="Open In New Tab">
                  <IconButton
                    onClick={() => {
                      window.open(shortURL, "_blank");
                    }}
                    aria-label="OpenInNewIcon"
                    size="large"
                  >
                    <OpenInNewIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <div class="col-3 buttons-material">
                <Tooltip placement="top" title="Clear Text">
                  <IconButton
                    onClick={() => {
                      setLongURL("");
                      setShortID("");
                      setShortURL("");
                      setCallState(false);
                    }}
                    aria-label="HighlightOffOutlinedIcon"
                    size="large"
                  >
                    <HighlightOffOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
        </Fade>
      ) : null}

      {loading ? (
        <div className="row">
          <div className="col-md-12 p-3 buttons-material">
            <Stack sx={{ width: "97%", color: "grey.500" }} spacing={2}>
              <LinearProgress color="inherit" />
            </Stack>
          </div>
        </div>
      ) : null}

      <div class="row">
        <div class="col-12 col-sm-6 buttons-material">
          <Button
            disabled={callState}
            style={{ width: "100%" }}
            onClick={shortenLink}
            variant="contained"
            size="large"
          >
            Lemme eat it !!
          </Button>
        </div>
        <div class="col-12 col-sm-6 buttons-material">
          <Button
            style={{ width: "100%" }}
            onClick={() => {
              navigate("/click");
            }}
            variant="contained"
            size="large"
          >
            Who’s visited my link?
          </Button>
        </div>
      </div>
      <ToastContainer closeButton={false} />
      <QRCode
        style={{ display: "none" }}
        id="qr-gen"
        value={longURL}
        size={290}
        level={"H"}
        includeMargin={true}
      />
      {/* {JSON.stringify(localStorage.getItem("shortLinks"))} */}
    </LinkWrapper>
  );
};

export default LinkSection;
