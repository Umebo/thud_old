import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './Main';


class Routing extends React.Component {
    render() {
        return(
            <Routes>
                <Route path='/' element={<Main />}/>
            </Routes>
        )  
    }
}

export default Routing