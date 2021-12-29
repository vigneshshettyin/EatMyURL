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
  h1 {
    font-size: 75px;
    font-weight: 600;
  }
  @media (max-width: 768px) {
    width: 90vw;
    height: 90vh;
    padding: 0 10px 0px 10px;
    width: 90vw;
  }
  width: 45vw;
  height: 70vh;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 20px;
  Button {
    margin-top: 20px;
    font-style: normal;
    text-transform: capitalize;
    border-radius: 20px;
    background-color: #2d2c2c;
    color: white;
    padding: 20px 30px 20px 30px;
    :hover {
      background-color: #0f0f0f;
    }
  }
`;

const DocsWrapper = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  iframe {
    width: 38vw;
    height: 66vh;
    border-radius: 10px;
  }
  width: 40vw;
  height: 70vh;
  border: 4px solid black;
  border-radius: 20px;
  background-color: #ffdfa1;
`;

export { ParentWrapper, ChildWrapper, LinkWrapper, DocsWrapper };
