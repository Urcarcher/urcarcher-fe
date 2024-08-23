import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/auth/Login';
import Test from './pages/auth/Test';
import Card1 from './pages/card/Card1';
import Card2 from './pages/card/Card2';
import Card3 from './pages/card/Card3';
import Card4 from './pages/card/Card4';
import Card5 from './pages/card/Card5';
import Card6 from './pages/card/Card6';
import Signup from './pages/signup/Signup';
import './pages/tourcourse/RegionList.css';
import MyMapApp from './pages/mymap/MyMapApp';
import MyMapHome from './pages/mymap/MyMapHome';
import CourseList from './pages/tourcourse/CourseList';
import MonthlyChart from './pages/report/MonthlyChart';
import WeeklyChart from './pages/report/WeeklyChart';
import UsageHistory from './pages/report/UsageHistory';
import { CardProvider } from './pages/card/CardContext'; 
import TourGuide from './pages/tourguide/TourGuide';
import DetailPage from './pages/tourguide/DetailPage';
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
import CourseDetail from './pages/tourcourse/CourseDetail';
import ExchangeSuccess from './pages/exchange/ExchangeSuccess';
import TestReservation from './pages/reservation/TestReservation';
import MapComponent from './pages/location/MapComponent';
import TestCard from './pages/tourguide/TestCard';
import SearchTour from './pages/tourguide/SearchTour';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Verification from 'pages/card/Verification';

function App() {
  return (
    <CardProvider>
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/login/loading' element={<OAuthLoading/>}/>
          <Route path='/login/new' element={<OAuthNew/>}/>
          <Route path='/exchangeRate' element={<ExchangeRateList/>}/>
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
          <Route path='/courseList' element={<CourseList/>}/>
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path='/signup/*' element={<Signup/>}/>
          <Route  path='/maphome' element={<MyMapHome />}></Route>
          <Route  path='/maphome/map' element={<MyMapApp />}></Route>
          <Route  path='/maphome/categoryRank' element={<MyCategoryRank />}></Route>
          <Route  path='/maphome/beststorelist' element={<BestStoreList />}></Route>        
          <Route path='/exchange' element={<ExchangeSelect/>}></Route>
          <Route path='/exchange/card' element={<ExchangeCard/>}></Route>
          <Route path='/exchange/currency' element={<ExchangeCurrency/>}></Route>
          <Route path='/exchange/success' element={<ExchangeSuccess/>}></Route>
          <Route path='/exchange/set' element={<ExchangeSet/>}></Route>
          <Route path='/MapComponent' element={<MapComponent/>}></Route>
          <Route path='/MapComponent/:detailDestination' element={<MapComponent/>}/>
          <Route path='/TourGuide/:areaCode/:contentTypeId' element={<TourGuide/>}/>
          <Route path='/detail/:type/:id' element={<DetailPage/>}/>
          <Route path='/reservation' element={<TestReservation/>}/>
          <Route path='/searchtour' element={<SearchTour/>}></Route>
          <Route path='/testcard' element={<TestCard/>}/>


          <Route path='/verification' element={<Verification/>}></Route>
        </Routes>
        <Footer />

    </BrowserRouter>
   </div>
  </CardProvider>
  );
}
export default App;