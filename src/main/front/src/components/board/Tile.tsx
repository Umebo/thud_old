import styled from 'styled-components';
import {Piece, PieceType} from './pieces/Piece';

const TileWrapper = styled.button<Pick<TileProps, 'tileColor'>>`
width: 49px;
height: 49px;
margin: 2px;
border-radius: 5px;
background-color: ${(p) => p.tileColor};
text-align: center;
color: white;
`;

interface TileProps {
    dimX: string,
    dimY: string,
    tileColor: string
}

const Tile = ({dimX, dimY, tileColor}: TileProps) => {

    return(
        <TileWrapper id={dimX + dimY} tileColor={tileColor}>
            {/* {dimX}{dimY} */}
            <Piece type={PieceType.Dwarf}></Piece>
        </TileWrapper>
    ) 
}

export default Tile;