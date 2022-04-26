import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar"
import Footer from "./Components/Footer/Footer"
import MintPage from './Components/MintPage/MintPage';
import App from './App';
import "./index.css";
import Market from './Components/Market/Market';
import Dungeon from './Components/Dungeon/Dungeon';


ReactDOM.render(
  <React.StrictMode>
      <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Tavern" element={<MintPage />} />
      <Route path="/Market" element={<Market />} />
      <Route path="/Dungeon" element={<Dungeon />} />
    </Routes>
    <Footer />
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


