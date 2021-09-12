import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactCardFlip from "react-card-flip";
import swal from "sweetalert";
import axios from "axios";
import Footer from "./component/footer";
import TextState from "./context/textState";
import "./index.css";
ReactDOM.render(
  <React.StrictMode>
    <TextState>
      <App />
      <Footer />
    </TextState>
  </React.StrictMode>,
  document.getElementById("root")
);

export function App() {
  const [flipState, setFlipState] = useState(false);

  const [longState, setLongState] = useState("Long URL");

  const [url, setUrl] = useState("");

  const [loader, setLoader] = useState(false);

  const [loader2, setLoader2] = useState(false);

  function handleFlipState(e) {
    e.preventDefault();
    setFlipState(!flipState);
    setUrl("");
    setLongState("Long URL");
  }

  function handleUrl(e) {
    e.preventDefault();
    setUrl(e.target.value);
    setLongState("Long URL");
  }

  function getShortLink() {
    if (!(url.length > 4)) {
      swal("Error", "Please enter a valid url!", "error");
    } else {
      setLoader(true);
      let formdata = new FormData();
      formdata.append("url", url);
      axios
        .post("https://eatmyurl.ml/api/new", formdata)
        .then((res) => {
          setLoader(false);
          console.log(res.data);
          setUrl(res.data.shortID);
          setLongState("Short URL");
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
          swal("Error", "Please enter a valid url!", "error");
        });
    }
  }

  function getClickCount() {
    setLoader2(true);
    if (!(url.length > 4)) {
      setLoader2(false);
      swal("Error", "Please enter a valid url!", "error");
      return;
    } else {
      let formdata = new FormData();
      formdata.append("url", url);
      axios
        .post("https://eatmyurl.ml/api/click", formdata)
        .then((res) => {
          setLoader2(false);
          swal("Success", "Click Count: " + res.data.click, "success");
        })
        .catch((err) => {
          console.log(err);
          setLoader2(false);
          swal("Error", "Please enter a valid url!", "error");
        });
    }
  }

  return (
    <div className="body">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <img
              className="img-fluid"
              src="https://raw.githubusercontent.com/vigneshshettyin/URL-Shortener/main/Client/eatmyurl/assets/images/logo.png"
              alt="LOGO"
              draggable="false"
            />
          </div>
        </div>
      </div>
      <div className="container-fluid mt3">
        <div className="row m-1">
          <div className="col-md-6">
            <ReactCardFlip isFlipped={flipState} flipDirection="horizontal">
              <div className="card shadow-lg rounded">
                <h4 className="rounded">Shorten URL!</h4>
                <div className="form-floating m-2">
                  <input
                    type="text"
                    onChange={handleUrl}
                    value={url}
                    className="form-control text-input"
                    id="floatingInput"
                    placeholder="https://github.com/vigneshshettyin/URL-Shortener"
                  />
                  <label>{longState}</label>
                </div>

                <center>
                  <button
                    onClick={getShortLink}
                    className="btn btn-primary custom-button"
                  >
                    {loader ? <Loading /> : <h5>Letme Eat it!!</h5>}
                  </button>
                </center>
                <button
                  className="btn btn-primary button-bottom custom-button"
                  onClick={handleFlipState}
                >
                  Get Count 🚧
                </button>
              </div>

              <div className="card shadow-lg rounded">
                <h4 className="rounded">Get Click Count!</h4>
                <div className="form-floating m-2">
                  <input
                    type="text"
                    onChange={handleUrl}
                    value={url}
                    className="form-control"
                    id="floatingInput"
                    placeholder="https://github.com/vigneshshettyin/URL-Shortener"
                  />
                  <label>Short URL</label>
                </div>

                <center>
                  <button
                    onClick={getClickCount}
                    className="btn btn-primary custom-button"
                  >
                    {loader2 ? <Loading /> : <h5>Get Link Count!!</h5>}
                  </button>
                </center>
                <button
                  className="btn btn-primary button-bottom custom-button"
                  onClick={handleFlipState}
                >
                  Shorten URL ➰
                </button>
              </div>
            </ReactCardFlip>
          </div>
          <div className="col-md-6 border center display-none">
            <div className="button-body">
              <button className="btn btn-primary ">Click Me!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Loading() {
  return (
    <>
      <span
        className="spinner-grow spinner-grow-sm"
        role="status"
        aria-hidden="true"
      ></span>
      <span className="sr-only"> Loading... </span>
    </>
  );
}
