import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import styled from 'styled-components';
import { LoginService, useInput } from '../../api/api';

const LoginWrapper = styled.div`
    padding-top: 50px;
    padding-left: 25px;
    padding-right: 25px;
    text-align: center;
    color: red;
`;

const Login = () => {

    const [nickname, nicknameInput] = useInput({
        id: 'nickname_input',
        name: 'nickname',
        placeholder: 'Nickname'
    });
    const [error, setError] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();

        // TO NIE DZIAŁA
        // SPRAWDZIĆ JAK ZAIMPLEMENTOWAĆ API
        // LoginService.createNickname('test11');

        // TO DZIAŁA
        axios
            .post('http://localhost:3000/login',{}, {
                params: {nickname: 'test1000'}
            })
            .then((response) => setError(response.data))
            .catch((error) => console.log(error.message))
    }


    return (
        <LoginWrapper>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <FormGroup>
                    {nicknameInput}
                </FormGroup>
                {' '}
                <Button id='login_bt'>
                    Submit
                </Button>
            </Form>
            <p>{nickname}</p>
        </LoginWrapper>
    )
}

export default Login