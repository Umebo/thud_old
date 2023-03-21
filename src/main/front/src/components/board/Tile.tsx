import styled from 'styled-components';
import cd from '../../config.json';

const TileWrapper = styled.div<Pick<TileProps, 'labelColor' | 'tileColor'>>`
width: 49px;
height: 49px;
margin: 2px;
padding-left: 3px;
border-radius: 5px;
color: ${p => p.labelColor};
background-color: ${p => p.tileColor};
`;

const LabelWrapper = styled.div<Pick<TileProps, 'labelColor' | 'labelLeftMargin' | 'labelTopMargin'>>`
position: absolute;
color: ${p => p.labelColor};
margin-top: ${p => p.labelTopMargin}px;
margin-left: ${p => p.labelLeftMargin}px;
background-color: transparent;
`

interface TileProps {
    dimX: string,
    dimY: string,
    tileColor: string
    labelColor?: string
    labelLeftMargin?: number
    labelTopMargin?: number
}

const Tile = ({dimX, dimY, tileColor}: TileProps) => {

    let labelColor = cd.THEME_COLORS.PRIMARY;
    if(!cd.OUT_OF_BOARD_TILES.includes(dimX+dimY)) {
        labelColor = "#cabba7"
    }

    let labelMargin = 0;
    if(dimY.match('^1{1}$')) {
        labelMargin = 29
    }

    return(
        <TileWrapper id={dimX + dimY} tileColor={tileColor} labelColor={labelColor}>
            <div style={{'position': 'absolute'}}>
                {dimX.match('A') && dimY}
            </div>
            <LabelWrapper labelColor={labelColor} labelLeftMargin={labelMargin+4} labelTopMargin={labelMargin}>
                {dimY.match('^1{1}$') && dimX}
            </LabelWrapper>
        </TileWrapper>
    ) 
}

export default Tile;