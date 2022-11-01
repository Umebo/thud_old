import styled from 'styled-components';
import Nickname from './panels/Nickname';
import Routing from './Routing';

const SidebarWrapper = styled.div`
    margin-left: auto;
    width: 400px;
    padding: 20px;
    display: flex;
    flex-direction: column;
`;

interface SidebarProps {
    logged: boolean
    nickname: string
    setLogged: (isLogged: boolean) => any
    signIn: (nickname: any) => any
}

const Sidebar = ({ logged, nickname, setLogged, signIn }: SidebarProps) => {

    return(
        <SidebarWrapper>
            <Routing 
                signIn={ signIn }
                setLogged={ setLogged }/>
            <Nickname 
                nickname={ nickname }
                isLogged={ logged }/>
        </SidebarWrapper>
    )
}

export default Sidebar;