import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// import { PieceType } from "./Piece"

interface PieceState {
    isPawnChosen: boolean
    chosenPiecePosition: string
    chosenPieceType: string
    availableMoves: string[]
    availableNormalMoves: string[]
    availableSpecialMoves: string[]
    moveMadeFrom: string
    receivedMovedPieceSource: string
    receivedMovedPieceDestination: string
    receivedMovedPieceType: string
    receivedTakenPieces: string[]
}

const initialState: PieceState = {
    isPawnChosen: false,
    chosenPiecePosition: "",
    //FIXME: probably not the best solution
    chosenPieceType: "",
    availableMoves: [],
    availableNormalMoves: [],
    availableSpecialMoves: [],
    moveMadeFrom: "",
    receivedMovedPieceSource: "",
    receivedMovedPieceDestination: "",
    receivedMovedPieceType: "",
    receivedTakenPieces: [],
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
            availableNormalMoves: string[],
            availableSpecialMoves: string[],
        }>) => {
            state.availableNormalMoves = action.payload.availableNormalMoves
            state.availableSpecialMoves = action.payload.availableSpecialMoves
        },
        CLEAR: (state) => {
            state.isPawnChosen = false
            state.chosenPiecePosition = ""
            state.availableMoves = []
            state.availableNormalMoves = []
            state.availableSpecialMoves = []
        },
        CHOOSE_MOVE_TYPE: (state, action: PayloadAction<{ 
            availableMoves: string[]
        }>) => {
            state.availableMoves = action.payload.availableMoves
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
        },
        REMOVE: (state, action: PayloadAction<{ 
            receivedTakenPieces: string[]
        }>) => {
            state.receivedTakenPieces = action.payload.receivedTakenPieces
        }
    }
});

export const { 
    CHOOSE_PIECE, 
    GET_MOVES, 
    CLEAR, 
    CHOOSE_MOVE_TYPE, 
    MAKE_MOVE, 
    RECEIVE_MOVE,
    REMOVE
} = pieceSlice.actions;
export default pieceSlice.reducer;