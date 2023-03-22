import styled from "styled-components";
import DwarfMove from "./static/dwarf_move.png"
import TrollMove from "./static/troll_move.png"
import BoardImg from "./static/emty_board.png"
import HurlImg from "./static/hurl_example.png"
import ShoveImg from "./static/shove_example.png"

const RulesWrapper = styled.div`
    height: 100%;
    width: 80%;
    padding: 50px;
    overflow-x: auto;
`

const SingleRuleWrapper = styled.div`
    height: 400px;
    display: flex;
    align-items: center;
    margin: 0 0 2rem 0;
    font-size: 1.3rem;
`

const SingleRuleImg = styled.img`
    max-height: 100%;
    max-width: 100%;
    margin: 0 2rem 0 2rem;
`

const Rules = () => {

    return(
        <RulesWrapper id="RulesWrapper">
            <h1 color="white">Thud Rules</h1>
            <SingleRuleWrapper>
                <SingleRuleImg src={BoardImg} alt="" />
                <div>      
                    The octagonal playing area consists of a 15 by 15 square board from which a triangle of 15 squares in each corner has been removed. 
                    The Thudstone is placed on the centre square of the board, where it remains for the entire game and may not be moved onto or through. 
                    The eight trolls are placed onto the eight squares adjacent to the Thudstone and the thirty-two dwarfs are placed so as to occupy 
                    all the perimeter spaces except for the four in the same horizontal or vertical line as the Thudstone.
                    One player takes control of the dwarfs, the other controls the trolls. The dwarfs move first.
                </div>
            </SingleRuleWrapper>
            <h2>How to move</h2>
            <SingleRuleWrapper>
                <div>
                    Any one dwarf is moved like a chess queen, 
                    any number of squares in any orthogonal or diagonal direction, 
                    but not onto or through any other piece, whether Thudstone, dwarf or troll.
                    Dwarfs are not able to capture troll via normal move.
                </div>
                <SingleRuleImg src={DwarfMove} alt="" />
            </SingleRuleWrapper>
            <SingleRuleWrapper>
                <SingleRuleImg src={TrollMove} alt=""></SingleRuleImg>
                <div>
                    Any one troll is moved like a chess king, 
                    one square in any orthogonal or diagonal direction onto an empty square. 
                    After the troll has been moved, any (all) dwarfs on the eight squares 
                    adjacent to the moved troll may optionally be immediately captured 
                    and removed from the board, at the troll player's discretion.
                </div>
            </SingleRuleWrapper>
            <h2>Hurl and Shove</h2>
            <SingleRuleWrapper>
                <div>
                    <h3>Hurl</h3>
                    Anywhere there is a straight (orthogonal or diagonal) line of adjacent dwarfs on the board, 
                    they may hurl the front dwarf in the direction continuing the line, as long as the space between the lead dwarf and the troll 
                    is less than the number of dwarfs in the line. This is different from a normal move in that the dwarf is permitted to land on a square containing a troll, 
                    in which case the troll is removed from the board and the dwarf takes his place. This may only be done if the endmost dwarf can landon a troll 
                    by moving in the direction of the line at most as many spaces as there are dwarfs in the line. 
                    Since a single dwarf is a line of one in any direction, a dwarf may always move one space to capture a troll on an immediately adjacent square.
                </div>
                <SingleRuleImg src={HurlImg} alt="" />
            </SingleRuleWrapper>
            <SingleRuleWrapper>
                <SingleRuleImg src={ShoveImg} alt=""></SingleRuleImg>
                <div>
                <h3>Shove</h3>
                Anywhere there is a straight (orthogonal or diagonal) line of adjacent trolls on the board, 
                they may shove the endmost troll in the direction continuing the line, up to as many spaces as there are trolls in the line. 
                As in a normal move, the troll may not land on an occupied square, and any (all) dwarfs in the eight squares adjacent to its final position 
                may immediately be captured. Trolls may only make a shove if by doing so they capture at least one dwarf.
                </div>
            </SingleRuleWrapper>
            <SingleRuleWrapper>
                <div>
                <h3>Endgame</h3>
                The battle is over when both players agree that no more captures can be made by continuing to play, or when one player has no more valid moves to make.
                At this point the players count score: the dwarfs score 1 point for each surviving dwarf, 
                and the trolls score 4 for each remaining troll, with the difference being the 'final' score. 
                The players should then swap sides to play another round, and the sum of their final scores for the two battles determines the overall victor.
                </div>
            </SingleRuleWrapper>
        </RulesWrapper>
    );
}

export default Rules