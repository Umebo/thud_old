import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

const MainPage = () => {

  const fetchMainPage = () => {
    axios.get("http://localhost:8080/thud").then(response => {
      console.log(response);
    });
  }
  
  useEffect(() => {fetchMainPage();})
  
}

function App() {
  return (
    <div className="App">
      <MainPage />
    </div>
  );
}

export default App;
