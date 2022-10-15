import React from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import {Link} from 'react-router-dom';

interface NavbarProps {
    isOpen: boolean;
}

class AppNavbar extends React.Component {

    render() {
        return (
            <Navbar color='dark'>
                <NavbarBrand tag={Link} to="/">Home</NavbarBrand> 
            </Navbar>
        )
    }
}

/* 
const Navbar = () => {
    return <h1>Navbar</h1>;
} */

export default AppNavbar;