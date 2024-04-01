import styled from 'styled-components';
import Nickname from './panels/players/Nickname';
import ScoreboardPanel from '../gameplay/ScoreboardPanel';
// import SecondPlayer from './panels/players/SecondPlayer';
import { useAppSelector } from '../../redux/Hooks';
import EndRound from './panels/EndRound';


const SidebarWrapper = styled.div`
    margin-top: 40px;
    padding: 20px;
    display: flex;
    flex: 0;
    flex-direction: column;
`;

const Sidebar = () => {
    const gameStatus = useAppSelector((state) => state.gameplay.status);

    return(
        <SidebarWrapper id='SidebarWrapper'>
            {gameStatus === "IN_PROGRESS" &&
                <ScoreboardPanel/>
            }
            <Nickname />
            <EndRound />
            {/* <SecondPlayer /> */}
        </SidebarWrapper>
    )
}

export default Sidebar;