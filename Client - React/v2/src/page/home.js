import { ParentWrapper, ChildWrapper } from "../styles/layout-styles";
import Docs from "../components/docs";
import LinkSection from "../components/link";
import { useState, useEffect } from "react";
import Loading from "./loading";
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
        <ParentWrapper>
          <ChildWrapper>
            <LinkSection />
            <Docs />
          </ChildWrapper>
        </ParentWrapper>
      )}
    </>
  );
};

export default HomePage;
