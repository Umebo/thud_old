import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { useAppSelector } from '../../redux/Hooks';
import Rules from '../rules/Rules';
import Login from './panels/login/Login';
import NewGame from './panels/NewGame';
import Gameplay from '../gameplay/Gameplay';
import Sidebar from './Sidebar';
import Frontpage from '../frontpage/Frontpage';

const GameWrapper = styled.div`
    display: flex
`

const Routing = () => {
    const uuid = useAppSelector((state) => state.gameplay.uuid)

    return(
        <Routes>
            <Route path='/' element={
                <Frontpage />
            }/>
            <Route path='/login' element={
                <Login />
            }/>
            <Route path={'/gameplay/' + uuid} element={
                <GameWrapper id='GameWrapper'>
                    <Gameplay />
                    <Sidebar />
                </GameWrapper>
            }/>
            <Route path='/gameplay/new' element={
                <NewGame />
            }/>
            <Route path='/rules' element={
                <Rules />
            }/>
        </Routes>
    );
}

export default Routing