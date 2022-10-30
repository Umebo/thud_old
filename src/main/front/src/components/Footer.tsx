import styled from "styled-components";
import configData from "../config.json";
import { BsGithub } from "react-icons/bs";

const FooterWrapper= styled.footer`
    position: fixed;
    left: 0;
    bottom: 0;
    height: 30px;
    width: 100%;
    padding-left: 10px;
    
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${configData.THEME_COLORS.PRIMARY};
`;

const FooterContent = styled.h6`
    margin: 0;
    padding-right: 10px;
    color: ${configData.THEME_COLORS.FONT};
`;
    
const GithubIconStyle = {
    'color': configData.THEME_COLORS.FONT,
}

const Footer = () => {
    return(
        <FooterWrapper>
            <a href='https://github.com/Umebo/thud'
                target='_blank'
                rel= 'noopener noreferrer'>
                <BsGithub style={GithubIconStyle}/>
            </a>
            <FooterContent>
                Igor Niemiec | WSZiB, 2022
            </FooterContent>
        </FooterWrapper>
    );
}

export default Footer;