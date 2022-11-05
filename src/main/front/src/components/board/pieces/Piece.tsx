import { Button } from 'reactstrap';
import DwarfIcon from './bread_color.png';
import TrollIcon from './mace_color.png';
import configData from '../../../config.json'
import { useState } from 'react';
import styled from 'styled-components';

const PieceWrapper = styled.button`
    background-color: transparent;
`;

enum PieceType {
    Dwarf,
    Troll
}

interface IPiece {
    type: PieceType
}

const Piece = ({type}: IPiece) => {
    const [startingTiles, setStartingTiles] = useState<string[]>([]);

   /*  if (type == PieceType.Dwarf) {
        setStartingTiles(configData.DWARF_STARTING_TILES)
    } else if (type = PieceType.Troll)
        setStartingTiles(configData.TROLL_STARTING_TILES) */

    return (
        <PieceWrapper>
            {type == PieceType.Dwarf
                ? <img src={DwarfIcon} style={{ 'width': '100%', 'height': '100%' }} />
                : <img src={TrollIcon} style={{ 'width': '100%', 'height': '100%' }} />
            }
        </PieceWrapper>
    )
}

export {Piece, PieceType}