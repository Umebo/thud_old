import '../App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Board from './board/Board';
import styled from 'styled-components';
import configData from "../config.json";
import Sidebar from './sidebar/Sidebar';

const MainWrapper = styled.div`
    display: inline-flex;
    flex: 2 1 auto;
    padding-bottom: 30px;
    background-color: ${configData.THEME_COLORS.BACKGROUND};
`;

interface MainProps {
    logged: boolean
    nickname: string
    signIn: (nickname: any) => any,
    setLogged: (isLogged: boolean) => any
}

const Main = ({ logged, nickname, setLogged, signIn }: MainProps) => {

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
        <MainWrapper>
            <Board />
            <Sidebar
                logged={logged}
                nickname={nickname}
                setLogged={setLogged}
                signIn={signIn}/>
        </MainWrapper>
    );

}

export default Main;
