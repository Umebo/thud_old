import cd from '../../../config.json'
import axios from "axios";
import { Button, Card, CardBody, CardHeader, List } from "reactstrap"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../../redux/Hooks';
import { CREATE, JOIN } from '../../gameplay/GameplaySlice';

const NewGame = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const nickname = useAppSelector((state) => state.login.nickname);

    const [gameList, setGameList] = useState(new Map());

    useEffect(() => {
        getExistingGames();
        console.log(gameList);
    }, []);

    const getExistingGames = () => {
        axios
            .get(cd.SOCKET_URL + '/all', {})
            .then((response) => {
                setGameList(new Map(Object.entries(response.data)))
            })
            .catch((error) => console.log(error.message));
    }
    
    const createNewGame = () => {
        axios
            .post(cd.SERVER_URL + '/gameplay/new', null, { params: {
                    nickname: nickname
                }})
            .then((response) => {
                console.log(response.data);
                dispatch(CREATE( {
                    uuid: response.data.uuid,
                    status: response.data.status,
                    player1: response.data.player.nickname,
                } ))

                navigate("/gameplay/" + response.data.uuid);
            })
            .catch((error) => console.log(error.message));
    }

    const joinToGame = (uuid: string) => {
        axios
            .put(cd.SERVER_URL + '/gameplay/join', null, { params: {
                nickname: nickname,
                uuid: uuid
            }})
            .then((response) => {
                dispatch(JOIN( {
                    uuid: uuid,
                    status: response.data.status,
                    player1: nickname,
                    player2: response.data.player1
                }))
            })
        
        navigate("/gameplay/" + uuid);
    }

    const createButtonsFromGameList = (gameList: Map<string, string>) => {
        if (gameList.size > 0) {
            const games: any = []
            gameList.forEach((player: string, uuid: string) => {
                games.push(
                    <li key={uuid}>
                        <Button onClick={() => joinToGame(uuid)}> 
                            {player} 
                        </Button>
                    </li>
                )
            });
            return games;
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
                <CardHeader>
                    Join to existing game
                </CardHeader>
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