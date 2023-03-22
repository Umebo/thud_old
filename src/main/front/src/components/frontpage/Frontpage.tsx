import styled from "styled-components";
import FrontPage from "./static/main.png"

const FrontPageWrapper = styled.div`
    height: 100%;
    width: 100%;
`

const FrontPageImg = styled.img`
    max-width: 100%;
`

const Rules = () => {

    return(
        <FrontPageWrapper>
            <FrontPageImg src={FrontPage} alt="" />
        </FrontPageWrapper>
    );
}

export default Rules