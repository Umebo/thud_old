import { Grid } from '@mui/material';
import styled from 'styled-components';
import cd from '../../config.json';
import ThudstoneIcon from '../board/pieces/thudstone_color.png';
import { Piece, PieceType } from '../board/pieces/Piece';
import { useAppSelector, useAppDispatch } from '../../redux/Hooks';
import { useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

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
    const uuid = useAppSelector((state) => state.gameplay.uuid)
    const status = useAppSelector((state) => state.gameplay.status)
    const player1 = useAppSelector((state) => state.gameplay.player1)
    const player2 = useAppSelector((state) => state.gameplay.player2)
    const dispatch = useAppDispatch()

    const board = [];

    let stompClient: any

    useEffect(() => {
        connect();
    }, []);

    const connect = () => {
        var socket = new SockJS('/gameplay');
        stompClient = Stomp.over(socket)
        stompClient.connect({}, function(frame: any) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/mss', function(messageOutput: { body: any; }) {
                console.log(messageOutput.body);
            });
        });
    }

    const showTile = (position: string) => {
        console.log("clicked!");
        stompClient.send('/app/message', {}, JSON.stringify(position));
    };


    for(let i = 0; i < cd.BOARD_SIZE; i++) {
        for(let j = 0; j < cd.BOARD_SIZE; j++) {
            const dimX = cd.HORIZONTAL_AXIS[j];
            const dimY = cd.VERTICAL_AXIS[i];

            board.push(
                //TODO: get rid of styling in main function
                <Grid item style={{'height': '53px'}} key={dimX+dimY} > 
                    { initialPawnsSetup(dimX+dimY, showTile) } 
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

const initialPawnsSetup = (tilePositon: string, activate: (position: string) => void) => {

    if(cd.OUT_OF_BOARD_TILES.includes(tilePositon)) {
        return <EmptySpace />
    } else if(cd.DWARF_STARTING_TILES.includes(tilePositon)) {
        return <Piece 
            type={ PieceType.Dwarf }
            position={tilePositon}
            send={activate}
            key={tilePositon}
            ></Piece>
        } else if (cd.TROLL_STARTING_TILES.includes(tilePositon)) {
            return <Piece 
            type={ PieceType.Troll }
            position={tilePositon}
            send={activate}
            key={tilePositon}
            ></Piece>
        } else if (cd.THUDSTONE_TILE === tilePositon) {
            return <ThudstoneWrapper key={tilePositon} src={ ThudstoneIcon }/>
        } else {
            return <Piece 
            type={ PieceType.Empty }
            position={tilePositon}
            send={activate}
            key={tilePositon}
        ></Piece>
    }  
} 

export default Gameplay;