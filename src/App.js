
import {useEffect, useState} from "react";
import axios from "axios";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './components/Home';
import  MyFlights  from './components/MyFlightsPage/MyFlights';

function App() {

  return (
    <BrowserRouter> {/*Sitemizdeki Route yapısını BrowserRouter ile kuruyoruz. Bu sayede basit bir şekilde sayfalar arası geçiş ve renderı sağlıyoruz. */}
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/my_flights" element={<MyFlights />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
