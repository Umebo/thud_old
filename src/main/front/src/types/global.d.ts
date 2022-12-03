export {};

declare global {

    type Player = {
        nickname: string;
    }

    type GameType = {
        UUID: string
        status: string
        player1: string
        player2: string
        board: string[]
    }
}