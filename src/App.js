import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/auth/Login';
import Test from './pages/auth/Test';
import Card from './pages/card/Card';
import MyMapApp from './pages/mymap/MyMapApp';
import MyMapHome from './pages/mymap/MyMapHome';
import CourseList from './pages/tourcourse/CourseList';
import Home from './pages/Home';
import MyCategoryRank from './pages/mymap/MyCategoryRank';
import BestStoreList from './pages/mymap/BestStoreList';
import ExchangeSelect from './pages/exchange/ExchangeSelect';
import ExchangeCard from './pages/exchange/ExchangeCard';
import ExchangeCurrency from './pages/exchange/ExchangeCurrency';
import ExchangeSet from './pages/exchange/ExchangeSet';
import OAuthNew from './pages/auth/OAuthNew';
import OAuthLoading from './pages/auth/OAuthLoading';
import ExchangeRateList from './pages/exchangeRate/ExchangeRateList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/login/loading' element={<OAuthLoading/>}/>
          <Route path='/login/new' element={<OAuthNew/>}/>
          <Route path='/exchangeRate' element={<ExchangeRateList/>}/>
          <Route path='/test' element={<Test/>}/>
          <Route path='/card' element={<Card/>}/>
          <Route path='/CourseList' element={<CourseList/>}/>
          <Route  path='/maphome' element={<MyMapHome />}></Route>
          <Route  path='/maphome/map' element={<MyMapApp />}></Route>
          <Route  path='/maphome/categoryRank' element={<MyCategoryRank />}></Route>
          <Route  path='/maphome/beststorelist' element={<BestStoreList />}></Route>        
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