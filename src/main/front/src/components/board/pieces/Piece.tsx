import axios from 'axios';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import DwarfIcon from './static/bread_color.png';
import TrollIcon from './static/mace_color.png';
import cd from '../../../config.json';
import { useAppDispatch, useAppSelector } from '../../../redux/Hooks';
import { CHOOSE_PIECE, GET_MOVES, CLEAR } from './PieceSlice';

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
    Dwarf = "Dwarf",
    Troll = "Troll",
    Empty = ""
}

interface PieceProps {
    type: PieceType
    position: string
    send: Function
}

const Piece = ({ type, position, send }: PieceProps) => {
    const [active, setActive] = useState(false);
    const [currentType, setCurrentType] = useState(type);

    const isPawnChosen = useAppSelector((state) => state.piece.isPawnChosen);
    const chosenPieceType = useAppSelector((state) => state.piece.chosenPieceType);
    const first = useAppSelector((state) => state.piece.chosenPiecePosition);
    const availableMoves = useAppSelector(state => state.piece.availableMoves);
    const dispatch = useAppDispatch();
    
// ---------- Event listeners ---------- //

// clear Empty tile if another chosen
    // useEffect(() => {
    //     if(!isPawnChosen && active) {
    //         setActive(false)
    //     }
    // }, [isPawnChosen]);

    useEffect(() => {
        if(position === "O8"){
            console.log(position + " change!");
        }
    }, [active]);

// activate tiles which are current available destinations
    useEffect(() => {
        if(availableMoves.includes(position)) {
            setActive(true);
        }
        if(availableMoves.length === 0 && position != first) {
            setActive(false)
        }
    }, [availableMoves]);

// ------------------------------------- //

    const activate = () => {
        dispatch(CHOOSE_PIECE({
            piecePosition: position,
            pieceType: type
        }))
        if(type !== PieceType.Empty) {
            getAvailableMoves();
        }
        setActive(true);
    }

    //FIXME: change for more meaningful name
    const choosePiece = () => {
        if(!isPawnChosen) {
            activate();
        }
        //TODO: second piece chosen
        else {
            if(position === first) {
                dispatch(CLEAR());
            }
            else if(!availableMoves.includes(position)) {
                dispatch(CLEAR());
                activate();
            }
            // else {
            //     send(JSON.stringify({
            //         from: first,
            //         to: position,
            //         pieceType: type.toString
            //     }))
            //     setCurrentType(chosenPieceType)
            //     dispatch(MOVE_DONE())
            //     dispatch(CLEAR())
            // }
        }
    }

    const getAvailableMoves = () => {
        axios
            .get(cd.SERVER_URL + '/movement/all', { params: {
                    position: position,
                    pieceType: type
                }})
            .then((response) => {
                dispatch(GET_MOVES({
                    availableMoves: response.data
                }))
            })
            .catch((error) => console.log(error.message));
    }

    return (
        <PieceWrapper id={position}
            onClick={() => choosePiece()}
            style={{ backgroundColor: active ? 'red' : 'transparent' }}
        >
            {type === PieceType.Dwarf &&
                <IconWrapper src={DwarfIcon} style={{ 'padding': '5px' }} />
            }
            {type === PieceType.Troll &&
                <IconWrapper src={TrollIcon} />
            }
        </PieceWrapper>
    )
}

export {Piece, PieceType}