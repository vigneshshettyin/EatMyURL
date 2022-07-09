import { ParentWrapper, ChildWrapper } from "../styles/layout-styles";
import Docs from "../components/docs";
import LinkSection from "../components/link";
import { useState, useEffect } from "react";
import Loading from "./loading";
import Fade from "react-reveal/Fade";
const HomePage = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Fade>
          <ParentWrapper>
            <ChildWrapper>
              <LinkSection />
              <Docs />
            </ChildWrapper>
          </ParentWrapper>
        </Fade>
      )}
    </>
  );
};

export default HomePage;
