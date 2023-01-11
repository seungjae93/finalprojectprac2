import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Review from "../pages/Review";
import Modal from "../modal/Modal";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/review" element={<Review />} />
        <Route path="/modal" element={<Modal />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
