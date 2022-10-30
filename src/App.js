import Footer from './components/Footer';

import Comp from './components/Comp';
import Add from './Add'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import React from "react";
import "./App.css"



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/add-product" element={<Add />} />
          <Route path="/" element={< Comp />} />
        </Routes>
        <Footer />
      </Router>


    </div>
  );
}

export default App;
