import React, { useEffect, useState } from 'react'

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MapAPP from './pages/kakaomap/MapAPP';
import Login from './pages/auth/Login';
import Test from './pages/auth/Test';
import Card from './pages/card/Card';

import './pages/tourcourse/RegionList.css';
import CourseList from './pages/tourcourse/CourseList';
import MapComponent_G from './pages/location/MapComponent_G';
import TourGuide from './pages/tourguide/TourGuide';
import DetailPage from './pages/tourguide/DetailPage';
import Phone from './pages/유리다/Phone';


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
        <Route path='/MapComponent_G' element={<MapComponent_G/>}></Route>
        <Route path='/MapComponent_G/:detailDestination' element={<MapComponent_G/>}/>
        <Route path='/TourGuide' element={<TourGuide/>}/>
        <Route path='/detail/:type/:id' element={<DetailPage/>}/>
        <Route path='/phone' element={<Phone/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}
export default App;