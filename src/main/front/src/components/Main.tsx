import '../App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Board from './board/Board';
import styled from 'styled-components';
import cd from "../config.json";
import Sidebar from './sidebar/Sidebar';
import Gameplay from './gameplay/Gameplay';
import { Route, Routes } from 'react-router-dom';

const MainWrapper = styled.div`
    display: inline-flex;
    flex: 2 1 auto;
    padding-bottom: 30px;
    background-color: ${cd.THEME_COLORS.BACKGROUND};
`;

type GameType = {
    UUID: string
    status: string
    player1: string
    player2: string
    board: string[]
}
interface MainProps {
    logged: boolean
    nickname: string
    signIn: (nickname: any) => any
    setLogged: (isLogged: boolean) => any
}

const Main = ({ logged, nickname, setLogged, signIn }: MainProps) => {

    const [response, getResponse] = useState([]);
    const [gameplay, setGameplay] = useState<GameType>();

    useEffect(() => {

        axios
            .get("http://localhost:8080/thud")
            .then(res => {
                console.log(res);
                getResponse(res.data);
            });
    }, []);

    return (
        <MainWrapper>
            <Board />
            <Routes>
                <Route path='/gameplay/test_path' element={
                    <Gameplay
                    uuid={ 'EFGH' }
                    status={ 'NEW' }
                    player1={ 'Test_3' }/>
                }/>
            </Routes>
            
            <Sidebar
                logged={logged}
                nickname={nickname}
                setLogged={setLogged}
                signIn={signIn}/>
        </MainWrapper>
    );

}

export default Main;
