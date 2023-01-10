import DwarfIcon from './bread_color.png';
import TrollIcon from './mace_color.png';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../redux/Hooks';
import { CHOOSE_PIECE, CLEAR } from '../../board/pieces/PieceSlice';

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
    const [currentType, setCurrentType] = useState(type);

    const isPawnChosen = useAppSelector((state) => state.piece.isPawnChosen);
    const first = useAppSelector((state) => state.piece.chosenPiecePosition);
    const isMoveDone = useAppSelector((state) => state.piece.isMoveDone);
    const dispatch = useAppDispatch();

    //FIXME: change for more meaningful name
    const activate = () => {
        if(!isPawnChosen) {
            dispatch(CHOOSE_PIECE({
                piecePosition: position
            }))
            setActive(!active);
        }
        else if(position === first) {
            dispatch(CLEAR())
            setActive(!active);
        }
        else {
            //TODO: rest endpoint call for check if this move is available
            send(position + " + " + first)
            //TODO: function for swaping pieces
            setCurrentType(PieceType.Dwarf)
        }
    }

    useEffect(() => {
        if(first === position) {
            setActive(!active);
            setCurrentType(PieceType.Empty)
            dispatch(CLEAR())
        }
    }, [isMoveDone]);

    return (
        <PieceWrapper id={position}
            onClick={() => activate()}
            style={{ backgroundColor: active ? 'red' : 'transparent' }}
        >
            {currentType == PieceType.Dwarf &&
                <IconWrapper src={DwarfIcon} style={{ 'padding': '5px' }} />
            }
            {currentType == PieceType.Troll &&
                <IconWrapper src={TrollIcon} />
            }
        </PieceWrapper>
    )
}

export {Piece, PieceType}