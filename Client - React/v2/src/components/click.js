import { LinkWrapper } from "../styles/layout-styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

const ClickSection = () => {
  const [longURL, setLongURL] = useState(
    "https://github.com/vigneshshettyin/EatMyURL"
  );
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
        value={longURL}
        onChange={(e) => setLongURL(e.target.value)}
        defaultValue={longURL}
      />
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
            12 times
          </h4>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-sm-6 buttons-material">
          <Button style={{ width: "100%" }} variant="contained" size="large">
            Shorten a URL
          </Button>
        </div>
        <div class="col-12 col-sm-6 buttons-material">
          <Button style={{ width: "100%" }} variant="contained" size="large">
            Check another
          </Button>
        </div>
      </div>
    </LinkWrapper>
  );
};

export default ClickSection;
