import { Card, CardBody, CardText } from "reactstrap";
import styled from "styled-components";

const NicknameWrapper = styled.div`
    margin-top: auto;
`;

interface NicknameProps {
    nickname: string
    isLogged: boolean
}

const Nickname = ({ nickname, isLogged }: NicknameProps) => {

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