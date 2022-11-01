import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, FormGroup } from 'reactstrap';
import axios from 'axios';
import styled from 'styled-components';
import configData from "../../../config.json";
import { LoginService, useInput } from '../../../api/api';

const LoginWrapper = styled.div`
    padding: 10px;
    text-align: center;
`;

interface LoginProps {
    signIn: (nickname: any) => any;
    setLogged: (isLogged: boolean) => any;
}

const Login = ({ signIn, setLogged }: LoginProps) => {
    const navigate = useNavigate();

    const [input, setInput] = useInput({
        id: 'nickname_input',
        name: 'nickname',
        placeholder: 'Nickname'
    });
    const [error, setError] = useState('');


    const handleSubmit = (e: any) => {
        e.preventDefault();
        
        //FIXME: //TO NIE DZIAŁA
        // SPRAWDZIĆ JAK ZAIMPLEMENTOWAĆ API
        // LoginService.createNickname('test11');

        // TO DZIAŁA
        axios
            .post(configData.SERVER_URL + 'login',{}, {
                params: {nickname: input}
            })
            .then((response) => {
                setError(response.data);
            })
            .catch((error) => console.log(error.message))

        signIn(input)
        setLogged(true)
        navigate('/')
    }

    return (
        <Card>
            <LoginWrapper>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <FormGroup>
                        {setInput}
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