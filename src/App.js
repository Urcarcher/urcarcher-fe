import React, { useEffect, useState } from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Test from './pages/auth/Test';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/test' element={<Test/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
