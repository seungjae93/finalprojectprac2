import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Review from "../pages/Review";
import Modal from "../modal/Modal";
// import MainMap from "../pages/MainMap";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* <Route path="/map" element={<MainMap />} /> */}
        <Route path="/review" element={<Review />} />
        <Route path="/modal" element={<Modal />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
