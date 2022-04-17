import axios from "axios";

const serverURL = "https://eurl.tech";

const makeRequest = (method, params, data) => {
  let url = `${serverURL}/${params}`;
  return axios({
    method,
    url,
    data,
  });
};

export default makeRequest;

export { serverURL };
