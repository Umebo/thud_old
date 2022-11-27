import styled from 'styled-components';
import Nickname from './panels/Nickname';
import Routing from './Routing';

const SidebarWrapper = styled.div`
    margin-left: 855px;
    width: 400px;
    padding: 20px;
    flex: 1;
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
                setLogged={ setLogged }
                nickname={ nickname }/>
            <Nickname 
                nickname={ nickname }
                isLogged={ logged }/>
        </SidebarWrapper>
    )
}

export default Sidebar;