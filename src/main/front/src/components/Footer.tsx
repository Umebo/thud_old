import styled from "styled-components"

const FooterWrapper= styled.footer`
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;

    text-align: right;
    align-items: center;
    background-color: #2C3639;
`;

const FooterContent = styled.h3`
    font-family: 'Rubik Mono One';
    color: #A27B5C;
    padding-right: 1rem;
`;

const Footer = () => {
    return(
        <FooterWrapper>
            <FooterContent>
                Igor Niemiec | WSZiB, 2022
            </FooterContent>
        </FooterWrapper>
    );
}

export default Footer;