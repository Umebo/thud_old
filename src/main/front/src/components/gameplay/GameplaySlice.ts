import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// import { PieceType } from "../board/pieces/Piece"

interface GameplayState {
    uuid: string
    status: string
    myFraction: string
    currentTurn: string
    currentRound: number
    dwarfPlayer: string
    trollPlayer: string
    dwarfPlayerPointsRound1: number
    trollPlayerPointsRound1: number
    dwarfPlayerPointsRound2: number
    trollPlayerPointsRound2: number
}

const initialState: GameplayState = {
    uuid: "",
    status: "",
    myFraction: "",
    currentTurn: "",
    currentRound: 1,
    dwarfPlayer: "",
    trollPlayer: "",
    dwarfPlayerPointsRound1: 0,
    trollPlayerPointsRound1: 0,
    dwarfPlayerPointsRound2: 0,
    trollPlayerPointsRound2: 0,
}

export const gameplaySlice = createSlice({
    name: 'gameplay',
    initialState,
    reducers: {
        CREATE: (state, action: PayloadAction<{ 
            uuid: string
            status: string
            nickname: string 
        }>) => {
            state.uuid = action.payload.uuid
            state.status = action.payload.status
            state.dwarfPlayer = action.payload.nickname
            state.myFraction = "Dwarf"
            state.currentTurn = "Dwarf"
        },
        JOIN: (state, action: PayloadAction<{ 
            uuid: string
            status: string
            firstPlayer: string
            secondPlayer: string
        }>) => {
            state.uuid = action.payload.uuid
            state.status = action.payload.status
            state.dwarfPlayer = action.payload.firstPlayer
            state.trollPlayer = action.payload.secondPlayer
            state.myFraction = "Troll"
        },
        INVITE: (state, action: PayloadAction<{ 
            status: string
            secondPlayer: string
        }>) => {
            state.status = action.payload.status
            state.trollPlayer = action.payload.secondPlayer
        },
        SCORE: (state, action: PayloadAction<{ 
            receivedMovedPieceType: string
            receivedTakenPieces: string[]
        }>) => {
            if(action.payload.receivedMovedPieceType === "Dwarf") {
                state.currentRound === 1 
                    ? state.dwarfPlayerPointsRound1 += (action.payload.receivedTakenPieces.length * 4)
                    : state.dwarfPlayerPointsRound2 += (action.payload.receivedTakenPieces.length * 4)
            } else if(action.payload.receivedMovedPieceType === "Troll") {
                state.currentRound === 1
                ? state.trollPlayerPointsRound1 += action.payload.receivedTakenPieces.length
                : state.trollPlayerPointsRound2 += action.payload.receivedTakenPieces.length
            }
        },
        NEXT_ROUND: (state) => {
            const prevDwarfPlayer = state.dwarfPlayer;

            state.dwarfPlayer = state.trollPlayer;
            state.trollPlayer = prevDwarfPlayer;
            state.currentRound = 2;
            state.currentTurn = "Dwarf";
        }
    }
});

export default gameplaySlice.reducer;

// Actions

export const { CREATE, JOIN, INVITE, SCORE, NEXT_ROUND } = gameplaySlice.actions;

//TODO: move axios actions here

//e.g.
// export const whatever = () => {

// }