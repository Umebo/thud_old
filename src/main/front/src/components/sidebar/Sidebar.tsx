import styled from 'styled-components';
import Nickname from './panels/players/Nickname';
import SecondPlayer from './panels/players/SecondPlayer';
import Routing from './Routing';

const SidebarWrapper = styled.div`
    margin-left: 855px;
    width: 400px;
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const PlayersWrapper = styled.div`
    margin-top: auto;
`;

const Sidebar = () => {

    return(
        <SidebarWrapper>
            <Routing />
            <PlayersWrapper>
                <Nickname />
                <SecondPlayer />
            </PlayersWrapper>
        </SidebarWrapper>
    )
}

export default Sidebar;