import Lottie from "react-lottie";
import animationData from "../animation/loading.json";
import {
  LoadingParentWrapper,
  LoadingChildWrapper,
} from "../styles/loading-style";
const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <LoadingParentWrapper>
        <LoadingChildWrapper>
          <Lottie isClickToPauseDisabled={true} options={defaultOptions} />
        </LoadingChildWrapper>
      </LoadingParentWrapper>
    </>
  );
};

export default Loading;
