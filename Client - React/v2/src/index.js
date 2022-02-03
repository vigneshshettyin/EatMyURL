import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountLink from "./page/count";
import HomePage from "./page/home";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:click" element={<CountLink />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
