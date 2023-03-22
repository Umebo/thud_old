import '../App.css';
import styled from 'styled-components';
import cd from "../config.json";
import Routing from './sidebar/Routing';

const MainWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 30px;
    background-color: ${cd.THEME_COLORS.BACKGROUND};
`;

const Main = () => {
    return (
        <MainWrapper id='MainWrapper'>
            <Routing />
        </MainWrapper>
    );
}

export default Main;
