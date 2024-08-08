import React from 'react'

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MapAPP from './pages/kakaomap/MapAPP';
import Login from './pages/auth/Login';
import Test from './pages/auth/Test';
import Card from './pages/card/Card';

import './pages/tourcourse/RegionList.css';
import CourseList from './pages/tourcourse/CourseList';
import Card3 from './pages/card/Card3';
import Card2 from './pages/card/Card2';
function App() {


  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/test' element={<Test/>}/>
        <Route path='/card' element={<Card/>}/>
        <Route path='/card2' element={<Card2/>}/>
        <Route path='/card3' element={<Card3/>}/>
        <Route path='/CourseList' element={<CourseList/>}/>
        <Route  path='/map' element={<MapAPP />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}
export default App;