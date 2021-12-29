import { LinkWrapper } from "../styles/layout-styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const ClickSection = () => {
  return (
    <LinkWrapper>
      <h2 className="logo">EatMyURL 2</h2>
      <TextField
        id="outlined-basic"
        label="URL"
        variant="outlined"
        className="URLfield"
      />
      <TextField id="outlined-basic" label="Short ID" variant="outlined" />
      <Button variant="contained" size="large">
        Lemme eat it !!
      </Button>
      <Button variant="contained" size="large">
        Who’s visited my link?
      </Button>
    </LinkWrapper>
  );
};

export default ClickSection;
