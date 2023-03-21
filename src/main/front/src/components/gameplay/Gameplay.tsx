import styled from 'styled-components';
import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { Card, CardBody } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import { RECEIVE_MOVE, REMOVE } from '../board/pieces/PieceSlice';
import connect, { sendMoveInfo } from '../SocketsConfig';
import { INVITE, SCORE } from './GameplaySlice';
import ThudstoneIcon from '../board/pieces/static/thudstone_color.png';
import Piece from '../board/pieces/Piece';
import Board from '../board/Board';
import cd from '../../config.json';

const GameplayWrapper = styled.div`
    position: absolute;
    flex: 0 0 auto;
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
    const uuid = useAppSelector((state) => state.gameplay.uuid)
    const board = [];

    useEffect(() => {
        connect(onMessage, onJoin);
    });

    const onJoin = (message: any) => {
        const secondPlayerData = JSON.parse(message.body);
        
        if(secondPlayerData.uuid === uuid){
            dispatch(INVITE({
                status: secondPlayerData.status,
                secondPlayer: secondPlayerData.secondPlayer.nickname
            }))
        }
    }

    const onMessage = (message: any) => {
        const movementData = JSON.parse(message.body);
        console.log(movementData);
        

        dispatch(RECEIVE_MOVE({
            receivedMovedPieceSource: movementData.from,
            receivedMovedPieceDestination: movementData.to,
            receivedMovedPieceType: movementData.type
        }));
        dispatch(REMOVE({
            receivedTakenPieces: movementData.takenPieces
        }));
        dispatch(SCORE({
            receivedMovedPieceType: movementData.type,
            receivedTakenPieces: movementData.takenPieces
        }));
    }

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
        <Card style={{'height': '830px', 'width': '830px', 'margin': '20px', 'flex': '0 0 auto'}}>
            <CardBody>
                <GameplayWrapper id='GameplayWrapper'>
                    <Board />
                    <Grid container>
                        {board}
                    </Grid>
                </GameplayWrapper>
            </CardBody>
        </Card>
    )
}

export default Gameplay;