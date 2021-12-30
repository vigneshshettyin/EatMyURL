import { LinkWrapper, toastObject } from "../styles/layout-styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import ShuffleOutlinedIcon from "@mui/icons-material/ShuffleOutlined";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import Tooltip from "@mui/material/Tooltip";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { useState } from "react";
import QRCode from "qrcode.react";
import makeRequest from "../api/request";
const LinkSection = () => {
  const navigate = useNavigate();

  const [shortID, setShortID] = useState("");
  const [longURL, setLongURL] = useState(
    "https://github.com/vigneshshettyin/EatMyURL"
  );

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
    let checkForShortID = shortID.trim();
    if (checkForShortID.length === 0) {
      makeRequest("POST", "api/new", { url: longURL })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            toast.success("Shortened URL successfully created!", toastObject);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error creating shortened URL!", toastObject);
        });
    }
  };
  return (
    <LinkWrapper className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <img
            src="https://res.cloudinary.com/vigneshshettyin/image/upload/v1631588908/oia0inntihtas3ymsvgi.png"
            alt="EatMyURL Logo"
          />
        </div>
      </div>

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

      <div class="row">
        <div class="col-3 buttons-material">
          <Tooltip placement="top" title="Copy To Clipboard">
            <IconButton
              onClick={() => {
                toast.success("🦄 Wow so easy!", toastObject);
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
          <Tooltip placement="top" title="Generate Short ID">
            <IconButton
              onClick={() => {
                setShortID(nanoid(7));
              }}
              aria-label="ShuffleOutlinedIcon"
              size="large"
            >
              <ShuffleOutlinedIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div class="col-3 buttons-material">
          <Tooltip placement="top" title="Clear Text">
            <IconButton
              onClick={() => {
                setLongURL("");
                setShortID("");
              }}
              aria-label="HighlightOffOutlinedIcon"
              size="large"
            >
              <HighlightOffOutlinedIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-sm-6 buttons-material">
          <Button
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
            User Clicks ?
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
    </LinkWrapper>
  );
};

export default LinkSection;
