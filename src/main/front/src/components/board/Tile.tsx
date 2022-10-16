import styled from 'styled-components';

const TILE = styled.div<TileProps>`
width: 50px;
height: 50px;
margin: 2px;
border-radius: 5px;
background-color: ${(p) => p.tileColor};
text-align: center;
color: white;
`;

interface TileProps {
    dimX?: string,
    dimY?: string,
    tileColor: string
}

const Tile = (props: TileProps) => {

    return(
        <TILE tileColor={props.tileColor}>
            {/* {props.dimX}{props.dimY} */}
        </TILE>
    ) 
}

export default Tile;