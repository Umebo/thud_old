import Tile from './Tile';
import styled from 'styled-components';
import cd from '../../config.json';
import { Grid } from '@mui/material';

const BoardWrapper = styled.div`
    position: absolute;
    padding: 30px;
    width: 855px;
`;

const Board = () => {
    const board = [];

    for(let i = 0; i < cd.BOARD_SIZE; i++) {
        for(let j = 0; j < cd.BOARD_SIZE; j++) {
            const dimX = cd.HORIZONTAL_AXIS[j]
            const dimY = cd.VERTICAL_AXIS[i]

            board.push(
                <Grid item key={dimX+dimY}>
                    <Tile
                        tileColor={generateTileColor(i, j)}
                        dimX={dimX} 
                        dimY={dimY}
                    />
                </Grid>
            );
        }
    }

    return (
        <BoardWrapper>
            <Grid container>
                { board }
            </Grid>
        </BoardWrapper>
    )
}

const generateTileColor = (row: number, col: number) => {
    let tilePosition = cd.HORIZONTAL_AXIS[row] + cd.VERTICAL_AXIS[col];

    if(cd.OUT_OF_BOARD_TILES.includes(tilePosition) || cd.THUDSTONE_TILE === tilePosition) {
        return cd.TILES_COLORS.BACKGROUND
    } else if((row + col) % 2 !== 0) {
        return cd.TILES_COLORS.DARKER
    } else {
        return cd.TILES_COLORS.BRIGHTER
    }
}

export default Board;