import { Card, CardBody, CardText } from "reactstrap";
import { useAppSelector } from "../../../../redux/Hooks";

const SecondPlayer = () => {
    const gameStatus = useAppSelector((state) => state.gameplay.status);
    const secondPlayer = useAppSelector((state) => state.gameplay.player2);

    if(gameStatus === "IN_PROGRESS") {
        return(
            <Card id="second_player">
                <CardBody>
                    <CardText>
                        Playing with: { secondPlayer }
                    </CardText>
                </CardBody>
            </Card>
        );
    }
    return <></>
}

export default SecondPlayer;