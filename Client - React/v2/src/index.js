import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./page";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/users" element={<HomePage />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
