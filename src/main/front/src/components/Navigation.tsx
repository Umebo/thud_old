import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

interface NavProps {
    isLogged: boolean
}

const Navigation = ({ isLogged }: NavProps) => {

    return (
        <Navbar>
            <NavbarBrand tag={Link} to="/">THUD!</NavbarBrand>
            <Nav>
                <NavItem>
                    <NavLink tag={Link} to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/" disabled>Rules</NavLink>
                </NavItem>
                {isLogged &&
                    <NavItem>
                        <NavLink tag={Link} to="/gameplay/new">New game</NavLink>
                    </NavItem>
                }
                <NavItem>
                    {!isLogged 
                        ? <NavLink tag={Link} to="/login">Login</NavLink>
                        : <NavLink tag={Link} to="/logout">Logout</NavLink>
                    }
                </NavItem>           
            </Nav>
        </Navbar>
    )
}

export default Navigation;