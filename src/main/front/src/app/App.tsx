import { useState } from 'react';
import styled from 'styled-components';
import '../App.css';
import Footer from '../components/Footer';
import Main from '../components/Main'
import Navigation from '../components/Navigation';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const App = () => {
  const [logged, setLogged] = useState(false);
  const [nickname, setNickname] = useState('');

  return (
    <LayoutWrapper>
      <Navigation 
        isLogged={logged}/>
      <Main 
        logged={logged}
        nickname={nickname}
        setLogged={setLogged}
        signIn={setNickname}/>
      <Footer />
    </LayoutWrapper>
  )
}

export default App;
