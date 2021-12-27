import styled from "styled-components";

const ParentWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChildWrapper = styled.div`
  width: 90vw;
  height: 90vh;
  background-color: white;
  border: 2px solid black;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const LinkWrapper = styled.div`
  @media (max-width: 768px) {
    width: 90vw;
    height: 90vh;
  }
  width: 40vw;
  height: 70vh;
  border: 2px solid black;
  border-radius: 20px;
`;

const DocsWrapper = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
  width: 30vw;
  height: 70vh;
  border: 2px solid black;
  border-radius: 20px;
`;

export { ParentWrapper, ChildWrapper, LinkWrapper, DocsWrapper };
