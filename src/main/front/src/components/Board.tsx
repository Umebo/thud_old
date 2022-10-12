import React from 'react';
import Tile from './Tile';
import styled from 'styled-components';
import Row from './Row';
import { type } from 'os';

const BoardStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 500px;
    height: 500px;
    background-color: #758f57;
    margin: 10px;
`;

const boardSize = 15;
const verticalAxis =["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"];
const horizontalAxis = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O"];
const rowLengths = [5, 7, 9, 11, 13, 15, 15, 15, 15, 15, 13, 11, 9, 7, 5];

type BoardProps = {
    boardSize: number;
    verticalAxis: string[];
    horizontalAxis: string[];
    rowLengths: number[];
}

class Board extends React.Component {

    renderRow = () => {

        for(let i = 0; i < boardSize; i++) {
            for(let j = 0; j < rowLengths[i]; j++) {
                let row = [];
                let verticalDim = (boardSize - rowLengths[i]) / 2;
                row.push(<Tile dimX={verticalAxis[i]} dimY='b' ></Tile>);
            }
        }
    }

    render() {
        return(
            <BoardStyle className='board'>
            {board}
            </BoardStyle>
        );
    }
}


/* 
const Board = () => {
    let board = [];

    for(let i = 0; i < boardSize; i++) {
        for(let j = 0; j < rowLengths[i]; j++) {
            let verticalDim = (boardSize - rowLengths[i]) / 2;
            board.push(Row());
        }
    }

    return (
        
        <BoardStyle className='board'>
            {board}
        </BoardStyle>
    )
}
 */
export default Board;