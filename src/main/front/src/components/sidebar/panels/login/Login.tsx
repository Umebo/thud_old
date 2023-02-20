import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, FormGroup } from 'reactstrap';
import axios from 'axios';
import styled from 'styled-components';
import configData from "../../../../config.json";
import { LOGIN } from './LoginSlice';
import { useInput } from '../../../../api/api';
import { useAppDispatch } from "../../../../redux/Hooks";

const LoginWrapper = styled.div`
    padding: 10px;
    text-align: center;
`;

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [input, setInput] = useInput({
        id: 'nickname_input',
        name: 'nickname',
        placeholder: 'Nickname'
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        
        //FIXME: //TO NIE DZIAŁA
        // SPRAWDZIĆ JAK ZAIMPLEMENTOWAĆ API
        // LoginService.createNickname('test11');

        //TODO: // TO DZIAŁA ale trzeba zmienić
        axios
            .post(configData.SERVER_URL + '/login', {}, { params: {
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