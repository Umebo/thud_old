import styled from 'styled-components';
import Nickname from './panels/players/Nickname';
import Routing from './Routing';

const SidebarWrapper = styled.div`
    margin-left: 855px;
    width: 400px;
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const Sidebar = () => {

    return(
        <SidebarWrapper>
            <Routing />
            <Nickname />
        </SidebarWrapper>
    )
}

export default Sidebar;