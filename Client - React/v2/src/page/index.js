import {
  ParentWrapper,
  ChildWrapper,
  LinkWrapper,
  DocsWrapper,
} from "../styles/layout-styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const HomePage = () => {
  return (
    <>
      <ParentWrapper>
        <ChildWrapper>
          <LinkWrapper>
            <h2 className="logo">EatMyURL</h2>
            <TextField
              id="outlined-basic"
              label="URL"
              variant="outlined"
              className="URLfield"
            />
            <TextField
              id="outlined-basic"
              label="Short ID"
              variant="outlined"
            />
            <Button variant="contained" size="large">
              Lemme eat it !!
            </Button>
            <Button variant="contained" size="large">
              Who’s visited my link?
            </Button>
          </LinkWrapper>
          <DocsWrapper>
            <h2>Docs Section</h2>
          </DocsWrapper>
        </ChildWrapper>
      </ParentWrapper>
    </>
  );
};

export default HomePage;
