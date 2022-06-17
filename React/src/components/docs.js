import { serverURL } from "../api/request";
import { DocsWrapper } from "../styles/layout-styles";

const Docs = () => {
  return (
    <DocsWrapper>
      <iframe title="EatMyURL API Docs" src={`${serverURL}/api-docs/`}></iframe>
    </DocsWrapper>
  );
};

export default Docs;
