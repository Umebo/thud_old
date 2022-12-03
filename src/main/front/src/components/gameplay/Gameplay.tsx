import { Grid } from '@mui/material';
import { useEffect } from 'react';
import SockJsClient from 'react-stomp';
import styled from 'styled-components';
import cd from '../../config.json';
import ThudstoneIcon from '../board/pieces/thudstone_color.png';
import { Piece, PieceType } from '../board/pieces/Piece';
import { Button } from 'reactstrap';

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

interface GameplayProps {
    uuid: string
    status: string
    player1: string
    player2?: string
}

const Gameplay = ({
    uuid, 
    status, 
    player1, 
}: GameplayProps) => {

    const board = [];

    for(let i = 0; i < cd.BOARD_SIZE; i++) {
        for(let j = 0; j < cd.BOARD_SIZE; j++) {
            const dimX = cd.HORIZONTAL_AXIS[j];
            const dimY = cd.VERTICAL_AXIS[i];

            board.push(
                //TODO: get rid of styling in main function
                <Grid item style={{'height': '53px'}}> 
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
            <SockJsClient 
                    url={ cd.SOCKET_URL }
                    topics={ [cd.SOCKET_TOPIC] }
                    onConnect={ console.log({ player1 } + " connected!") }
                    onMessage={(msg: any) => onMessageReceived(msg)}
                    debug={ false }
            />
        </GameplayWrapper>
    )
}

const onMessageReceived = (msg: any) => {
    console.log(msg.message);
}

const initialPawnsSetup = (tilePositon: string) => {

    if(cd.OUT_OF_BOARD_TILES.includes(tilePositon)) {
        return <EmptySpace />
    } else if(cd.DWARF_STARTING_TILES.includes(tilePositon)) {
        return <Piece type={ PieceType.Dwarf }></Piece>
    } else if (cd.TROLL_STARTING_TILES.includes(tilePositon)) {
        return <Piece type={ PieceType.Troll }></Piece>
    } else if (cd.THUDSTONE_TILE == tilePositon) {
        return <ThudstoneWrapper src={ ThudstoneIcon }/>
    } else {
        return <Piece type={ PieceType.Empty }></Piece>
    }  
} 

export default Gameplay;