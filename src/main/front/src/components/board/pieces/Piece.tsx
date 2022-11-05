import DwarfIcon from './bread_color.png';
import TrollIcon from './mace_color.png';
import { useState } from 'react';
import styled from 'styled-components';

// TODO: show border on hover:
//      &:hover {}

const PieceWrapper = styled.button`
    background-color: transparent;
    border: none;
`;

const IconWrapper = styled.img`
    width: 100%;
    height: 100%;
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

    return (
        <PieceWrapper>
            {type == PieceType.Dwarf &&
                <IconWrapper src={DwarfIcon} style={{ 'padding': '5px' }} />
            }
            {type == PieceType.Troll &&
                <IconWrapper src={TrollIcon} />
            }
        </PieceWrapper>
    )
}

export {Piece, PieceType}