import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import '../App.css';
import Main from '../pages/Main'

const APP = styled.div`
  height: 100vh
`;
class App extends React.Component {
  render() {
    return(
      <APP>
        <Routes>
          <Route path='/' element={<Main />}/>
        </Routes>
      </APP>
    )  
  }
}

export default App;
