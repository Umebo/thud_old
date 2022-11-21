import styled from 'styled-components';
import configData from '../../config.json'
import ThudstoneIcon from './pieces/thudstone_color.png';
import {Piece, PieceType} from './pieces/Piece';

const TileWrapper = styled.div<Pick<TileProps, 'tileColor'>>`
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

    const dwarfTiles = configData.DWARF_STARTING_TILES
    const trollTiles = configData.TROLL_STARTING_TILES
    const thudStoneTile = 'H8'

    return(
        <TileWrapper id={dimX + dimY} tileColor={tileColor}>
{/*             {dwarfTiles.includes(dimX+dimY) &&
                <Piece type={PieceType.Dwarf}></Piece>
            }
            {trollTiles.includes(dimX+dimY) &&
                <Piece type={PieceType.Troll}></Piece>
            }
            {thudStoneTile == dimX+dimY &&
                <img src={ThudstoneIcon} style={{ 'width': '100%', 'height': '100%' }} />
            } */}
        </TileWrapper>
    ) 
}

export default Tile;