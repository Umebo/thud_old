import React from 'react';
import styled from 'styled-components';
import Tile from './Tile';

const RowStyle = styled.div`
    place-content: center;
`;

const boardWidth = 15;
const verticalAxis =["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"];
const horizontalAxis = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O"];
const rowLengths = [5, 7, 9, 11, 13, 15, 15, 15, 15, 15, 13, 11, 9, 7, 5];

type RowProps = {
    rowNo: number;
} 

class Row extends React.Component<RowProps> {

    renderRow() {
        for(let i = 0; i < boardWidth; i++) {
            for(let j = 0; j < rowLengths[i]; j++) {
                let row = [];
                let verticalDim = (boardWidth - rowLengths[i]) / 2;
                row.push(<Tile dimX={verticalAxis[i]} dimY='b' ></Tile>);
            }
        }

        return(
            <RowStyle>{this.props.rowNo}</RowStyle>
        )
    }
}

export default Row;