import styled from 'styled-components';
import Routing from './Routing';
import Nickname from './panels/players/Nickname';
import ScoreboardPanel from '../gameplay/ScoreboardPanel';
import SecondPlayer from './panels/players/SecondPlayer';
import { useAppSelector } from '../../redux/Hooks';


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
    const gameStatus = useAppSelector((state) => state.gameplay.status);

    return(
        <SidebarWrapper>
            <Routing />
            {gameStatus === "IN_PROGRESS" &&
                <ScoreboardPanel/>
            }
            <PlayersWrapper>
                <Nickname />
                <SecondPlayer />
            </PlayersWrapper>
        </SidebarWrapper>
    )
}

export default Sidebar;