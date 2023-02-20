import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// import { PieceType } from "./Piece"

interface PieceState {
    isPawnChosen: boolean
    chosenPiecePosition: string
    chosenPieceType: string
    availableMoves: string[]
    moveMadeFrom: string
    receivedMovedPieceSource: string
    receivedMovedPieceDestination: string
    receivedMovedPieceType: string
}

const initialState: PieceState = {
    isPawnChosen: false,
    chosenPiecePosition: "",
    //FIXME: probably not the best solution
    chosenPieceType: "",
    availableMoves: [],
    moveMadeFrom: "",
    receivedMovedPieceSource: "",
    receivedMovedPieceDestination: "",
    receivedMovedPieceType: "",
}

export const pieceSlice = createSlice({
    name: 'piece',
    initialState,
    reducers: {
        CHOOSE_PIECE: (state, action: PayloadAction<{ 
            piecePosition: string,
            pieceType: string,
        }>) => {
            state.isPawnChosen = true
            state.chosenPiecePosition = action.payload.piecePosition
            state.chosenPieceType = action.payload.pieceType
        },
        GET_MOVES: (state, action: PayloadAction<{ 
            availableMoves: string[]
        }>) => {
            state.availableMoves = action.payload.availableMoves
        },
        CLEAR: (state) => {
            state.isPawnChosen = false
            state.chosenPiecePosition = ""
            state.availableMoves = []
        },
        MAKE_MOVE: (state) => {
            state.moveMadeFrom = state.chosenPiecePosition
        },
        RECEIVE_MOVE: (state, action: PayloadAction<{ 
            receivedMovedPieceSource: string,
            receivedMovedPieceDestination: string,
            receivedMovedPieceType: string,
        }>) => {
            state.receivedMovedPieceSource = action.payload.receivedMovedPieceSource
            state.receivedMovedPieceDestination = action.payload.receivedMovedPieceDestination
            state.receivedMovedPieceType = action.payload.receivedMovedPieceType
        }
    }
});

export const { CHOOSE_PIECE, GET_MOVES, CLEAR, MAKE_MOVE, RECEIVE_MOVE } = pieceSlice.actions;
export default pieceSlice.reducer;