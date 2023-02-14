import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PieceType } from "./Piece"

interface PieceState {
    isPawnChosen: boolean
    chosenPiecePosition: string
    chosenPieceType: PieceType
    availableMoves: string[]
    moveMadeFrom: string
}

const initialState: PieceState = {
    isPawnChosen: false,
    chosenPiecePosition: "",
    //FIXME: probably not the best solution
    chosenPieceType: PieceType.Empty,
    availableMoves: [],
    moveMadeFrom: ""
}

export const pieceSlice = createSlice({
    name: 'piece',
    initialState,
    reducers: {
        CHOOSE_PIECE: (state, action: PayloadAction<{ 
            piecePosition: string,
            pieceType: PieceType,
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
        }
    }
});

export const { CHOOSE_PIECE, GET_MOVES, CLEAR, MAKE_MOVE } = pieceSlice.actions;
export default pieceSlice.reducer;