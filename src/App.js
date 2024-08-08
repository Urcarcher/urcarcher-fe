import logo from './logo.svg';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MapAPP from './kakaoMapTest/MapAPP';

function App() {
  const [testStr, setTestStr] = useState('');

  function callback(str) {
    setTestStr(str);
  }

  useEffect(
    ()=>{
      axios.get('/api/t/test')
      .then((resp)=>{callback(resp.data)})
      .catch((err)=>{console.log(err)})
    }, []
  );

  return (
    <div className="App">
       <BrowserRouter wserRouter>
          <Routes>
            <Route  path='/map' element={<MapAPP />}></Route>
          </Routes>
      </BrowserRouter>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p> api test {'==>'} {testStr} </p>
      </header> */}
    </div>
  );
}

export default App;
