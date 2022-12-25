import { Card, CardBody, CardText } from "reactstrap";
import styled from "styled-components";
import { useAppSelector } from "../../../../redux/Hooks";

const NicknameWrapper = styled.div`
    margin-top: auto;
`;

const Nickname = () => {
    const nickname = useAppSelector((state) => state.login.nickname);
    const isLogged = useAppSelector((state) => state.login.isLogged);

    if(isLogged) {
        return(
            <NicknameWrapper>
                <Card id="nickname">
                    <CardBody>
                        <CardText>
                            Logged as: { nickname }
                        </CardText>
                    </CardBody>
                </Card>
            </NicknameWrapper>
        );
    }
    return <></>
}

export default Nickname;