import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaBook } from "react-icons/fa";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { FiLogIn, FiLogOut, FiHome, FiPlus } from "react-icons/fi";
import { useAppSelector } from '../redux/Hooks';
import cd from "../config.json";

const NavBarContainer = styled.div`
    display: flex;
    width: 100%;
    font-family: Sue Ellen Francisco, sans-serif;
`
const NavItemWrapper = styled.div`
    display: flex;
    align-items: center;
    padding-left: 1rem;
`
const NavItemIconStyle = {
    'color': cd.THEME_COLORS.FONT,
    'font-size': '1.5rem'
}

const Navigation = () => {
    const isLogged = useAppSelector((state) => state.login.isLogged);

    return (
        <NavBarContainer>
            <Navbar id='Navbar'>
                <NavbarBrand tag={Link} to="/">Thud!</NavbarBrand>
                <Nav id='Nav' vertical>
                    <NavItem>
                        <NavItemWrapper>
                            <FiHome style={NavItemIconStyle} />
                            <NavLink tag={Link} to="/">Home</NavLink>
                        </NavItemWrapper>
                    </NavItem>
                    <NavItem>
                        <NavItemWrapper>
                            <FaBook style={NavItemIconStyle}/>
                            <NavLink tag={Link} to="/" disabled>Rules</NavLink>
                        </NavItemWrapper>
                    </NavItem>
                    {isLogged &&
                        <NavItem>
                            <NavItemWrapper>
                                <FiPlus style={NavItemIconStyle}/>
                                <NavLink tag={Link} to="/gameplay/new">New game</NavLink>
                            </NavItemWrapper>
                        </NavItem>
                    }
                    <NavItem>
                        {!isLogged 
                            ? 
                            <NavItemWrapper>
                                <FiLogIn style={NavItemIconStyle}/>
                                <NavLink tag={Link} to="/login">Login</NavLink>
                            </NavItemWrapper>
                            : 
                            <NavItemWrapper>
                                <FiLogOut style={NavItemIconStyle}/>
                                <NavLink tag={Link} to="/logout">Logout</NavLink>
                            </NavItemWrapper>
                        }
                    </NavItem>           
                </Nav>
            </Navbar>
        </NavBarContainer>
    )
}

export default Navigation;