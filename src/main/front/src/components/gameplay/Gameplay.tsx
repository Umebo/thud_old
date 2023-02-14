import { Grid } from '@mui/material';
import { Stomp } from '@stomp/stompjs';
import { useEffect } from 'react';
import SockJS from 'sockjs-client';
import styled from 'styled-components';
import cd from '../../config.json';
import ThudstoneIcon from '../board/pieces/static/thudstone_color.png';
import { Piece, PieceType } from '../board/pieces/Piece';

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
            stompClient.subscribe('/topic/mss', onMessage);
        });
    }

    const onMessage = (message: any) => {
        console.log(message.body);
    }

    const showTile = (position: string) => {
        stompClient.send('/app/message', {}, position);
    };

    const initialPawnsSetup = (tilePositon: string) => {

        if(cd.OUT_OF_BOARD_TILES.includes(tilePositon)) {
            return <EmptySpace />
        } else if(cd.DWARF_STARTING_TILES.includes(tilePositon)) {
            return <Piece 
                initialType={ PieceType.Dwarf }
                position={tilePositon}
                send={showTile}
                key={tilePositon}
                ></Piece>
            } else if (cd.TROLL_STARTING_TILES.includes(tilePositon)) {
                return <Piece 
                initialType={ PieceType.Troll }
                position={tilePositon}
                send={showTile}
                key={tilePositon}
                ></Piece>
            } else if (cd.THUDSTONE_TILE === tilePositon) {
                return <ThudstoneWrapper key={tilePositon} src={ ThudstoneIcon }/>
            } else {
                return <Piece 
                initialType={ PieceType.Empty }
                position={tilePositon}
                send={showTile}
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
                <Grid item style={{'height': '53px'}} key={dimX+dimY} > 
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

/* const initialPawnsSetup = (tilePositon: string, activate: showTile) => {

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
}  */

export default Gameplay;