import { LinkWrapper } from "../styles/layout-styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import ShuffleOutlinedIcon from "@mui/icons-material/ShuffleOutlined";
import Tooltip from "@mui/material/Tooltip";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { useState } from "react";
const LinkSection = () => {
  const navigate = useNavigate();

  const [shortID, setShortID] = useState("");
  const [longURL, setLongURL] = useState(
    "https://github.com/vigneshshettyin/EatMyURL"
  );

  const notify = () => toast("Copied to clipboard 📋");

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
        <div class="col-6 col-md-4 border-1">
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
        <div class="col-4 buttons-material">
          <Tooltip placement="top" title="Copy To Clipboard">
            <IconButton
              onClick={notify}
              aria-label="ContentPasteOutlinedIcon"
              size="large"
            >
              <ContentPasteOutlinedIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div class="col-4 buttons-material">
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
        <div class="col-4 buttons-material">
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
        <div class="col-6 buttons-material">
          <Button variant="contained" size="large">
            Lemme eat it !!
          </Button>
        </div>
        <div class="col-6 buttons-material">
          <Button
            onClick={() => {
              navigate("/click");
            }}
            variant="contained"
            size="large"
          >
            Visitor Clicks ?
          </Button>
        </div>
      </div>
      <ToastContainer closeButton={false} />
    </LinkWrapper>
  );
};

export default LinkSection;
