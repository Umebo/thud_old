import cd from '../../../config.json'
import axios from "axios";
import { Button, Card, CardBody, CardHeader, List } from "reactstrap"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../../redux/Hooks';
import { CREATE, JOIN } from '../../gameplay/GameplaySlice';
import styled from 'styled-components';

const NewGameWrapper = styled.div`
    margin-top: 40px;
    padding: 20px;
    display: flex;
    flex: 0;
    flex-direction: column;
    align-items: center;
`

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
            .get(cd.GAMEPLAY_URL + '/all', {})
            .then((response) => {
                setGameList(new Map(Object.entries(response.data)))
            })
            .catch((error) => console.log(error.message));
    }
    
    const createNewGame = () => {
        axios
            .post(cd.GAMEPLAY_URL + '/new', null, { params: {
                    nickname: nickname
                }})
            .then((response) => {
                console.log(response.data);
                dispatch(CREATE( {
                    uuid: response.data.uuid,
                    status: response.data.status,
                    nickname: response.data.firstPlayer.nickname,
                } ))

                navigate("/gameplay/" + response.data.uuid);
            })
            .catch((error) => console.log(error.message));
    }

    const joinToGame = (uuid: string) => {
        axios
            .put(cd.GAMEPLAY_URL + '/join', null, { params: {
                nickname: nickname,
                uuid: uuid
            }})
            .then((response) => {
                console.log(response.data);
                
                dispatch(JOIN( {
                    uuid: uuid,
                    status: response.data.status,
                    firstPlayer: response.data.firstPlayer.nickname,
                    secondPlayer: nickname,
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
        <NewGameWrapper>
            <Card>
                <Button id='newgame_btn' onClick={() => createNewGame()}>
                    Create new game
                </Button>
            </Card>
            <div>
                <h3>OR</h3>
            </div>
            <Card style={{'width': '500px'}}>
                <CardHeader>
                    Join to existing game
                </CardHeader>
                <CardBody>
                    <List>
                        { createButtonsFromGameList(gameList) }
                    </List>
                </CardBody>
            </Card>
        </NewGameWrapper>
    )
}

export default NewGame;