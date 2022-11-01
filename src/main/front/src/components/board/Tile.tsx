import styled from 'styled-components';

const TileWrapper = styled.div<TileProps>`
width: 49px;
height: 49px;
margin: 2px;
border-radius: 5px;
background-color: ${(p) => p.tileColor};
text-align: center;
color: white;
`;

interface TileProps {
    dimX?: string,
    dimY?: string,
    tileColor: string
}

const Tile = (props: TileProps) => {

    return(
        <TileWrapper tileColor={props.tileColor}>
            {/* {props.dimX}{props.dimY} */}
        </TileWrapper>
    ) 
}

export default Tile;