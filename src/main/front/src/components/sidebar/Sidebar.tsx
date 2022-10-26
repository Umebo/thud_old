import React from 'react';
import styled from 'styled-components';
import Routing from './Routing';

const SidebarWrapper = styled.div`
    margin-left: auto;
    width: 500px;
    height: 100%;
    background-color: #A27B5C;
`;

class Sidebar extends React.Component {
    render() {
        return(
            <SidebarWrapper>
                <Routing />
            </SidebarWrapper>
        )
    }
}

export default Sidebar;