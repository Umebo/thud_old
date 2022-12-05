import cd from '../../../config.json'
import { useInput } from "../../../api/api";
import axios from "axios";
import styled from "styled-components"
import { Button, Card, CardBody, CardHeader, List } from "reactstrap"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../../redux/Hooks';
import { CREATE } from '../../gameplay/GameplaySlice';
import { unstable_useId } from '@mui/material';

const NewGameWrapper = styled.div`
    display: flex;
    flex-dirction: column;
`;

interface GameProps {
    nickname: string
}

const NewGame = ({nickname}: GameProps) => {
    const uuid = useAppSelector((state) => state.gameplay.uuid)
    const dispatch = useAppDispatch();

    const [gameList, setGameList] = useState<GameType[]>([]);

    const navigate = useNavigate();
    
    useEffect(() => {
        getExistingGames();
        console.log(gameList);
    }, []);

    const getExistingGames = () => {
    debugger
        axios
            .get(cd.SOCKET_URL + '/all', {})
            .then((response) => {
                console.log(response.data);
                console.log(response.data.gameplayDTOList?.[0]);
                
                const list: GameType[] = response.data.gameplayDTOList;
                console.log(list);
                
                // setGameList(gameList => [...gameList, list])
                console.log(gameList);
                
            })
            .catch((error) => console.log(error.message));
    }
    
    const createNewGame = () => {
        axios
            .post(cd.SERVER_URL + '/gameplay/new',{
                nickname: 'test'
            })
            .then((response) => {
                console.log(response.data);
                const newGame: GameType = response.data;
                console.log(newGame)
                dispatch({ 
                    type: CREATE, 
                    uuid: response.data?.uuid,
                    status: response.data?.status,
                    player1: response.data?.player.nickname
                })

/*                 let newGame: GameType[] = [
                    response.data.uuid,
                    response.data.status,
                    response.data.player1
                ]

                setGameList(gameList.concat(newGame)); */
                // navigate("/gameplay/" + response.data.uuid);
                navigate("/gameplay/test_path");
            })
            .catch((error) => console.log(error.message));
    }

    const createButtonsFromGameList = (gameList: GameType[]) => {
        if (!gameList.length) {
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
                        {/* { createButtonsFromGameList(gameList) } */}
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
    let gameList: any = [];
debugger
    axios
        .get(cd.SOCKET_URL + '/all', {})
        .then((response) => {
            console.log(response.data);
            
            gameList = response.data
        })
        .catch((error) => console.log(error.message));

    return gameList;
}