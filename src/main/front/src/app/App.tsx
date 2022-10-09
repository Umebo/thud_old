import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import Navbar from '../components/Navbar';

const MainPage = () => {

  const [response, getResponse] = useState([]);

  useEffect(() => {
    
    axios
      .get("http://localhost:8080/thud")
      .then(res => {
        console.log(res);
        getResponse(res.data);
      });
    }, []);

  return (
      <div>
        <h1>{response}</h1>
      </div>
  );

}

function App() {
  return (
    <div className="App">
      <Navbar />
      <MainPage />
    </div>
  );
}

export default App;
