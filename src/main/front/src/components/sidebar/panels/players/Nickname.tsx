import { Card, CardBody, CardText } from "reactstrap";
import { useAppSelector } from "../../../../redux/Hooks";

const Nickname = () => {
    const nickname = useAppSelector((state) => state.login.nickname);
    const isLogged = useAppSelector((state) => state.login.isLogged);

    if(isLogged) {
        return(
            <Card id="nickname">
                <CardBody>
                    <CardText>
                        Logged as: { nickname }
                    </CardText>
                </CardBody>
            </Card>
        );
    }
    return <></>
}

export default Nickname;