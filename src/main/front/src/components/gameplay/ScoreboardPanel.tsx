import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import styled from "styled-components";
import { useAppSelector } from "../../redux/Hooks";

const ScoreboardWrapper = styled.div`
    display: flex;
    font-size: 1.3rem;
`

const ScoreboardColumn = styled.div`
    display: flex;
    padding-top: 5px;
    border-radius: 10px;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
`

const ScoreboardPanel = () => {
    const firstPlayer = useAppSelector((state) => state.gameplay.dwarfPlayer);
    const secondPlayer = useAppSelector((state) => state.gameplay.trollPlayer);
    const dwarfPlayerPoints = useAppSelector((state) => state.gameplay.dwarfPlayerPointsRound1);
    const trollPlayerPoints = useAppSelector((state) => state.gameplay.trollPlayerPointsRound1);
    const currentRound = useAppSelector((state) => state.gameplay.currentRound);

    return(
        <Card id="scoreboard">
            <CardTitle id="scoreboard_title">Scoreboard</CardTitle>
            <CardBody>
                <ScoreboardWrapper>
                    <ScoreboardColumn id="players_column">
                        <CardText>round</CardText>
                        <CardText>{ firstPlayer }:</CardText>
                        <CardText>{ secondPlayer }:</CardText>
                    </ScoreboardColumn>
                    <ScoreboardColumn className={"round_column_" + (currentRound === 1 ? "show" : "hide")}>
                        <CardText>1</CardText>
                        <CardText>{ dwarfPlayerPoints }</CardText>
                        <CardText>{ trollPlayerPoints }</CardText>
                    </ScoreboardColumn>
                    <ScoreboardColumn className={"round_column_" + (currentRound === 2 ? "show" : "hide")}>
                        <CardText>2</CardText>
                        <CardText>{ trollPlayerPoints }</CardText>
                        <CardText>{ dwarfPlayerPoints }</CardText>
                    </ScoreboardColumn>
                </ScoreboardWrapper>
            </CardBody>
        </Card>
    );
}

export default ScoreboardPanel;