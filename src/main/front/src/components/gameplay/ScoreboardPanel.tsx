import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import { useAppSelector } from "../../redux/Hooks";

const ScoreboardPanel = () => {
    const firstPlayer = useAppSelector((state) => state.gameplay.dwarfPlayer);
    const secondPlayer = useAppSelector((state) => state.gameplay.trollPlayer);
    const dwarfPlayerPoints = useAppSelector((state) => state.gameplay.dwarfPlayerPoints);
    const trollPlayerPoints = useAppSelector((state) => state.gameplay.trollPlayerPoints);

    return(
        <Card id="scoreboard">
            <CardBody>
                <CardTitle>Scoreboard</CardTitle>
                <CardText>{ firstPlayer }: { dwarfPlayerPoints }</CardText>
                <CardText>{ secondPlayer }: { trollPlayerPoints }</CardText>
            </CardBody>
        </Card>
    );
}

export default ScoreboardPanel;