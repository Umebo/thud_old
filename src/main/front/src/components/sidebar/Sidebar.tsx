import React, { useState } from 'react';
import { Card, Row } from 'reactstrap';
import styled from 'styled-components';
import Nickname from './Nickname';
import Routing from './Routing';

const SidebarWrapper = styled.div`
    margin-left: auto;
    width: 400px;
    padding: 20px;
    display: flex;
    flex-direction: column;
`;

const CardStyling = {
    'backgroud-color': '#a27b5caf'
}

const Sidebar = () => {
    const [logged, setLogged] = useState(false);
    const [nickname, setNickname] = useState('');

    return(
        <SidebarWrapper>
            <Routing />
            <Nickname />
        </SidebarWrapper>
    )
}

export default Sidebar;