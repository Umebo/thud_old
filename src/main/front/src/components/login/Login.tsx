import axios from 'axios';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, 
        Modal, ModalHeader, ModalBody } from 'reactstrap';
import { LOGIN } from './LoginSlice';
import { useInput } from '../../api/api';
import { useAppDispatch } from "../../redux/Hooks";
import cd from "../../config.json";

const LoginWrapper = styled.div`
    padding: 10px;
    text-align: center;
`;

const LoginModal = {
    'fontFamily': 'Kalam',
    'color': cd.LOGIN_COLORS.FONT,
    'backgroundColor': cd.LOGIN_COLORS.BACKGORUND,
}

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [input, setInput] = useInput({
        id: 'nickname_input',
        name: 'nickname',
        placeholder: 'Nickname',
    });

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    useEffect(() => {
        toggle();
    }, []);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        
        //FIXME: //TO NIE DZIAŁA
        // SPRAWDZIĆ JAK ZAIMPLEMENTOWAĆ API
        // LoginService.createNickname('test11');

        //TODO: // TO DZIAŁA ale trzeba zmienić
        axios
            .post(cd.SERVER_URL + '/login', {}, { params: {
                nickname: input
            }})
            .then((response) => {
                dispatch(LOGIN({
                    nickname: response.data.nickname
                }))
            })
        navigate('/')
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} style={LoginModal}>Log in</ModalHeader>
            <ModalBody style={LoginModal}>
                <LoginWrapper>
                    <Form id='loginForm' onSubmit={(e) => handleSubmit(e)}>
                        <FormGroup>
                            {setInput}
                        </FormGroup>
                        {' '}
                        <Button id='login_btn'>
                            Submit
                        </Button>
                    </Form>
                </LoginWrapper>
            </ModalBody>
        </Modal>
    )
}

export default Login