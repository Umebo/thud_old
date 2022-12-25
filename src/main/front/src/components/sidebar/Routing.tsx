import { Routes, Route } from 'react-router-dom';
import Login from './panels/login/Login';
import NewGame from './panels/NewGame';

const Routing = () => {
    return(
        <Routes>
            <Route path='/login' element={
                <Login />
            }/>
            <Route path='/gameplay/new' element={
                <NewGame />
            }/>
        </Routes>
    )  
}

export default Routing