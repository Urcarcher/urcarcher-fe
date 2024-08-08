import React, { useEffect, useState } from 'react'

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MapAPP from './kakaoMapTest/MapAPP';
import Login from './pages/auth/Login';
import Test from './pages/auth/Test';
import Card from './pages/card/Card';

import './rani/RegionList.css';
import CourseList from './rani/CourseList';
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
      </Routes>
    </BrowserRouter>
    </div>
  );
}
export default App;