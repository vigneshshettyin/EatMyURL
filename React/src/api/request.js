import axios from "axios";

const domain = "eurl.vshetty.dev";
const serverURL = `https://${domain}`;

const makeRequest = (method, params, data) => {
  let url = `${serverURL}/${params}`;
  return axios({
    method,
    url,
    data,
  });
};

export default makeRequest;

export { serverURL, domain };
