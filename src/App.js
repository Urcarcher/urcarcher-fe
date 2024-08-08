
import React, { useEffect, useState } from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Test from './pages/auth/Test';
import Card from './pages/card/Card';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/test' element={<Test/>}/>
        <Route path='/card' element={<Card/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
