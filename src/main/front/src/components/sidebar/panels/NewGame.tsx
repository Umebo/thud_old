import axios from "axios";
import { Button, Card, CardBody, CardHeader, Form, FormGroup } from "reactstrap"
import styled from "styled-components"
import configData from '../../../config.json'
import { useInput } from "../../../api/api";

const NewGameWrapper = styled.div`
    display: flex;
    flex-dirction: column;
`;

const NewGame = () => {
    const [input, setInput] = useInput({
        id: 'uuid_input',
        name: 'uuid',
        placeholder: 'UUID'
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        
        //FIXME: tak jak w Login.tsx
        axios
            .post(configData.SERVER_URL + '/gameplay/join',{}, {
                params: {uuid: input}
            })
            .then((response) => setError(response.data))
            .catch((error) => console.log(error.message))
    }

    const createNewGame = () => {
        axios
            .post(configData.SERVER_URL + '/gameplay/new',{},{})
            .then((response) => {
                // setError(response.data)
                console.log(response.data);
                
            })
            .catch((error) => console.log(error.message));
    }

    return(
        <>
            <Card>
                <Button onClick={() => createNewGame()}>
                    Create new game
                </Button>
            </Card>
            <Card>
                <CardHeader>Join to existing game</CardHeader>
                <CardBody>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <FormGroup>
                            {setInput}
                        </FormGroup>
                        {' '}
                        <Button id='join_game_bt'>
                            Join
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </>
    )
}

export default NewGame

function setError(data: any) {
    throw new Error("Function not implemented.");
}
