import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import {Provider} from "react-redux"
import appStore from "./utils/appStore";
import Products from "./components/Products";
import ProductView from "./components/ProductView";
import Profile from "./components/Profile";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
          <Route index element={<Products/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<ProductView/>} />
          <Route path="/profile" element={<Profile/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
