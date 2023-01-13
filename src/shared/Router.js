import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Review from "../Review/Review";
import Modal from "../modal/Modal";
import Mypage from "../mypage/Mypage";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/review" element={<Review />} />
        <Route path="/modal" element={<Modal />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
