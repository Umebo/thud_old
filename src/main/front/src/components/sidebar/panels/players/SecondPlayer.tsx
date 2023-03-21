import { Card, CardBody, CardText } from "reactstrap";
import { useAppSelector } from "../../../../redux/Hooks";

const SecondPlayer = () => {
    const nickname = useAppSelector((state) => state.login.nickname);
    const gameStatus = useAppSelector((state) => state.gameplay.status);
    const firstPlayer = useAppSelector((state) => state.gameplay.dwarfPlayer);
    const secondPlayer = useAppSelector((state) => state.gameplay.trollPlayer);

    if(gameStatus === "IN_PROGRESS") {
        return(
            <Card id="second_player">
                <CardBody>
                    <CardText>
                        {firstPlayer === nickname 
                            ? "Playing with: " + secondPlayer
                            : "Playing with: " + firstPlayer
                        }
                    </CardText>
                </CardBody>
            </Card>
        );
    }
    return <></>
}

export default SecondPlayer;