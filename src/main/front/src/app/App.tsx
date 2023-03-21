import styled from 'styled-components';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Main from '../components/Main'
import cd from "../config.json";
import '../App.css';

const LayoutWrapper = styled.div`
  display: flex;
  height: 100%;
`;

const MenuContainer = styled.div`
    height: 100%;
    width: 200px;
    background-color: ${cd.THEME_COLORS.PRIMARY};
`

const App = () => {

  return (
    <LayoutWrapper id='layout_wrapper'>
      <MenuContainer>
        <Navigation />
        <Footer />
      </MenuContainer>
      <Main />
    </LayoutWrapper>
  )
}

export default App;
