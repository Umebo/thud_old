import '../App.css';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../redux/Hooks';
import Sidebar from './sidebar/Sidebar';
import Gameplay from './gameplay/Gameplay';
import cd from "../config.json";

const MainWrapper = styled.div`
    width: 100%;
    display: flex;
    padding-bottom: 30px;
    justify-content: center;
    background-color: ${cd.THEME_COLORS.BACKGROUND};
`;

const Main = () => {
    const uuid = useAppSelector((state) => state.gameplay.uuid)

    return (
        <MainWrapper id='MainWrapper'>
            <Routes>
                <Route path={'/gameplay/' + uuid} element={
                    <Gameplay />
                }/>
            </Routes>
            <Sidebar />
        </MainWrapper>
    );

}

export default Main;
