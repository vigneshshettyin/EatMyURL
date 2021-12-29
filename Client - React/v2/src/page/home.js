import { ParentWrapper, ChildWrapper } from "../styles/layout-styles";
import Docs from "../components/docs";
import LinkSection from "../components/link";
const HomePage = () => {
  return (
    <ParentWrapper>
      <ChildWrapper>
        <LinkSection />
        <Docs />
      </ChildWrapper>
    </ParentWrapper>
  );
};

export default HomePage;
