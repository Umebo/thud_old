import { Grid } from '@mui/material';
import { Stomp } from '@stomp/stompjs';
import { useEffect } from 'react';
import SockJS from 'sockjs-client';
import styled from 'styled-components';
import cd from '../../config.json';
import ThudstoneIcon from '../board/pieces/static/thudstone_color.png';
import { useAppDispatch } from '../../redux/Hooks';
import Piece from '../board/pieces/Piece';
import { RECEIVE_MOVE } from '../board/pieces/PieceSlice';

const GameplayWrapper = styled.div`
    position: absolute;
    padding: 30px;
    width: 855px;
`;

const ThudstoneWrapper = styled.img`
    width: 49px;
    height: 49px;
    margin: 2px;
    border-radius: 5px;
    background-color: transparent;
`;

//TODO: remove redundant styling
const EmptySpace = styled.div`
    width: 49px;
    height: 49px;
    margin: 2px;
    border-radius: 5px;
    background-color: transparent;
`;

const Gameplay = () => {
    const dispatch = useAppDispatch();

    const board = [];
    let movementData = {
        from: "",
        to: "",
        type: "",
    }

    let stompClient: any

    useEffect(() => {
        connect();
    }, []);

    const connect = () => {
        var socket = new SockJS('/movement');
        stompClient = Stomp.over(socket)
        stompClient.connect({}, function(frame: any) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/mss', onMessage);
        });
    }

    const onMessage = (message: any) => {
        movementData = JSON.parse(message.body)

        dispatch(RECEIVE_MOVE({
            receivedMovedPieceSource: movementData.from,
            receivedMovedPieceDestination: movementData.to,
            receivedMovedPieceType: movementData.type
        }))
    }

    const sendMoveInfo = (moveData: string) => {
        stompClient.send('/app/message', {}, moveData);
    };

    const initialPawnsSetup = (tilePositon: string) => {

        if(cd.OUT_OF_BOARD_TILES.includes(tilePositon)) {
            return <EmptySpace />
        } else if(cd.DWARF_STARTING_TILES.includes(tilePositon)) {
            return <Piece 
                initialType={ "Dwarf" }
                position={tilePositon}
                send={sendMoveInfo}
                key={tilePositon}
                ></Piece>
            } else if (cd.TROLL_STARTING_TILES.includes(tilePositon)) {
                return <Piece 
                initialType={ "Troll" }
                position={tilePositon}
                send={sendMoveInfo}
                key={tilePositon}
                ></Piece>
            } else if (cd.THUDSTONE_TILE === tilePositon) {
                return <ThudstoneWrapper key={tilePositon} src={ ThudstoneIcon }/>
            } else {
                return <Piece 
                initialType={ "Empty" }
                position={tilePositon}
                send={sendMoveInfo}
                key={tilePositon}
            ></Piece>
        }  
    } 

    for(let i = 0; i < cd.BOARD_SIZE; i++) {
        for(let j = 0; j < cd.BOARD_SIZE; j++) {
            const dimX = cd.HORIZONTAL_AXIS[j];
            const dimY = cd.VERTICAL_AXIS[i];

            board.push(
                //TODO: get rid of styling in main function
                <Grid item style={{'height': '53px', 'position': 'relative'}} key={dimX+dimY} > 
                    { initialPawnsSetup(dimX+dimY) } 
                </Grid>
            );
        }
    }
    

    return(
            <GameplayWrapper>
                <Grid container>
                    {board}
                </Grid>
            </GameplayWrapper>
    )
}

export default Gameplay;