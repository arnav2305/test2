import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserAuth from "./Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserAuth/>} />
        {/* <Route path="/stock-news" element={<News />} /> */}
      </Routes>
      {/* <StockPrice />
      <StockChart /> */}
    </BrowserRouter>
  );
}

export default App;