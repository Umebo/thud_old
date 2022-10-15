import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import Navbar from '../components/Navbar';
import Board from '../components/Board';
import styled from 'styled-components';

const AppStyled = styled.div`
  place-content: center;
  display: grid;
  background-color: #DCD7C9;
`;

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
    <AppStyled>
      <Navbar />
      <Board />
      <MainPage />
    </AppStyled>
  );
}

export default App;
