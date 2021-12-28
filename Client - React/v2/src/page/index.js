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
            <div className="linkform">
              <div className="input-fields">
                <TextField
                  id="outlined-basic"
                  label="URL"
                  variant="outlined"
                  className="URLfield"
                  style={{ width: "20vw" }}
                />
                <TextField
                  id="outlined-basic"
                  label="Short ID"
                  variant="outlined"
                />
              </div>

              <div className="button-area">
                <Button
                  variant="contained"
                  size="large"
                  style={{
                    "background-color": "black",
                    "border-radius": "10px",
                    padding: "20px 50px 20px 50px",
                    "font-size": "1.25rem",
                  }}
                >
                  Lemme eat it !!
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  style={{
                    "background-color": "black",
                    "border-radius": "10px",
                    padding: "20px 50px 20px 50px",
                    "font-size": "1.25rem",
                  }}
                >
                  Who’s visited my link?
                </Button>
              </div>
            </div>
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
