import {
  ParentWrapper,
  ChildWrapper,
  LinkWrapper,
  DocsWrapper,
} from "../styles/layout-styles";

const HomePage = () => {
  return (
    <>
      <ParentWrapper>
        <ChildWrapper>
          <LinkWrapper>
            <h2>EatMyURL</h2>
          </LinkWrapper>
          <DocsWrapper></DocsWrapper>
        </ChildWrapper>
      </ParentWrapper>
    </>
  );
};

export default HomePage;
