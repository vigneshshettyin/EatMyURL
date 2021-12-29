import styled from "styled-components";

const LoadingParentWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingChildWrapper = styled.div`
  width: 50vw;
  height: 50vh;
  @media (max-width: 768px) {
    width: 100vw;
    height: 50vh;
  }
`;

export { LoadingParentWrapper, LoadingChildWrapper };
