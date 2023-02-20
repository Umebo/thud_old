import axios from 'axios';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import DwarfIcon from './static/bread_color.png';
import TrollIcon from './static/mace_color.png';
import cd from '../../../config.json';
import { useAppDispatch, useAppSelector } from '../../../redux/Hooks';
import { CHOOSE_PIECE, GET_MOVES, CLEAR, MAKE_MOVE } from './PieceSlice';

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


interface PieceProps {
    initialType: string
    position: string
    send: Function
}

const Piece = ({ initialType, position, send }: PieceProps) => {
    const [active, setActive] = useState<boolean>(false);
    const [currentType, setCurrentType] = useState<string>(initialType);

    const isPawnChosen = useAppSelector(state => state.piece.isPawnChosen);
    const chosenPieceType = useAppSelector(state => state.piece.chosenPieceType);
    const chosenPiecePosition = useAppSelector(state => state.piece.chosenPiecePosition);
    const availableMoves = useAppSelector(state => state.piece.availableMoves);
    const moveMadeFrom = useAppSelector(state => state.piece.moveMadeFrom)
    const receivedMovedPieceSource = useAppSelector(state => state.piece.receivedMovedPieceSource)
    const receivedMovedPieceDestination = useAppSelector(state => state.piece.receivedMovedPieceDestination)
    const receivedMovedPieceType = useAppSelector(state => state.piece.receivedMovedPieceType)
    const MyFraction = useAppSelector(state => state.gameplay.myFraction)
    const dispatch = useAppDispatch();
    
// ---------- Event listeners ---------- //


// activate tiles which are current available destinations
    useEffect(() => {
        if(availableMoves.includes(position)) {
            setActive(true);
        }
        if(availableMoves.length === 0 && position !== chosenPiecePosition) {
            setActive(false)
        }
    }, [availableMoves]);

// change initial piece type to Empty
    useEffect(() => {
        if(position === moveMadeFrom) {
            setCurrentType("Empty")
        }
    }, [moveMadeFrom]);

// change board state after other player move
    useEffect(() => {
        if(receivedMovedPieceType !== MyFraction) {
            if(position === receivedMovedPieceSource) {
                setCurrentType("Empty");
            } 
            else if(position === receivedMovedPieceDestination) {
                setCurrentType(receivedMovedPieceType);
            }
        }
    }, [receivedMovedPieceType]);

// ------------------------------------- //

    const activate = () => {
        dispatch(CHOOSE_PIECE({
            piecePosition: position,
            pieceType: currentType
        }))
        if(currentType !== "Empty" && currentType === MyFraction) {
            getAvailableMoves();
        }
        setActive(true);
    }

    const makeMove = () => {
        send(JSON.stringify({
            from: chosenPiecePosition,
            to: position,
            type: chosenPieceType
        }))
        setCurrentType(chosenPieceType);
        dispatch(MAKE_MOVE())
        dispatch(CLEAR())
    }

    const choosePiece = () => {
        if(!isPawnChosen) {
            activate();
        }
        else {
            if(position === chosenPiecePosition) {
                dispatch(CLEAR());
            }
            else if(!availableMoves.includes(position)) {
                dispatch(CLEAR());
                activate();
            }
            else {
                makeMove()
            }
        }
    }

    const getAvailableMoves = () => {
        axios
            .get(cd.SERVER_URL + '/movement/all', { params: {
                    position: position,
                    pieceType: currentType
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
            style={{ backgroundColor: active ? 'rgba(255, 99, 71, 0.4)' : 'transparent' }}
        >
            {currentType === "Dwarf" &&
                <IconWrapper src={DwarfIcon} style={{ 'padding': '5px' }} />
            }
            {currentType === "Troll" &&
                <IconWrapper src={TrollIcon} />
            }
        </PieceWrapper>
    )
}

export default Piece