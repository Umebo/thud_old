import React from 'react';
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';

class Navigation extends React.Component {

    render() {
        return (
            <Navbar>
                <NavbarBrand tag={Link} to="/">THUD!</NavbarBrand> 
                <Nav> 
                    <NavItem>
                        <NavLink tag={Link} to="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/">Rules</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/">New game</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/login">Login</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}

export default Navigation;