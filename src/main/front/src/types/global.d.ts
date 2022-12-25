export {};

declare global {

    type Player = {
        nickname: string
        type?: string
    }

    type GameType = {
        UUID: string
        status: string
        player1: Player
        player2?: Player
        board?: string[]
    }
}