import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import DogList from "./components/dogs/DogList";
import DogDetails from "./components/dogs/DogDetails";
import CityForm from "./components/cities/CityForm";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<DogList />} />
        <Route path="dogs" element={<DogList />} />
        <Route path="dogs/:id" element={<DogDetails />} />
        <Route path="cities/add" element={<CityForm />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
