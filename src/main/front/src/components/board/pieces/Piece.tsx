import axios from 'axios';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';
import DwarfIcon from './static/bread_color.png';
import TrollIcon from './static/mace_color.png';
import cd from '../../../config.json';
import { useAppDispatch, useAppSelector } from '../../../redux/Hooks';
import { CHOOSE_PIECE, GET_MOVES, CLEAR, CHOOSE_MOVE_TYPE, MAKE_MOVE } from './PieceSlice';

// TODO: show border on hover:
//      &:hover {}

const PieceWrapper = styled.div`
    width: 49px;
    height: 49px;
    margin: 2px;
    border-radius: 5px;
`;

const MoveWrapper = styled.button`
    width: 49px;
    height: 49px;
    border-radius: 5px;
    backgroundColor: transparent;
`;

const IconWrapper = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
`;

const DropdownWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
`

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
    const availableNormalMoves = useAppSelector(state => state.piece.availableNormalMoves);
    const availableSpecialMoves = useAppSelector(state => state.piece.availableSpecialMoves);
    const moveMadeFrom = useAppSelector(state => state.piece.moveMadeFrom)
    const receivedMovedPieceSource = useAppSelector(state => state.piece.receivedMovedPieceSource)
    const receivedMovedPieceDestination = useAppSelector(state => state.piece.receivedMovedPieceDestination)
    const receivedMovedPieceType = useAppSelector(state => state.piece.receivedMovedPieceType)
    const MyFraction = useAppSelector(state => state.gameplay.myFraction)
    const dispatch = useAppDispatch();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => {
        setDropdownOpen((prevState) => !prevState);
        setActive(!active);
    };
    
// ---------- Event listeners ---------- //

    useEffect(() => {
        if(dropdownOpen && chosenPieceType === currentType) setActive(true);
        else setActive(false);
    }, [dropdownOpen, isPawnChosen]);

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
        if(!dropdownOpen){
            dispatch(CLEAR())
        }
        dispatch(CHOOSE_PIECE({
            piecePosition: position,
            pieceType: currentType
        }))
        if(currentType !== "Empty" && currentType === MyFraction) {
            getAvailableMoves();
        }
        // setActive(true);
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

    const chooseMoveType = (moveType: string) => {
        switch(moveType) {
            case "normal": 
                dispatch(CHOOSE_MOVE_TYPE({
                    availableMoves: availableNormalMoves
                })); 
                break;
            case "special": 
                dispatch(CHOOSE_MOVE_TYPE({
                    availableMoves: availableSpecialMoves
                })); 
                break;
            default: break;
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
                    availableNormalMoves: response.data.availableNormalMoves,
                    availableSpecialMoves: response.data.availableSpecialMoves
                }))
            })
            .catch((error) => console.log(error.message));
    }

    return (
        <PieceWrapper id={position}
            style={{ backgroundColor: active ? 'rgba(255, 99, 71, 0.4)' : 'transparent' }}
        >
            <div style={{
                'width': '100%', 
                'height': '100%',
                'position': 'relative'
            }}>
                {currentType === "Dwarf" &&
                    <IconWrapper src={DwarfIcon} style={{ 'padding': '5px' }} />
                }
                {currentType === "Troll" &&
                    <IconWrapper src={TrollIcon} />
                }
                <div>
                    {availableMoves.includes(position) &&
                        <MoveWrapper 
                        style={{ backgroundColor: 'transparent' }}
                        onClick={() => makeMove()} />
                    }
                </div>
                {currentType !== "Empty" && currentType === MyFraction &&
                    <DropdownWrapper>
                        <Dropdown 
                            isOpen={dropdownOpen}
                            toggle={toggle} 
                            direction={'down'} 
                            onClick={() => activate()}
                        >
                            <DropdownToggle className='pieceDropdown'
                                style={{ 
                                    'backgroundColor': 'transparent',
                                    'width': '100%',
                                    'height': '49px'
                                }}
                            ></DropdownToggle>
                            <DropdownMenu
                                style={{ backgroundColor: 'rgba(180, 180, 180, 0.7)' }}
                            >
                                <DropdownItem onClick={() => chooseMoveType("normal")}>Move</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => chooseMoveType("special")}>
                                    {currentType === "Dwarf" ? "Hurl" : "Shove"}
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </DropdownWrapper>
                }
            </div>
        </PieceWrapper>
    )
}

export default Piece