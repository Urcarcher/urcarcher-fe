import React, { useEffect, useState } from 'react'

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MapAPP from './pages/kakaomap/MapAPP';
import Login from './pages/auth/Login';
import Test from './pages/auth/Test';
import Card from './pages/card/Card';

import './pages/tourcourse/RegionList.css';
import CourseList from './pages/tourcourse/CourseList';
import OAuthNew from './pages/auth/OAuthNew';
import OAuthLoading from './pages/auth/OAuthLoading';
import ExchangeRateList from './pages/exchangeRate/ExchangeRateList';
function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/login/loading' element={<OAuthLoading/>}/>
        <Route path='/login/new' element={<OAuthNew/>}/>
        <Route path='/exchangeRate' element={<ExchangeRateList/>}/>
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