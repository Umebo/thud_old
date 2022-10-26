import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../Main';
import Login from './Login';


class Routing extends React.Component {
    render() {
        return(
            <Routes>
                <Route path='/login' element={<Login />}/>
            </Routes>
        )  
    }
}

export default Routing