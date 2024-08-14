import React from 'react'

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MapAPP from './pages/kakaomap/MapAPP';
import Login from './pages/auth/Login';
import Test from './pages/auth/Test';
import Card1 from './pages/card/Card1';

import './pages/tourcourse/RegionList.css';
import CourseList from './pages/tourcourse/CourseList';
import MonthlyChart from './pages/report/MonthlyChart';
import WeeklyChart from './pages/report/WeeklyChart';
import UsageHistory from './pages/report/UsageHistory';
import Card2 from './pages/card/Card2';
import Card3 from './pages/card/Card3';
import Card4 from './pages/card/Card4';
import Card5 from './pages/card/Card5';
import Card6 from './pages/card/Card6';
import { CardProvider } from './pages/card/CardContext'; 
function App() {


  return (
    <CardProvider>
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/test' element={<Test/>}/>
        
        <Route path='/card1' element={<Card1/>}/>
        <Route path='/card2' element={<Card2/>}/>
        <Route path='/card3' element={<Card3 />}/>
        <Route path='/card4' element={<Card4 />}/>
        <Route path='/card5' element={<Card5 />}/>
        <Route path='/card6' element={<Card6 />}/>
        
        <Route path='/usage' element={<UsageHistory/>}/>
        <Route path='/chart1' element={<MonthlyChart/>}/>
        <Route path='/chart2' element={<WeeklyChart/>}/>
        <Route path='/CourseList' element={<CourseList/>}/>
        <Route  path='/map' element={<MapAPP />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
    </CardProvider>
  );
}
export default App;