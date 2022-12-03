import { Routes, Route } from 'react-router-dom';
import Login from './panels/Login';
import NewGame from './panels/NewGame';

interface RoutingProps {
    nickname: string
    signIn: (nickname: any) => any,
    setLogged: (isLogged: boolean) => any
}

const Routing = ({ nickname, signIn, setLogged }: RoutingProps) => {
    return(
        <Routes>
            <Route path='/login' element={
                <Login 
                    signIn={ signIn }
                    setLogged={ setLogged }/>
            }/>
            <Route path='/gameplay/new' element={
                <NewGame
                    nickname={ nickname } />
            }/>
        </Routes>
    )  
}

export default Routing