import Tile from './Tile';
import styled from 'styled-components';
import configData from '../../config.json';
import SockJsClient from 'react-stomp';
import axios from 'axios';
import { Button } from 'reactstrap';
import { Grid } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

const BoardWrapper = styled.div`
    padding: 30px;
    width: 855px;
    flex-shrink: 0;
`;

const boardSize = 15;
const verticalAxis =["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"].reverse();
const horizontalAxis = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O"];
const rowLengths = [5, 7, 9, 11, 13, 15, 15, 15, 15, 15, 13, 11, 9, 7, 5];

const Board = () => {
    const [pawnsLocations, setPawnsLocations] = useState<number[][]>();
    const [text, setText] = useState<string>('x'); 

    const board = [];

    for(let i = 0; i < boardSize; i++) {
        for(let j = 0; j < boardSize; j++) {
            const dimX = horizontalAxis[j]
            const dimY = verticalAxis[i]

            board.push(
                <Grid item>
                    <Tile
                        key={dimX+dimY}
                        tileColor={generateTileColor(i, j)}
                        dimX={dimX} 
                        dimY={dimY}
                    />
                </Grid>
            );
        }
    }

    let onMessageReceived = (msg: any) => {
        setText(msg.message)
    }

    const postText = () => {
        axios
            .post(configData.SERVER_URL + '/gameplay/send',{
                message: 'test_1'
            })
            .then((response) => {
                // setError(response.data)
                console.log(response.data);
                
            })
            .catch((error) => console.log(error.message));
    }

    return (
        <BoardWrapper>
            <Grid container>
                {board}
            </Grid>
            <div>
                <Button onClick={() => postText()} >Change text</Button>
                <h2>text: { text }</h2>
            </div>
            <SockJsClient 
                url={ configData.SOCKET_URL }
                topics={ ['/topic/app'] }
                onConnect={ console.log("Connected!") }
                onMessage={(msg: any) => onMessageReceived(msg)}
                debug={ false }
            />
        </BoardWrapper>
    )
}

const generateTileColor = (row: number, col: number) => {
    let dimSum = horizontalAxis[row] + verticalAxis[col];
    let verticalDim = (boardSize - rowLengths[row]) / 2;

    if(configData.OUT_OF_BOARD_TILES.includes(dimSum)) {
        return configData.TILES_COLORS.BACKGROUND
    } else if((verticalDim + row + col) % 2 !== 0) {
        return configData.TILES_COLORS.DARKER
    } else {
        return configData.TILES_COLORS.BRIGHTER
    }
}

const generateStartingPawns = (pawnsLocations: number[][]) => {
    return pawnsLocations
}

export default Board;