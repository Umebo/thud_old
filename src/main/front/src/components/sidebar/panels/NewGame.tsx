import cd from '../../../config.json'
import { useInput } from "../../../api/api";
import axios from "axios";
import styled from "styled-components"
import { Button, Card, CardBody, CardHeader, List } from "reactstrap"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NewGameWrapper = styled.div`
    display: flex;
    flex-dirction: column;
`;

interface GameProps {
    nickname: string
}

const NewGame = ({nickname}: GameProps) => {
    const [input, setInput] = useInput({
        id: 'uuid_input',
        name: 'uuid',
        placeholder: 'UUID'
    });
    const [gameList, setGameList] = useState<GameType[]>();

    const navigate = useNavigate();
    
    useEffect(() => {
        setGameList(getExistingGames());
    }, []);
    
    const createNewGame = () => {
        axios
            .post(cd.SERVER_URL + '/gameplay/new',{
                nickname: 'test'
            },{})
            .then((response) => {
                console.log(response.data);
                // navigate("/gameplay/" + response.data.uuid);
                navigate("/gameplay/test_path");
            })
            .catch((error) => console.log(error.message));
    }

    const createButtonsFromGameList = (gameList?: GameType[]) => {
        if (!!gameList) {
            gameList.forEach((element: GameType) => {
                return <Button> X </Button>
            });
        }
        else {
            return <div>There is no active games</div>
        }
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
                    <List>
                        { createButtonsFromGameList(gameList) }
                    </List>
                </CardBody>
            </Card>
        </>
    )
}

export default NewGame;

/* const createNewGame = () => {
    const navigate = useNavigate();
    
    axios
        .post(cd.SERVER_URL + '/gameplay/new',{
            nickname: 'test'
        },{})
        .then((response) => {
            console.log(response.data);
            // navigate("/gameplay/" + response.data.uuid);
            navigate("/gameplay/test_path");
        })
        .catch((error) => console.log(error.message));
} */

const getExistingGames = () => {
    const gameList: GameType[] = [];

    axios
        .get(cd.SOCKET_URL + '/all', {})
        .then((response) => {
            gameList.push(
                response.data
            )
            console.log(response.data);
        })
        .catch((error) => console.log(error.message));

    return gameList;
}