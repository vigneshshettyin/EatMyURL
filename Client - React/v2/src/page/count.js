import { ParentWrapper, ChildWrapper } from "../styles/layout-styles";
import Docs from "../components/docs";
import ClickSection from "../components/click";
const CountLink = () => {
  return (
    <ParentWrapper>
      <ChildWrapper>
        <ClickSection />
        <Docs />
      </ChildWrapper>
    </ParentWrapper>
  );
};

export default CountLink;
