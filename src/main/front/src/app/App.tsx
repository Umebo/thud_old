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
    
    return(
      <LayoutWrapper>
        <Navigation />
        <Main />
        <Footer />
      </LayoutWrapper>
    )  
}

export default App;
