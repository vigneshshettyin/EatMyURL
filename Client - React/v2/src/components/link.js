import { LinkWrapper } from "../styles/layout-styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const LinkSection = () => {
  return (
    <LinkWrapper className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <h1 className="logo">EatMyURL</h1>
        </div>
      </div>

      <div class="row">
        <div class="col-md-8">
          <TextField
            className="container-fluid mt-2 mb-2"
            id="outlined-basic"
            label="Long URL"
            variant="outlined"
          />
        </div>
        <div class="col-6 col-md-4 border-1">
          <TextField
            className="container-fluid mt-2 mb-2"
            id="outlined-basic"
            label="Short ID"
            variant="outlined"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-6 buttons-material">
          <Button variant="contained" size="large">
            Lemme eat it !!
          </Button>
        </div>
        <div class="col-6 buttons-material">
          <Button variant="contained" size="large">
            Visitor Clicks ?
          </Button>
        </div>
      </div>
    </LinkWrapper>
  );
};

export default LinkSection;
