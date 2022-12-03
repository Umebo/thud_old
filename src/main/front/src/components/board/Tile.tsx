import styled from 'styled-components';

const TileWrapper = styled.div<Pick<TileProps, 'tileColor'>>`
width: 49px;
height: 49px;
margin: 2px;
border-radius: 5px;
background-color: ${(p) => p.tileColor};
`;

interface TileProps {
    dimX: string,
    dimY: string,
    tileColor: string
}

const Tile = ({dimX, dimY, tileColor}: TileProps) => {

    return(
        <TileWrapper id={dimX + dimY} tileColor={tileColor} />
    ) 
}

export default Tile;