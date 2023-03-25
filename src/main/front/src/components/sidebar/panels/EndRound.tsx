import { Button } from "reactstrap";
import styled from "styled-components";
import { useAppSelector } from "../../../redux/Hooks";

const EndRoundBtnWrapper = styled.div`
    display: flex;
    padding: 20px;
    justify-content: center;
`

const EndRound = () => {
    const gameStatus = useAppSelector((state) => state.gameplay.status);

    if(gameStatus === "IN_PROGRESS") {
        return(
            <EndRoundBtnWrapper>
                <Button id="endround_btn">Suggest end of round</Button>
            </EndRoundBtnWrapper>
        );
    }
    return <></>;
}

export default EndRound;