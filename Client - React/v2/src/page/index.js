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
            <h2>EatMyURL</h2>
            <TextField id="outlined-basic" label="URL" variant="outlined" />
            <TextField
              id="outlined-basic"
              label="Short ID"
              variant="outlined"
            />

            <Button variant="contained" size="large">
              Lemme eat it !!
            </Button>
            <Button variant="outlined" size="large">
              Who’s visited my link?
            </Button>
          </LinkWrapper>
          <DocsWrapper></DocsWrapper>
        </ChildWrapper>
      </ParentWrapper>
    </>
  );
};

export default HomePage;
