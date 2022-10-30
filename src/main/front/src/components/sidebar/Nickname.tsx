import { Card, CardBody, CardText } from "reactstrap";
import styled from "styled-components";

const NicknameWrapper = styled.div`
    align-content: bottom;
`;

const Nickname = () => {

    const isLogged = true;

    if(isLogged) {
        return(
            <NicknameWrapper>
                <Card>
                    <CardBody>
                        <CardText>
                            Logged as: nickname
                        </CardText>
                    </CardBody>
                </Card>
            </NicknameWrapper>
        );
    }
    return <></>
}

export default Nickname;