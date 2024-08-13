import React, { useEffect, useState } from 'react'

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MapAPP from './pages/kakaomap/MapAPP';
import Login from './pages/auth/Login';
import Test from './pages/auth/Test';
import Card from './pages/card/Card';

import './pages/tourcourse/RegionList.css';
import CourseList from './pages/tourcourse/CourseList';
import ExchangeSelect from './pages/exchange/ExchangeSelect';
import ExchangeCard from './pages/exchange/ExchangeCard';
import ExchangeCurrency from './pages/exchange/ExchangeCurrency';
import ExchangeSet from './pages/exchange/ExchangeSet';

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
        <Route path='/exchange' element={<ExchangeSelect/>}></Route>
        <Route path='/exchange/card' element={<ExchangeCard/>}></Route>
        <Route path='/exchange/currency' element={<ExchangeCurrency/>}></Route>
        <Route path='/exchange/set' element={<ExchangeSet/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}
export default App;