import React from 'react';
import styled from 'styled-components';

const TileStyle = styled.button`
    width: 50px
    height: 50px
`;

type TileProps = {
    dimX: string;
    dimY: string;
}

class Tile extends React.Component<TileProps> {
/* 
    constructor(props: TileProps) {
        super(props);
        this.state = {
            value: null
        }
    } */

    render() {
        return(
            <TileStyle>[{this.props.dimY},{this.props.dimX}]</TileStyle>
        )
    }
}

export default Tile;