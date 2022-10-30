import axios from 'axios';
import React, {useState, useEffect} from 'react';
import configData from "../../config.json";
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardHeader, Form, FormGroup, Input, Label } from 'reactstrap';
import styled from 'styled-components';
import { LoginService, useInput } from '../../api/api';

const LoginWrapper = styled.div`
    padding: 10px;
    text-align: center;
`;

const Login = () => {
    const navigate = useNavigate();

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
                params: {nickname: nickname}
            })
            .then((response) => {
                setError(response.data);
                navigate('/');
            })
            .catch((error) => console.log(error.message))
    }

    return (
        <Card>
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
            </LoginWrapper>
        </Card>
    )
}

export default Login