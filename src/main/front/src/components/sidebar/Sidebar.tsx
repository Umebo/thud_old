import styled from 'styled-components';
import Routing from './Routing';
import Nickname from './panels/players/Nickname';
import ScoreboardPanel from '../gameplay/ScoreboardPanel';
import SecondPlayer from './panels/players/SecondPlayer';
import { useAppSelector } from '../../redux/Hooks';


const SidebarWrapper = styled.div`
    padding: 20px;
    display: flex;
    flex: 0;
    flex-direction: column;
`;

const Sidebar = () => {
    const gameStatus = useAppSelector((state) => state.gameplay.status);

    return(
        <SidebarWrapper id='SidebarWrapper'>
            <Routing />
            {gameStatus === "IN_PROGRESS" &&
                <ScoreboardPanel/>
            }
            <Nickname />
            <SecondPlayer />
        </SidebarWrapper>
    )
}

export default Sidebar;