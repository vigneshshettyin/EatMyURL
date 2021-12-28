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
  border: 4px solid black;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const LinkWrapper = styled.div`
  @media (max-width: 768px) {
    width: 90vw;
    height: 90vh;
    padding: 0 10px 0px 10px;
  }
  width: 45vw;
  height: 70vh;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 20px;
`;

const DocsWrapper = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
  width: 30vw;
  height: 70vh;
  border: 4px solid black;
  border-radius: 20px;
  background-color: #ffdfa1;
  display: flex;
  justify-content: center;
`;

export { ParentWrapper, ChildWrapper, LinkWrapper, DocsWrapper };
