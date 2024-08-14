import React, { useEffect, useState } from 'react'

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MapAPP from './pages/kakaomap/MapAPP';
import Login from './pages/auth/Login';
import Test from './pages/auth/Test';
import Card from './pages/card/Card';
import Signup from './pages/signup/Signup';

import './pages/tourcourse/RegionList.css';
import CourseList from './pages/tourcourse/CourseList';
function App() {


  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/test' element={<Test/>}/>
        <Route path='/card' element={<Card/>}/>
        <Route path='/CourseList' element={<CourseList/>}/>
        <Route  path='/map' element={<MapAPP />}></Route>
        <Route path='/signup/*' element={<Signup/>}/>
        
      </Routes>
    </BrowserRouter>
    </div>
  );
}
export default App;