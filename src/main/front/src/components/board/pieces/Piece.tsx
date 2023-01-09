import DwarfIcon from './bread_color.png';
import TrollIcon from './mace_color.png';
import { useState } from 'react';
import styled from 'styled-components';

// TODO: show border on hover:
//      &:hover {}

const PieceWrapper = styled.button`
    width: 49px;
    height: 49px;
    margin: 2px;
    border-radius: 5px;
`;

const IconWrapper = styled.img`
    width: 100%;
    height: 100%;
`;

enum PieceType {
    Dwarf,
    Troll,
    Empty
}

interface PieceProps {
    type: PieceType
    position: string
    send: (position: string) => void
}

const Piece = ({type, position, send}: PieceProps) => {
    const [active, setActive] = useState(false);

    const activate = () => {
        send(position);
        setActive(!active);
    }

    return (
        <PieceWrapper
            onClick={() => activate()}
            style={{ backgroundColor: active ? 'red' : 'transparent' }}
        >
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