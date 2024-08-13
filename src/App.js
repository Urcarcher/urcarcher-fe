import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/auth/Login';
import Test from './pages/auth/Test';
import Card from './pages/card/Card';

import MyMapApp from './pages/mymap/MyMapApp';
import MyMapHome from './pages/mymap/MyMapHome';
import CourseList from './pages/tourcourse/CourseList';
import './pages/tourcourse/RegionList.css';
import MyCategoryRank from './pages/mymap/MyCategoryRank';
import BestStoreList from './pages/mymap/BestStoreList';
function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/test' element={<Test/>}/>
          <Route path='/card' element={<Card/>}/>
          <Route path='/CourseList' element={<CourseList/>}/>
          <Route  path='/maphome' element={<MyMapHome />}></Route>
          <Route  path='/maphome/map' element={<MyMapApp />}></Route>
          <Route  path='/maphome/categoryRank' element={<MyCategoryRank />}></Route>
          <Route  path='/maphome/beststorelist' element={<BestStoreList />}></Route>
        </Routes>
    </BrowserRouter>
    </div>
  );
}
export default App;