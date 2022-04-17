import { ParentWrapper, ChildWrapper } from "../styles/layout-styles";
import Docs from "../components/docs";
import { useParams } from "react-router-dom";
import ClickSection from "../components/click";
import { useState, useEffect } from "react";
import Loading from "./loading";
import Fade from "react-reveal/Fade";
const CountLink = () => {
  const { click } = useParams();

  if (click !== "click") {
    window.open(`https://eurl.tech/${click}`, "_parent");
  }

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
              <ClickSection />
              <Docs />
            </ChildWrapper>
          </ParentWrapper>
        </Fade>
      )}
    </>
  );
};

export default CountLink;
